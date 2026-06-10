import "server-only";

/**
 * Resolve the real client IP behind our chain:
 * Cloudflare → nginx → Next.js.
 *
 * Order matters — `CF-Connecting-IP` is set by Cloudflare and verified by
 * nginx via authenticated origin pulls, so it is the most trustworthy.
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
