interface TagProps {
  label: string;
}

/** Compact mono chip for tech-stack labels. */
export function Tag({ label }: TagProps) {
  return (
    <span className="rounded-md border border-edge bg-panel-2 px-2 py-1 font-mono text-[11px] leading-none text-fg-muted">
      {label}
    </span>
  );
}
