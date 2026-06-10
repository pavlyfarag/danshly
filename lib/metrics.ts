import "server-only";

/**
 * Typed surface for the homelab telemetry panels.
 *
 * The UI renders exclusively from this contract, so swapping the mock for the
 * real feed is a one-function change — see `getHomelabMetrics` below.
 */
export interface HomelabMetrics {
  /** Rolling 90-day availability across public-facing services. */
  uptimePercent90d: number;
  /** Median origin response time in milliseconds. */
  responseTimeMsP50: number;
  /** 95th percentile origin response time in milliseconds. */
  responseTimeMsP95: number;
  /** Recent response-time samples (ms), oldest first — drives the sparkline. */
  responseTimeSeries: readonly number[];
  lastDeployment: {
    service: string;
    commit: string;
    at: Date;
  };
  /** Containers currently running across the cluster. */
  hostedServices: number;
  /** Physical nodes in the cluster. */
  nodes: number;
  tls: {
    valid: boolean;
    issuer: string;
    daysRemaining: number;
  };
  incidents90d: number;
}

/**
 * Demo feed.
 *
 * To wire the live cluster, replace the body with a fetch against the
 * Prometheus-backed summary endpoint, e.g.:
 *
 *   const res = await fetch(`${process.env.METRICS_API_URL}/v1/summary`, {
 *     headers: { authorization: `Bearer ${process.env.METRICS_API_TOKEN}` },
 *     next: { revalidate: 30 },
 *   });
 *   if (!res.ok) throw new Error(`metrics api: ${res.status}`);
 *   return parseHomelabMetrics(await res.json());
 *
 * The section component and this contract stay untouched.
 */
export async function getHomelabMetrics(): Promise<HomelabMetrics> {
  return {
    uptimePercent90d: 99.98,
    responseTimeMsP50: 45,
    responseTimeMsP95: 112,
    responseTimeSeries: [52, 47, 49, 44, 46, 43, 48, 41, 45, 42, 47, 44, 40, 46, 43, 45],
    lastDeployment: {
      service: "danshly-web",
      commit: "a3f9c2e",
      at: new Date(Date.now() - 2 * 60 * 60 * 1000 - 14 * 60 * 1000),
    },
    hostedServices: 27,
    nodes: 3,
    tls: {
      valid: true,
      issuer: "Cloudflare Origin CA",
      daysRemaining: 4382,
    },
    incidents90d: 0,
  };
}
