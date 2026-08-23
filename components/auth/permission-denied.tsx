"use client";

import Link from "next/link";
import { ArrowLeft, Eye, Home, LockKeyhole, ShieldAlert } from "lucide-react";

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
          <Eye className="h-4 w-4" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-slate-900">Read-only mode</p>

            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-100">
              <ShieldAlert className="h-3 w-3" aria-hidden="true" />
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

type PermissionDeniedProps = {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
};

export function PermissionDenied({
  title = "Akses terbatas",
  description = "Kamu tidak memiliki izin untuk mengakses atau mengubah bagian ini.",
  backHref = "/dashboard",
  backLabel = "Kembali ke Dashboard",
}: PermissionDeniedProps) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading || !isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-svh bg-slate-50">
      <div className="mx-auto flex min-h-svh w-full max-w-4xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <section className="w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
                <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-500">
                  Permission denied
                </p>

                <h1 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  Akses tidak diizinkan
                </h1>
              </div>
            </div>
          </div>

          <div className="px-5 py-8 sm:px-7 sm:py-10">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-slate-100 text-slate-400">
                <LockKeyhole className="h-7 w-7" aria-hidden="true" />
              </div>

              <p className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                403
              </p>

              <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {title}
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                {description}
              </p>

              {user && (
                <div className="mx-auto mt-6 w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Current access
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                        {user.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>

                    <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-white px-2.5 py-1 text-[10px] font-bold capitalize text-slate-600 ring-1 ring-slate-200">
                      {user.role}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Link
                  href={backHref}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 sm:w-auto"
                >
                  <ArrowLeft
                    className="h-4 w-4 shrink-0 text-white"
                    aria-hidden="true"
                  />

                  <span className="text-white">{backLabel}</span>
                </Link>

                <Link
                  href="/"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                >
                  <Home
                    className="h-4 w-4 shrink-0 text-slate-500"
                    aria-hidden="true"
                  />

                  <span>Halaman utama</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
