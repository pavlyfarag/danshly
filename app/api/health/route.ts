/**
 * Liveness endpoint.
 * Consumed by the Docker HEALTHCHECK, Kubernetes probes and uptime monitoring.
 */
export function GET(): Response {
  return Response.json({
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
