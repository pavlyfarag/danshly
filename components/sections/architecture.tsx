import type { ComponentType } from "react";

import {
  IconActivity,
  IconAppWindow,
  IconArchive,
  IconCluster,
  IconCube,
  IconGitBranch,
  IconWorkflow,
  type IconProps,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

interface PipelineStage {
  name: string;
  detail: string;
  icon: ComponentType<IconProps>;
}

const stages: readonly PipelineStage[] = [
  { name: "Git", detail: "Trunk-based, signed commits", icon: IconGitBranch },
  { name: "CI/CD", detail: "Build, test, scan, publish", icon: IconWorkflow },
  { name: "Containers", detail: "Minimal multi-stage images", icon: IconCube },
  { name: "Kubernetes", detail: "Self-hosted cluster, GitOps sync", icon: IconCluster },
  { name: "Applications", detail: "Zero-downtime rollouts", icon: IconAppWindow },
  { name: "Monitoring", detail: "Prometheus, Grafana, alerting", icon: IconActivity },
  { name: "Backups", detail: "Encrypted, offsite, restore-tested", icon: IconArchive },
];

/**
 * Deployment pipeline visualization.
 *
 * Pure HTML + CSS: the stages are a real ordered list (read top-to-bottom by
 * assistive tech), and the animated "data flow" connector is a dashed CSS
 * gradient line behind the nodes — horizontal on large screens, vertical on
 * small ones. No JavaScript, no canvas, no layout shift.
 */
export function ArchitectureSection() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="scroll-mt-20 border-t border-edge/60 py-24"
    >
      <Container>
        <SectionHeading
          id="architecture-heading"
          eyebrow="03 · architecture"
          title="From commit to production, on hardware we own"
          lede="Every Danshly project travels the same automated path. No manual deploys, no snowflake servers — a pipeline we built, run and monitor ourselves."
        />

        <Reveal>
          <figure className="mt-16">
            <div className="relative">
              {/* Animated flow connectors (decorative). */}
              <div
                aria-hidden="true"
                className="pipe-y absolute bottom-8 left-7 top-8 lg:hidden"
              />
              <div
                aria-hidden="true"
                className="pipe-x absolute left-[7%] right-[7%] top-7 hidden lg:block"
              />

              <ol className="relative grid gap-9 lg:grid-cols-7 lg:gap-3">
                {stages.map((stage, index) => (
                  <li
                    key={stage.name}
                    className="flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-edge bg-panel text-accent shadow-lg shadow-black/30">
                      <stage.icon className="h-6 w-6" />
                    </span>
                    <span className="pt-1 lg:pt-5">
                      <span className="block font-mono text-[11px] text-fg-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-fg">
                        {stage.name}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-fg-muted">
                        {stage.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <figcaption className="mt-12 text-center text-sm text-fg-muted">
              The exact pipeline serving this page: commit to monitored,
              backed-up production in about four minutes — with zero manual
              steps.
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
