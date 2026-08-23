import { Clock3, RefreshCw, Sparkles } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

type DashboardHeaderProps = {
  lastUpdated: string;
  refreshing: boolean;
  onRefresh: () => void;
};

export function DashboardHeader({
  lastUpdated,
  refreshing,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-700 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">DailyWins Overview</span>
          </div>

          <h1 className="mt-4 text-[2rem] font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Selamat datang kembali.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Pantau aktivitas hari ini dan kelola seluruh workflow dari satu
            workspace.
          </p>
        </div>

        <div className="grid gap-2 sm:flex sm:items-center">
          <div className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs text-slate-500 shadow-sm">
            <Clock3 className="h-3.5 w-3.5 text-slate-400" />
            Diperbarui {lastUpdated}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {refreshing ? (
              <LoadingSpinner />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}

            {refreshing ? "Memuat..." : "Refresh"}
          </button>
        </div>
      </div>
    </header>
  );
}
