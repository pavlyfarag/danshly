import { MobileNav } from "@/components/layout/mobile-nav";
import { site } from "@/lib/site";

function Wordmark() {
  return (
    <a
      href="/"
      aria-label="Danshly — home"
      className="font-mono text-lg font-semibold tracking-tight text-fg"
    >
      danshly
      <span aria-hidden="true" className="animate-blink text-accent">
        _
      </span>
    </a>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge/70 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs text-accent transition-colors hover:bg-accent/20"
          >
            ./contact --init
          </a>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
