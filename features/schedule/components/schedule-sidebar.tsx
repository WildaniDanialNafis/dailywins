import { CalendarDays } from "lucide-react";

import { ScheduleDeliveryCard } from "./schedule-delivery-card";

import type { DeliveryState } from "../types";

type ScheduleSidebarProps = {
  activeDay: string;
  currentItemsCount: number;
  totalActivities: number;
  activeDays: number;
  canSend: boolean;
  whatsappConnected: boolean;
  activeGroupName?: string;
  deliveryState: DeliveryState;
  deliveryBusy: boolean;
  deliveryError: string | null;
  onSend: () => void;
  onResetDelivery: () => void;
};

export function ScheduleSidebar({
  activeDay,
  currentItemsCount,
  totalActivities,
  activeDays,
  canSend,
  whatsappConnected,
  activeGroupName,
  deliveryState,
  deliveryBusy,
  deliveryError,
  onSend,
  onResetDelivery,
}: ScheduleSidebarProps) {
  return (
    <aside className="min-w-0 space-y-4">
      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-500">
              Selected day
            </p>

            <h3 className="mt-1 text-base font-bold text-slate-900">
              {activeDay}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {currentItemsCount} aktivitas dijadwalkan.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Minggu
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {totalActivities}
            </p>

            <p className="text-[10px] text-slate-400">aktivitas</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Aktif
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {activeDays}/7
            </p>

            <p className="text-[10px] text-slate-400">hari</p>
          </div>
        </div>
      </section>

      <ScheduleDeliveryCard
        canSend={canSend}
        whatsappConnected={whatsappConnected}
        activeGroupName={activeGroupName}
        deliveryState={deliveryState}
        deliveryBusy={deliveryBusy}
        deliveryError={deliveryError}
        totalActivities={totalActivities}
        onSend={onSend}
        onReset={onResetDelivery}
      />

      <section className="rounded-2xl border border-slate-200/80 bg-slate-950 p-4 text-white shadow-sm sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Workflow
        </p>

        <h3 className="mt-1 text-base font-bold">Weekly planning</h3>

        <div className="mt-4 space-y-2">
          {[
            {
              number: "01",
              title: "Pilih hari",
            },
            {
              number: "02",
              title: "Tambah aktivitas",
            },
            {
              number: "03",
              title: "Review schedule",
            },
            {
              number: "04",
              title: "Kirim saat siap",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-[9px] font-bold text-slate-300">
                {step.number}
              </span>

              <span className="text-xs font-medium text-slate-300">
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
