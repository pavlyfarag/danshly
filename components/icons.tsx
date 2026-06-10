import type { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

/**
 * Minimal inline icon set, hand-drawn on a 24px grid.
 * Inlined SVG keeps the payload tiny and avoids an icon-font or library
 * dependency; `currentColor` lets Tailwind drive the color.
 */
function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconGitBranch(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="5.5" r="2.5" />
      <circle cx="6" cy="18.5" r="2.5" />
      <circle cx="18" cy="7.5" r="2.5" />
      <path d="M6 8v8" />
      <path d="M18 10c0 3.2-2.6 5-5.5 5H8.5" />
    </Icon>
  );
}

export function IconWorkflow(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.4 12.5a8.5 8.5 0 1 1-2.3-6.3" />
      <path d="M18.5 2.5v4h4" />
      <path d="m9.5 12 2 2 3.5-4" />
    </Icon>
  );
}

export function IconCube(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2z" />
      <path d="M3.3 8.3 12 13.1l8.7-4.8" />
      <path d="M12 13.1V21" />
    </Icon>
  );
}

export function IconCluster(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2.5 20 7v10l-8 4.5L4 17V7z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 7v2.5M12 14.5V17M7.5 9.5l2.3 1.3M16.5 9.5l-2.3 1.3" />
    </Icon>
  );
}

export function IconAppWindow(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M6.5 6.5h.5M9.5 6.5h.5" />
    </Icon>
  );
}

export function IconActivity(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12h4l2.5-7 5 14 2.5-7h4" />
    </Icon>
  );
}

export function IconArchive(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="5" rx="1" />
      <path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
      <path d="M10 13h4" />
    </Icon>
  );
}

export function IconShield(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l8 3v5.5c0 4.6-3.4 8-8 9.5-4.6-1.5-8-4.9-8-9.5V6z" />
      <path d="m9 11.7 2.2 2.2 3.8-4.4" />
    </Icon>
  );
}

export function IconGauge(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 15.5a9 9 0 1 1 17 0" />
      <path d="M12 14.5 16 9" />
      <circle cx="12" cy="15" r="1" />
    </Icon>
  );
}

export function IconKey(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="15" r="4.5" />
      <path d="m11.5 11.5 8-8" />
      <path d="M15.5 7.5 18 10M18.5 4.5 21 7" />
    </Icon>
  );
}

export function IconServer(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3.5" width="18" height="7" rx="1.5" />
      <rect x="3" y="13.5" width="18" height="7" rx="1.5" />
      <path d="M6.5 7h.5M6.5 17h.5" />
    </Icon>
  );
}

export function IconCode(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
    </Icon>
  );
}

export function IconSparkles(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4.5 13.6 9l4.4 1.6-4.4 1.6L12 16.5l-1.6-4.3L6 10.6 10.4 9z" />
      <path d="m19 15 .7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
      <path d="m5 17 .5 1.4L7 19l-1.5.6L5 21l-.5-1.4L3 19l1.5-.6z" />
    </Icon>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </Icon>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Icon>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function IconX(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Icon>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Icon>
  );
}

export function IconTerminal(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 8 4 4-4 4" />
      <path d="M12 17h7" />
    </Icon>
  );
}

export function IconExchange(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8h13" />
      <path d="m14 4.5 3.5 3.5-3.5 3.5" />
      <path d="M20 16H7" />
      <path d="m10 12.5L6.5 16l3.5 3.5" />
    </Icon>
  );
}
