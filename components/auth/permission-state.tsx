"use client";

import { Eye, LockKeyhole } from "lucide-react";

import type { Permission } from "./auth-context";
import { useAuth } from "./auth-context";

export function PermissionState({
  permission,
  children,
}: {
  permission: Permission;
  children: React.ReactNode;
}) {
  const { hasPermission } = useAuth();

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-slate-400 ring-1 ring-slate-200">
          <LockKeyhole className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-700">
            Aksi tidak tersedia
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Kamu dapat melihat data ini, tetapi tidak memiliki izin untuk
            melakukan perubahan.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            <Eye className="h-3 w-3" />
            Read only
          </div>
        </div>
      </div>
    </div>
  );
}
