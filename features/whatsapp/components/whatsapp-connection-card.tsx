"use client";

import { MessageCircle, QrCode, ShieldCheck, Users, Wifi } from "lucide-react";

import { ButtonContent } from "@/components/ui/button-content";

import { WhatsAppFeatureCard } from "./whatsapp-feature-card";
import { WhatsAppQrCard } from "./whatsapp-qr-card";
import { WhatsAppStatusPill } from "./whatsapp-status-pill";

type WhatsAppConnectionCardProps = {
  canManage: boolean;
  role: string;
  connectionState: "disconnected" | "scanning";
  connecting: boolean;
  refreshingQr: boolean;
  onConnect: () => void;
  onRefreshQr: () => void;
  onSimulateScan: () => void;
  onCancel: () => void;
};

export function WhatsAppConnectionCard({
  canManage,
  role,
  connectionState,
  connecting,
  refreshingQr,
  onConnect,
  onRefreshQr,
  onSimulateScan,
  onCancel,
}: WhatsAppConnectionCardProps) {
  return (
    <section className="mb-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[1fr_0.9fr]">
        <div className="p-5 sm:p-7 lg:p-10">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
            <MessageCircle className="h-6 w-6" />
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600">
                Connection
              </p>

              <WhatsAppStatusPill connected={false} />
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {canManage
                ? "Hubungkan WhatsApp ke DailyWins"
                : "WhatsApp belum terhubung"}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              {canManage
                ? "Koneksi hanya diperlukan untuk delivery. Semua konten tetap dapat dikelola tanpa WhatsApp."
                : "Kamu dapat melihat status channel, tetapi akunmu tidak memiliki izin untuk mengubah koneksi."}
            </p>
          </div>

          {canManage && (
            <div className="mt-6 grid gap-2.5">
              <WhatsAppFeatureCard
                icon={ShieldCheck}
                title="Delivery terkontrol"
                description="WhatsApp digunakan hanya sebagai channel pengiriman."
              />

              <WhatsAppFeatureCard
                icon={Users}
                title="Target group jelas"
                description="Satu active group menjadi target delivery saat ini."
              />

              <WhatsAppFeatureCard
                icon={Wifi}
                title="Status transparan"
                description="DailyWins selalu menampilkan kondisi channel."
              />
            </div>
          )}

          {!canManage && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Mode read-only
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Role <span className="font-semibold">{role}</span> tidak
                memiliki izin untuk menghubungkan atau memutuskan WhatsApp.
              </p>
            </div>
          )}

          {canManage && connectionState === "disconnected" && (
            <button
              type="button"
              onClick={onConnect}
              disabled={connecting}
              className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <ButtonContent loading={connecting} loadingText="Menyiapkan...">
                <QrCode className="h-4 w-4 text-white" />
                <span className="text-white">Hubungkan WhatsApp</span>
              </ButtonContent>
            </button>
          )}
        </div>

        <div className="flex min-h-80 items-center justify-center border-t border-slate-100 bg-slate-50/70 p-5 sm:p-8 lg:border-l lg:border-t-0">
          {connectionState === "scanning" ? (
            <WhatsAppQrCard
              refreshingQr={refreshingQr}
              connecting={connecting}
              onRefresh={onRefreshQr}
              onSimulateScan={onSimulateScan}
              onCancel={onCancel}
            />
          ) : (
            <div className="w-full max-w-sm rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-400">
                <QrCode className="h-7 w-7" />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">
                QR belum aktif
              </p>

              <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-400">
                Mulai koneksi untuk menampilkan QR code.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
