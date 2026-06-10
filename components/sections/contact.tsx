import { ContactForm } from "@/components/sections/contact-form";
import { IconMail } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/site";

const steps = [
  { id: "01", text: "You write — a sentence or a spec, both work." },
  { id: "02", text: "We reply within one business day." },
  { id: "03", text: "A short call to scope it; a plan in writing after." },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-edge/60 py-24"
    >
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            id="contact-heading"
            eyebrow="06 · contact"
            title="Initiate protocol"
            lede="Tell us what you're building — or what's keeping it from shipping."
          />

          <ol className="mt-10 space-y-4">
            {steps.map((step) => (
              <li key={step.id} className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-accent">{step.id}</span>
                <span className="text-sm leading-relaxed text-fg-muted">{step.text}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-sm text-fg-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-fg"
            >
              <IconMail className="h-4 w-4" />
              {site.email}
            </a>
          </p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-fg-faint">
            Submissions land on our own infrastructure — validated, rate-limited
            and delivered to a self-hosted inbox. No third-party CRM, no
            tracking pixels.
          </p>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
