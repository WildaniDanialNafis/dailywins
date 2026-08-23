import { FileText } from "lucide-react";

type ReportsHeaderProps = {
  connected: boolean;
  activeGroup: string | null;
};

export function ReportsHeader({ connected, activeGroup }: ReportsHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            <FileText className="h-3.5 w-3.5 text-indigo-500" />

            <span className="truncate">DailyWins · Activity History</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Laporan
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Lihat riwayat evaluasi, polling, dan schedule dalam satu tempat.
          </p>
        </div>

        <div
          className={[
            "inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border px-3.5 text-xs font-semibold sm:w-auto",
            connected
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-500",
          ].join(" ")}
        >
          <span
            className={[
              "h-1.5 w-1.5 rounded-full",
              connected ? "bg-emerald-500" : "bg-slate-400",
            ].join(" ")}
          />

          {connected
            ? (activeGroup ?? "WhatsApp connected")
            : "WhatsApp optional"}
        </div>
      </div>
    </header>
  );
}
