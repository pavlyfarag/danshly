import { IconArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { projects, type Project } from "@/lib/projects";

const statusLabel: Record<Project["status"], string> = {
  production: "in production",
  "case-study": "case study",
  "in-progress": "in progress",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-edge bg-panel/70 p-7 transition-colors hover:border-edge-strong">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-fg">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              >
                {project.title}
                <IconArrowUpRight className="h-4 w-4 text-fg-faint" />
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="mt-1 font-mono text-xs text-fg-faint">{project.client}</p>
        </div>
        <Badge tone="ok" dot>
          {statusLabel[project.status]}
        </Badge>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
        {project.summary}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Tag label={tech} />
          </li>
        ))}
      </ul>

      <dl className="mt-5 flex flex-wrap gap-2 border-t border-edge pt-5">
        {project.metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-baseline gap-1.5 rounded-md border border-ok/25 bg-ok/[0.06] px-2.5 py-1"
          >
            <dt className="font-mono text-[10px] uppercase tracking-wide text-fg-muted">
              {metric.label}
            </dt>
            <dd className="font-mono text-xs font-semibold text-ok">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-20 border-t border-edge/60 py-24"
    >
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow="05 · selected work"
          title="Built, shipped — and still running"
          lede="Everything below is in production today, operated end-to-end by this studio. Client engagements are confidential by default; case studies are available on request."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 90} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
