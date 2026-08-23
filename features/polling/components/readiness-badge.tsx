import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function ReadinessBadge({ ready }: { ready: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
        ready ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700",
      ].join(" ")}
    >
      {ready ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <AlertTriangle className="h-3 w-3" />
      )}

      {ready ? "Siap dikirim" : "Butuh ≥ 2 opsi"}
    </span>
  );
}
