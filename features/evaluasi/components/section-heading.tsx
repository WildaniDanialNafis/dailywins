type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        {title}
      </h2>

      {description && (
        <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
