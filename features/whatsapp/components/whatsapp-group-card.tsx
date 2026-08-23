import { Check, Users } from "lucide-react";

type WhatsAppGroupCardProps = {
  name: string;
  members: number;
  active: boolean;
  canManage: boolean;
  disabled: boolean;
  onSelect: () => void;
};

export function WhatsAppGroupCard({
  name,
  members,
  active,
  canManage,
  disabled,
  onSelect,
}: WhatsAppGroupCardProps) {
  const content = (
    <>
      {active && (
        <span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-lg bg-emerald-500 text-white shadow-sm">
          <Check className="h-4 w-4" />
        </span>
      )}

      <div
        className={[
          "grid h-11 w-11 place-items-center rounded-2xl",
          active
            ? "bg-emerald-100 text-emerald-700"
            : "bg-indigo-50 text-indigo-600",
        ].join(" ")}
      >
        <Users className="h-5 w-5" />
      </div>

      <div className="mt-4 min-w-0">
        <h3
          className={[
            "truncate pr-9 text-sm font-bold",
            active ? "text-emerald-950" : "text-slate-900",
          ].join(" ")}
        >
          {name}
        </h3>

        <p className="mt-1 text-xs text-slate-500">{members} members</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={[
            "text-[10px] font-bold uppercase tracking-[0.14em]",
            active ? "text-emerald-600" : "text-slate-400",
          ].join(" ")}
        >
          {active ? "Active group" : canManage ? "Pilih group" : "Available"}
        </span>

        {canManage && !active && (
          <span className="text-[10px] font-semibold text-indigo-500">
            Jadikan aktif
          </span>
        )}
      </div>
    </>
  );

  if (!canManage) {
    return (
      <article
        className={[
          "relative rounded-2xl border bg-white p-5 shadow-sm",
          active
            ? "border-emerald-200 bg-emerald-50/40 ring-2 ring-emerald-50"
            : "border-slate-200/80",
        ].join(" ")}
      >
        {content}
      </article>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={[
        "relative w-full rounded-2xl border bg-white p-5 text-left shadow-sm transition duration-200",
        "focus:outline-none focus:ring-4 focus:ring-indigo-100",
        "disabled:cursor-not-allowed disabled:opacity-60",
        active
          ? "border-emerald-200 bg-emerald-50/40 ring-2 ring-emerald-50"
          : "border-slate-200/80 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md",
      ].join(" ")}
    >
      {content}
    </button>
  );
}
