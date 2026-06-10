import type { ComponentType } from "react";

import {
  IconCode,
  IconGauge,
  IconKey,
  IconServer,
  IconShield,
  IconSparkles,
  IconWorkflow,
  type IconProps,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";

interface Engineer {
  name: string;
  role: string;
  bio: string;
  tags: readonly string[];
  icon: ComponentType<IconProps>;
}

const engineers: readonly Engineer[] = [
  {
    name: "Pavly",
    role: "Senior DevOps Engineer",
    bio: "Owns everything beneath the application: the Kubernetes clusters, CI/CD pipelines, infrastructure as code, networking, hardening, observability — and the backup strategy that gets tested, not assumed. If it has an IP address, it answers to him.",
    tags: ["Kubernetes", "GitOps", "Terraform", "Ansible", "Security"],
    icon: IconServer,
  },
  {
    name: "Shery",
    role: "Senior Full Stack Engineer",
    bio: "Owns everything users touch: interface architecture and design systems, state and data flow, API contracts, semantic SEO, and accessibility. Ships interfaces that stay fast under real-world conditions — and look sharp doing it.",
    tags: ["Next.js", "TypeScript", "API design", "SEO", "UI/UX"],
    icon: IconCode,
  },
];

interface Principle {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
}

const principles: readonly Principle[] = [
  {
    title: "Performance first",
    description:
      "Speed is a feature with a budget. LCP, CLS and TTFB are measured on every release — regressions don't ship.",
    icon: IconGauge,
  },
  {
    title: "Security by default",
    description:
      "Least privilege, encryption in transit and at rest, strict headers and CSP, dependencies kept minimal and audited.",
    icon: IconShield,
  },
  {
    title: "Ownership",
    description:
      "We run what we ship — hardware, network, runtime and code. When you own the whole stack, “not my layer” isn't a sentence.",
    icon: IconKey,
  },
  {
    title: "Automation",
    description:
      "If we did it twice, it's a pipeline. Provisioning, deploys, certificates, backups: codified, versioned, repeatable.",
    icon: IconWorkflow,
  },
];

export function TeamSection() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="scroll-mt-20 border-t border-edge/60 py-24"
    >
      <Container>
        <SectionHeading
          id="studio-heading"
          eyebrow="01 · the studio"
          title="Small by design. Senior by default."
          lede="Danshly is a family-run engineering studio. Two senior engineers, one shared definition of done, zero handoffs — every layer of your product is built and operated by the people whose name is on it."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {engineers.map((person, index) => (
            <Reveal key={person.name} delay={index * 100}>
              <article className="h-full rounded-2xl border border-edge bg-panel/70 p-8 transition-colors hover:border-edge-strong">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-edge bg-panel-2 text-accent">
                    <person.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{person.name}</h3>
                    <p className="font-mono text-xs text-accent">{person.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-fg-muted">{person.bio}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${person.name}'s focus areas`}>
                  {person.tags.map((tag) => (
                    <li key={tag}>
                      <Tag label={tag} />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <aside className="mt-6 flex flex-col gap-4 rounded-2xl border border-ok/20 bg-ok/[0.04] p-6 sm:flex-row sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ok/30 bg-panel text-ok">
              <IconSparkles className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">Daniel</span>
              <span className="mx-2 text-fg-faint">·</span>
              <span className="font-mono text-xs text-ok">Chief Inspiration Officer</span>
              <span className="mt-1 block">
                Two years old. Unmatched curiosity, zero tolerance for boring
                demos — and a daily reminder that everything we build should
                still matter when he's old enough to read the source.
              </span>
            </p>
          </aside>
        </Reveal>

        <h3 className="mt-20 font-mono text-xs uppercase tracking-[0.3em] text-fg-faint">
          Core principles
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 80}>
              <article className="h-full rounded-2xl border border-edge bg-panel/50 p-6">
                <principle.icon className="h-5 w-5 text-accent" />
                <h4 className="mt-4 text-sm font-semibold text-fg">{principle.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {principle.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
