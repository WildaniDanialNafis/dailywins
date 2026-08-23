"use client";

import { LogOut, MessageCircle, Wifi } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

type WhatsAppHeaderProps = {
  connected: boolean;
  canManage: boolean;
  disconnecting: boolean;
  onDisconnect: () => void;
};

export function WhatsAppHeader({
  connected,
  canManage,
  disconnecting,
  onDisconnect,
}: WhatsAppHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <MessageCircle className="h-3.5 w-3.5 shrink-0" />

            <span className="truncate">DailyWins · Delivery Channel</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            WhatsApp
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Hubungkan WhatsApp, pilih active group, lalu gunakan channel ini
            untuk delivery dari DailyWins.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <div className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-500 shadow-sm">
            <Wifi
              className={[
                "h-3.5 w-3.5",
                connected ? "text-emerald-500" : "text-slate-400",
              ].join(" ")}
            />

            {connected ? "Channel connected" : "Channel optional"}
          </div>

          {canManage && connected && (
            <button
              type="button"
              onClick={onDisconnect}
              disabled={disconnecting}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {disconnecting ? (
                <LoadingSpinner />
              ) : (
                <LogOut className="h-3.5 w-3.5" />
              )}

              {disconnecting ? "Memutuskan..." : "Putuskan"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
