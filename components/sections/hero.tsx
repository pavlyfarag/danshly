import { IconArrowRight } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const stack = [
  "Next.js",
  "TypeScript",
  "Kubernetes",
  "Docker",
  "Terraform",
  "Ansible",
  "PostgreSQL",
  "Cloudflare",
] as const;

function TerminalPanel() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-edge bg-panel shadow-2xl shadow-black/40"
      role="img"
      aria-label="Terminal output showing a healthy three-node Kubernetes cluster and synced GitOps applications"
    >
      <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-danger/80" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-warn/80" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-ok/80" />
        <span className="ml-2 font-mono text-xs text-fg-faint">pavly@atlas:~</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-fg-muted" aria-hidden="true">
        <code>
          <span className="text-accent">$</span> kubectl get nodes{"\n"}
          {"NAME      STATUS   ROLES           VERSION\n"}
          {"atlas     "}<span className="text-ok">Ready</span>{"    control-plane   v1.32.1\n"}
          {"helios    "}<span className="text-ok">Ready</span>{"    worker          v1.32.1\n"}
          {"artemis   "}<span className="text-ok">Ready</span>{"    worker          v1.32.1\n"}
          {"\n"}
          <span className="text-accent">$</span> argocd app list{"\n"}
          {"danshly-web     "}<span className="text-ok">Synced</span>{"   "}<span className="text-ok">Healthy</span>{"\n"}
          {"metrics-api     "}<span className="text-ok">Synced</span>{"   "}<span className="text-ok">Healthy</span>{"\n"}
          {"backups-cron    "}<span className="text-ok">Synced</span>{"   "}<span className="text-ok">Healthy</span>{"\n"}
          {"\n"}
          <span className="text-accent">$</span>{" "}
          <span className="animate-blink text-fg">▌</span>
        </code>
      </pre>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Decorative backdrop: grid + glow, masked toward the top fold. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-accent-strong/10 blur-3xl" />
      </div>

      <Container className="grid items-center gap-14 py-24 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
        <div>
          <Badge tone="ok" dot pulse>
            all systems operational · 99.98% uptime
          </Badge>

          <h1
            id="hero-heading"
            className="mt-8 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            Engineering.
            <br />
            Infrastructure.
            <br />
            <span className="bg-gradient-to-r from-accent via-violet-400 to-ok bg-clip-text text-transparent">
              Ownership.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
            We build, host, secure, and operate digital products entirely
            in-house — from the first commit to the rack it runs on.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="#architecture">
              View Architecture
              <IconArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              <span className="font-mono text-accent" aria-hidden="true">
                &gt;_
              </span>
              Initiate Contact
            </ButtonLink>
          </div>

          <p className="mt-12 font-mono text-xs leading-6 text-fg-faint">
            {stack.join("  ·  ")}
          </p>
        </div>

        <TerminalPanel />
      </Container>
    </section>
  );
}
