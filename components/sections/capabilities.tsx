import type { ComponentType } from "react";

import { IconCode, IconExchange, IconServer, type IconProps } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

interface Capability {
  title: string;
  detail: string;
}

interface Domain {
  layer: string;
  owner: string;
  icon: ComponentType<IconProps>;
  capabilities: readonly Capability[];
}

const domains: readonly Domain[] = [
  {
    layer: "Application layer",
    owner: "Shery",
    icon: IconCode,
    capabilities: [
      {
        title: "Interface engineering",
        detail: "Design systems, micro-interactions, zero layout shift.",
      },
      {
        title: "State & data flow",
        detail: "Server components first; client JavaScript only where it earns its bytes.",
      },
      {
        title: "API design",
        detail: "Typed contracts, validation at the boundary, predictable errors.",
      },
      {
        title: "Semantic SEO & accessibility",
        detail: "Structured data, meaningful markup, WCAG AA as a floor — not a goal.",
      },
    ],
  },
  {
    layer: "Infrastructure layer",
    owner: "Pavly",
    icon: IconServer,
    capabilities: [
      {
        title: "Kubernetes & containers",
        detail: "Self-hosted clusters, zero-downtime rollouts, sane resource budgets.",
      },
      {
        title: "CI/CD & GitOps",
        detail: "Every change reviewed, built, scanned and deployed by pipeline.",
      },
      {
        title: "Infrastructure as code",
        detail: "Terraform and Ansible; reproducible from bare metal up.",
      },
      {
        title: "Security & self-hosting",
        detail: "mTLS origin pulls, strict headers, workload isolation, monitored 24/7.",
      },
    ],
  },
];

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-20 border-t border-edge/60 py-24"
    >
      <Container>
        <SectionHeading
          id="capabilities-heading"
          eyebrow="02 · symbiosis"
          title="Two domains. One system."
          lede="Full stack engineering and infrastructure aren't separate services here — they're designed together, by people who share a roof and a definition of done."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {domains.map((domain, index) => (
            <Reveal key={domain.layer} delay={index * 100}>
              <article className="h-full rounded-2xl border border-edge bg-panel/70 p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-edge bg-panel-2 text-accent">
                      <domain.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-fg">{domain.layer}</h3>
                  </div>
                  <p className="font-mono text-xs text-fg-faint">
                    owner: <span className="text-accent">{domain.owner.toLowerCase()}</span>
                  </p>
                </div>

                <ul className="mt-7 space-y-5">
                  {domain.capabilities.map((capability) => (
                    <li key={capability.title} className="flex gap-3">
                      <span aria-hidden="true" className="mt-0.5 font-mono text-xs text-ok">
                        ▸
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-fg">{capability.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                          {capability.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 sm:flex-row sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-panel text-accent">
              <IconExchange className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">The seam is the product.</span>{" "}
              API contracts, performance budgets, observability and release
              automation are designed where the two layers meet — not thrown
              over a wall.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
