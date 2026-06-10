import "server-only";

/**
 * In-memory sliding-window rate limiter.
 *
 * Scope: a single Node.js process — exactly what this site deploys as
 * (one standalone container). It is the application-layer half of a
 * two-layer strategy; nginx enforces `limit_req` at the edge as well
 * (see deploy/nginx/danshly.com.conf).
 *
 * If this app is ever scaled horizontally, swap the Map for a shared
 * store (Redis `ZADD`/`ZREMRANGEBYSCORE` implements the same window);
 * the call-site contract below stays identical.
 */

export interface RateLimitOptions {
  /** Maximum number of requests allowed inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  /** Seconds until the oldest hit leaves the window (0 when ok). */
  retryAfterSeconds: number;
}

const hits = new Map<string, number[]>();
let lastSweep = Date.now();

/** Drop empty buckets so the map cannot grow unbounded. */
function sweep(now: number, windowMs: number): void {
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  for (const [key, timestamps] of hits) {
    const live = timestamps.filter((t) => now - t < windowMs);
    if (live.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, live);
    }
  }
}

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const { limit, windowMs } = options;
  const now = Date.now();
  sweep(now, windowMs);

  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const oldest = recent[0] ?? now;
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true, remaining: limit - recent.length, retryAfterSeconds: 0 };
}
