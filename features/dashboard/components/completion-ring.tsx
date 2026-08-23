type CompletionRingProps = {
  percentage: number;
};

export function CompletionRing({ percentage }: CompletionRingProps) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative grid h-20 w-20 shrink-0 place-items-center sm:h-24 sm:w-24">
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-slate-100"
        />

        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className="text-indigo-500 transition-all duration-500"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>

      <div className="relative text-center">
        <p className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {percentage}%
        </p>

        <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">
          done
        </p>
      </div>
    </div>
  );
}
