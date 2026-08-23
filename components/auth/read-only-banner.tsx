"use client";

import { Eye, ShieldAlert } from "lucide-react";

import { useAuth } from "./auth-context";

export function ReadOnlyBanner() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading || !isAuthenticated || !user || user.role !== "viewer") {
    return null;
  }

  return (
    <div
      role="status"
      className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-amber-600 ring-1 ring-amber-100">
          <Eye className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-slate-900">Read-only mode</p>

            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-100">
              <ShieldAlert className="h-3 w-3" />
              Viewer
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Kamu dapat melihat data, tetapi tidak dapat membuat, mengubah,
            menghapus, atau mengirim konten.
          </p>
        </div>
      </div>
    </div>
  );
}
