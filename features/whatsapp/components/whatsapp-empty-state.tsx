import { Users, X } from "lucide-react";

type WhatsAppEmptyStateProps = {
  onClearSearch: () => void;
};

export function WhatsAppEmptyState({ onClearSearch }: WhatsAppEmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
      <Users className="mx-auto h-6 w-6 text-slate-300" />

      <p className="mt-4 text-sm font-semibold text-slate-700">
        Grup tidak ditemukan
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Coba gunakan kata pencarian yang berbeda.
      </p>

      <button
        type="button"
        onClick={onClearSearch}
        className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <X className="h-4 w-4" />
        Bersihkan pencarian
      </button>
    </div>
  );
}
