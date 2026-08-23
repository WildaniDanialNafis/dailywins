import type { SortDirection } from "../types";

type SortButtonProps = {
  label: string;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
};

export function SortButton({
  label,
  active,
  direction,
  onClick,
}: SortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-semibold transition",
        active
          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}

      {active && (
        <span aria-hidden="true" className="text-[10px]">
          {direction === "asc" ? "↑" : "↓"}
        </span>
      )}
    </button>
  );
}
