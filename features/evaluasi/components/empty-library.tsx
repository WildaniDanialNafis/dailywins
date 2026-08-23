import { ListChecks, Plus, Search, X } from "lucide-react";

type EmptyLibraryProps = {
  canManage: boolean;
  searchActive: boolean;
  search: string;
  onClearSearch: () => void;
  onCreate: () => void;
};

export function EmptyLibrary({
  canManage,
  searchActive,
  search,
  onClearSearch,
  onCreate,
}: EmptyLibraryProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center sm:py-16">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-300">
        {searchActive ? (
          <Search className="h-7 w-7" />
        ) : (
          <ListChecks className="h-7 w-7" />
        )}
      </div>

      <p className="mt-5 text-base font-bold text-slate-900">
        {searchActive ? "Tidak ada hasil" : "Library masih kosong"}
      </p>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {searchActive
          ? `Tidak ada kategori atau kegiatan yang cocok dengan "${search.trim()}".`
          : canManage
            ? "Buat kategori pertama, lalu tambahkan kegiatan ke dalamnya."
            : "Belum ada kategori atau kegiatan yang tersedia di workspace ini."}
      </p>

      {searchActive ? (
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
            Buat kategori pertama
          </button>
        )
      )}
    </div>
  );
}
