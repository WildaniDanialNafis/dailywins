import { CheckCircle2, CircleHelp, X } from "lucide-react";

import { WhatsAppEmptyState } from "./whatsapp-empty-state";
import { WhatsAppGroupCard } from "./whatsapp-group-card";

type GroupItem = {
  id: string;
  name: string;
  members: number;
};

type WhatsAppGroupSectionProps = {
  canManage: boolean;
  activeGroupId: string | null;
  activeGroup?: GroupItem | null;
  filteredGroups: GroupItem[];
  search: string;
  disconnecting: boolean;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onSelectGroup: (groupId: string) => void;
};

export function WhatsAppGroupSection({
  canManage,
  activeGroupId,
  activeGroup,
  filteredGroups,
  search,
  disconnecting,
  onSearchChange,
  onClearSearch,
  onSelectGroup,
}: WhatsAppGroupSectionProps) {
  return (
    <section>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
            Delivery target
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Active Group
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {canManage
              ? "Pilih satu grup sebagai target delivery DailyWins."
              : "Lihat active group yang sedang digunakan workspace."}
          </p>
        </div>

        <div className="relative w-full lg:w-72">
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Cari grup..."
            className="ui-input w-full pl-4 pr-11"
          />

          {search && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-100"
              aria-label="Bersihkan pencarian"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filteredGroups.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredGroups.map((group) => (
            <WhatsAppGroupCard
              key={group.id}
              name={group.name}
              members={group.members}
              active={group.id === activeGroupId}
              canManage={canManage}
              disabled={disconnecting}
              onSelect={() => onSelectGroup(group.id)}
            />
          ))}
        </div>
      ) : (
        <WhatsAppEmptyState onClearSearch={onClearSearch} />
      )}

      {!activeGroup && (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                Belum ada active group
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {canManage
                  ? "Pilih salah satu grup di atas untuk menyelesaikan setup delivery."
                  : "Workspace belum memiliki target delivery aktif."}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeGroup && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-600 ring-1 ring-emerald-100">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600">
                  Ready for delivery
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                  {activeGroup.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {activeGroup.members} members
                </p>
              </div>
            </div>

            <span className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-white px-3 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Channel ready
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
