"use client";

import { useEffect, useState } from "react";

import { IconMenu, IconX } from "@/components/icons";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-fg-muted transition-colors hover:text-fg"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
      </button>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-edge bg-canvas/95 backdrop-blur-md"
      >
        <ul className="space-y-1 px-6 py-4">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-fg-muted transition-colors hover:bg-panel hover:text-fg"
              >
                <span aria-hidden="true" className="mr-2 font-mono text-accent">
                  ↳
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
