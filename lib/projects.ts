/**
 * Portfolio data. Adding a project card is a single entry here —
 * the grid, tags and badges render from this contract.
 */
export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  summary: string;
  stack: readonly string[];
  metrics: readonly ProjectMetric[];
  status: "production" | "case-study" | "in-progress";
  /** Optional external link (omit for NDA / internal work). */
  href?: string;
}

export const projects: readonly Project[] = [
  {
    slug: "danshly-com",
    title: "danshly.com",
    client: "Danshly · internal",
    summary:
      "This site. React Server Components with near-zero client JavaScript, a nonce-based strict CSP, no third-party scripts, served from our own Kubernetes cluster behind Cloudflare authenticated origin pulls.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Docker", "K8s"],
    metrics: [
      { label: "Lighthouse", value: "100" },
      { label: "CLS", value: "0.00" },
    ],
    status: "production",
  },
  {
    slug: "homelab-platform",
    title: "Homelab platform",
    client: "Danshly · infrastructure",
    summary:
      "The platform underneath everything we ship: a self-hosted Kubernetes cluster on our own hardware, GitOps-managed workloads, full Prometheus/Grafana observability, and encrypted offsite backups with rehearsed restores.",
    stack: ["Kubernetes", "Argo CD", "Terraform", "Prometheus", "Grafana"],
    metrics: [
      { label: "Uptime 90d", value: "99.98%" },
      { label: "Services", value: "27" },
    ],
    status: "production",
  },
  {
    slug: "delivery-pipeline",
    title: "Zero-touch delivery pipeline",
    client: "Danshly · platform engineering",
    summary:
      "Commit-to-production automation for every workload we operate: containerized builds, dependency and image vulnerability scanning, signed artifacts and progressive rollouts. The pipeline visualized above is this one.",
    stack: ["GitHub Actions", "Docker", "Trivy", "Argo CD"],
    metrics: [
      { label: "Deploy time", value: "~4 min" },
      { label: "Manual steps", value: "0" },
    ],
    status: "production",
  },
];
