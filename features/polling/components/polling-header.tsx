import { CheckCircle2, ListChecks, Send } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

type PollingHeaderProps = {
  canSend: boolean;
  readyCount: number;
  sendingAll: boolean;
  sendingAllProgress: number;
  sendingAllTotal: number;
  deliveredCount: number;
  onSendAll: () => void;
};

export function PollingHeader({
  canSend,
  readyCount,
  sendingAll,
  sendingAllProgress,
  sendingAllTotal,
  deliveredCount,
  onSendAll,
}: PollingHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
            <ListChecks className="h-3.5 w-3.5 shrink-0" />

            <span className="truncate">DailyWins · Polling Builder</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Polling
            </h1>

            {sendingAll && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
                <LoadingSpinner />
                {sendingAllProgress}/{sendingAllTotal} sending
              </span>
            )}

            {!sendingAll && deliveredCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3 w-3" />
                {deliveredCount} sent
              </span>
            )}
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Buat pertanyaan, kelola pilihan jawaban, lalu distribusikan saat
            siap.
          </p>
        </div>

        {canSend && (
          <button
            type="button"
            onClick={onSendAll}
            disabled={sendingAll || readyCount === 0}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {sendingAll ? (
              <>
                <LoadingSpinner />

                <span className="text-white">
                  Mengirim {sendingAllProgress}/{sendingAllTotal}
                </span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4 text-white" />

                <span className="text-white">Kirim {readyCount} Polling</span>
              </>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
