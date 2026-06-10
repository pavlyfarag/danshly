import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "ok" | "accent" | "neutral";
  /** Render the small status dot before the label. */
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

const tones = {
  ok: "border-ok/30 bg-ok/10 text-ok",
  accent: "border-accent/30 bg-accent/10 text-accent",
  neutral: "border-edge bg-panel-2 text-fg-muted",
} as const;

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  pulse = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs ${tones[tone]} ${className ?? ""}`}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full bg-current ${pulse ? "animate-pulse-dot" : ""}`}
        />
      ) : null}
      {children}
    </span>
  );
}
