import { IconArrowUpRight } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

const connectLinks = [
  { label: "GitHub", href: site.social.github, external: true },
  { label: "LinkedIn", href: site.social.linkedin, external: true },
  { label: site.email, href: `mailto:${site.email}`, external: false },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge bg-panel/40">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-mono text-lg font-semibold text-fg">
              danshly<span className="text-accent">_</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              {site.description}
            </p>
            <div className="mt-6">
              <Badge tone="ok" dot pulse>
                all systems operational
              </Badge>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-fg-faint">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-fg-faint">
              Connect
            </h2>
            <ul className="mt-4 space-y-2.5">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                    {link.external ? (
                      <IconArrowUpRight className="h-3.5 w-3.5 text-fg-faint" />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-edge pt-6 font-mono text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            Designed, Engineered &amp; Hosted by {site.name} — served from our
            own racks.
          </p>
        </div>
      </Container>
    </footer>
  );
}
