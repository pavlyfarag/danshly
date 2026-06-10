/**
 * Single source of truth for site-wide constants.
 * Everything that names, links or describes Danshly lives here.
 */
export const site = {
  name: "Danshly",
  domain: "danshly.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://danshly.com",
  tagline: "Engineering. Infrastructure. Ownership.",
  description:
    "Danshly is a family-run engineering studio that designs, builds, hosts, secures and operates complete web platforms end-to-end — on infrastructure it owns.",
  email: "hello@danshly.com",
  social: {
    github: "https://github.com/danshly",
    linkedin: "https://www.linkedin.com/company/danshly",
  },
  nav: [
    { label: "Studio", href: "#studio" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Architecture", href: "#architecture" },
    { label: "Telemetry", href: "#telemetry" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type SiteNavItem = (typeof site.nav)[number];
