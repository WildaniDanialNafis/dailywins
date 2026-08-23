import { ListChecks, Plus, Search, X } from "lucide-react";

type EmptyStateProps = {
  type: "empty" | "search";
  search: string;
  canManage: boolean;
  onClearSearch: () => void;
  onCreate: () => void;
};

export function EmptyState({
  type,
  search,
  canManage,
  onClearSearch,
  onCreate,
}: EmptyStateProps) {
  const isSearch = type === "search";

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center sm:py-20">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-300">
        {isSearch ? (
          <Search className="h-7 w-7" />
        ) : (
          <ListChecks className="h-7 w-7" />
        )}
      </div>

      <p className="mt-5 text-base font-bold text-slate-900">
        {isSearch ? "Polling tidak ditemukan" : "Belum ada polling"}
      </p>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {isSearch
          ? `Tidak ada pertanyaan atau opsi yang cocok dengan "${search.trim()}".`
          : canManage
            ? "Buat polling pertama, lalu tambahkan minimal dua opsi agar dapat dikirim."
            : "Belum ada polling yang tersedia di workspace ini."}
      </p>

      {isSearch ? (
        <button
          type="button"
          onClick={onClearSearch}
          className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <X className="h-4 w-4" />
          Bersihkan pencarian
        </button>
      ) : (
        canManage && (
          <button
            type="button"
            onClick={onCreate}
            className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-xs font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 text-white" />
            Buat polling pertama
          </button>
        )
      )}
    </div>
  );
}
