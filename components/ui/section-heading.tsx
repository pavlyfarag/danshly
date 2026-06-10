interface SectionHeadingProps {
  /** id of the <h2>, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        <span aria-hidden="true">{"// "}</span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{lede}</p>
      ) : null}
    </div>
  );
}
