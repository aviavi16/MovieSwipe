interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function SectionHeading({ title, description, eyebrow }: SectionHeadingProps): JSX.Element {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-300">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-6 text-white/60">{description}</p> : null}
    </div>
  );
}
