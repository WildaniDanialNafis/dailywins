import { ListChecks } from "lucide-react";

type EvaluationEmptyStateProps = {
  canManage: boolean;
  onScrollToLibrary: () => void;
};

export function EvaluationEmptyState({
  canManage,
  onScrollToLibrary,
}: EvaluationEmptyStateProps) {
  return (
    <div className="px-5 py-14 text-center sm:py-16">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-400">
        <ListChecks className="h-7 w-7" />
      </div>

      <p className="mt-5 text-sm font-bold text-slate-800">
        Susunan evaluasi masih kosong
      </p>

      <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">
        {canManage
          ? "Gunakan tombol + pada activity library untuk memasukkan kegiatan ke evaluasi."
          : "Belum ada kegiatan di dalam evaluasi."}
      </p>

      {canManage && (
        <button
          type="button"
          onClick={onScrollToLibrary}
          className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-xs font-semibold text-white"
        >
          <ListChecks className="h-4 w-4 text-white" />
          Buka Activity Library
        </button>
      )}
    </div>
  );
}
