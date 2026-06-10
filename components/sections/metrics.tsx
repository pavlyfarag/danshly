import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatRelative, formatUtc } from "@/lib/format";
import { getHomelabMetrics } from "@/lib/metrics";

function Sparkline({ values }: { values: readonly number[] }) {
  const width = 120;
  const height = 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - 4 - ((value - min) / range) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-9 w-full max-w-[120px] text-accent"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PanelProps {
  label: string;
  value: string;
  note: string;
  ok?: boolean;
  children?: ReactNode;
}

function Panel({ label, value, note, ok = false, children }: PanelProps) {
  return (
    <div className="bg-panel p-6">
      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint">
        {label}
      </dt>
      <dd className="mt-3">
        <span className="flex items-center gap-2.5 text-3xl font-semibold tracking-tight text-fg">
          {ok ? (
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-ok animate-pulse-dot" />
          ) : null}
          {value}
        </span>
        <span className="mt-2 block text-xs leading-relaxed text-fg-muted">{note}</span>
        {children}
      </dd>
    </div>
  );
}

/**
 * Homelab telemetry. Async server component reading from the typed metrics
 * contract in lib/metrics.ts — currently a demo feed, swappable for the live
 * Prometheus-backed endpoint without touching this markup.
 */
export async function MetricsSection() {
  const metrics = await getHomelabMetrics();
  const deployedAt = metrics.lastDeployment.at;

  return (
    <section
      id="telemetry"
      aria-labelledby="telemetry-heading"
      className="scroll-mt-20 border-t border-edge/60 py-24"
    >
      <Container>
        <SectionHeading
          id="telemetry-heading"
          eyebrow="04 · telemetry"
          title="The homelab, in numbers"
          lede="We monitor what we run. These panels render from the same typed contract as our internal dashboards — wired to a demo feed here, one function away from the live Prometheus data."
        />

        <Reveal>
          <div className="mt-14 overflow-hidden rounded-2xl border border-edge">
            <div className="flex items-center justify-between gap-4 border-b border-edge bg-panel-2 px-5 py-3">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-danger/80" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-warn/80" />
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-ok/80" />
                <span className="ml-2 font-mono text-xs text-fg-faint">
                  status.danshly.com — cluster overview
                </span>
              </div>
              <Badge tone="accent">demo feed</Badge>
            </div>

            <dl className="grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-3">
              <Panel
                label="Global uptime"
                value={`${metrics.uptimePercent90d.toFixed(2)}%`}
                note="rolling 90 days, all public services"
                ok
              />
              <Panel
                label="Server response"
                value={`${metrics.responseTimeMsP50} ms`}
                note={`p50 at origin · p95 ${metrics.responseTimeMsP95} ms`}
              >
                <Sparkline values={metrics.responseTimeSeries} />
              </Panel>
              <Panel
                label="Last deployment"
                value={formatRelative(deployedAt)}
                note={`${formatUtc(deployedAt)} · ${metrics.lastDeployment.service}@${metrics.lastDeployment.commit}`}
              />
              <Panel
                label="Hosted services"
                value={String(metrics.hostedServices)}
                note={`containers across ${metrics.nodes} nodes`}
              />
              <Panel
                label="TLS status"
                value={metrics.tls.valid ? "Valid" : "Action required"}
                note={`${metrics.tls.issuer} · auto-renewed · ${metrics.tls.daysRemaining} days remaining`}
                ok={metrics.tls.valid}
              />
              <Panel
                label="Incidents · 90d"
                value={String(metrics.incidents90d)}
                note="self-hosted Prometheus + Alertmanager, paging us — not a vendor"
              />
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
