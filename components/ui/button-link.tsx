import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}

const variants = {
  primary:
    "bg-accent-strong text-white hover:bg-accent focus-visible:outline-offset-4",
  ghost:
    "border border-edge-strong bg-panel/60 text-fg hover:border-accent/60 hover:bg-panel-2",
} as const;

/**
 * Styled anchor. All in-page targets are plain anchors (no router involved),
 * which keeps this a server component with zero client JS.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
