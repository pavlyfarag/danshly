import { deliverContactMessage } from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { validateContact } from "@/lib/validation";

/** Hard cap well above any legitimate payload (5000-char message). */
const MAX_BODY_BYTES = 16_384;

/** 5 submissions per minute per client IP; nginx rate-limits upstream too. */
const RATE_LIMIT = { limit: 5, windowMs: 60_000 } as const;

function isHoneypotTripped(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const website = (body as Record<string, unknown>).website;
  return typeof website === "string" && website.length > 0;
}

export async function POST(request: Request): Promise<Response> {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(contentLength) || contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "payload_too_large" }, { status: 413 });
  }

  const ip = getClientIp(request);
  const verdict = rateLimit(`contact:${ip}`, RATE_LIMIT);
  if (!verdict.ok) {
    return Response.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: { "retry-after": String(verdict.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Bots fill every field, including the invisible one. Accept silently so
  // they get no signal to adapt against.
  if (isHoneypotTripped(body)) {
    return Response.json({ ok: true });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return Response.json(
      { error: "validation_failed", fields: result.errors },
      { status: 422 },
    );
  }

  try {
    await deliverContactMessage(result.data, {
      ip,
      userAgent: request.headers.get("user-agent"),
      receivedAt: new Date(),
    });
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
