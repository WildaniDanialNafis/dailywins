"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, LogIn, ShieldAlert } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { PageSkeleton } from "@/components/ui/skeleton";

import { useAuth } from "./auth-context";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const pathname = usePathname();

  const { loading, isAuthenticated, authStatus } = useAuth();

  const nextPath = pathname || "/dashboard";

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }

    router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
  }, [loading, isAuthenticated, nextPath, router]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (authStatus === "expired") {
    return (
      <main className="grid min-h-svh place-items-center bg-slate-50 px-4 py-8">
        <section className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
            <Clock3 className="h-7 w-7" aria-hidden="true" />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
            Session expired
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Session kamu telah berakhir.
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Demi keamanan, akses ke workspace dihentikan setelah session
            berakhir. Silakan login kembali untuk melanjutkan pekerjaan.
          </p>

          <Link
            href={`/login?next=${encodeURIComponent(nextPath)}`}
            className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <LogIn className="h-4 w-4 shrink-0 text-white" />

            <span className="text-white">Login kembali</span>

            <ArrowRight className="h-4 w-4 shrink-0 text-white" />
          </Link>

          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-left">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

            <p className="text-[11px] leading-5 text-slate-500">
              Halaman yang sedang kamu buka akan dipertahankan setelah login
              berhasil.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="grid min-h-svh place-items-center bg-slate-50 px-4 py-8">
      <section className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-xl shadow-slate-200/50 sm:p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
          <ShieldAlert className="h-7 w-7" aria-hidden="true" />
        </div>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Authentication required
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
          Silakan login terlebih dahulu.
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Kamu perlu login untuk mengakses workspace ini.
        </p>

        <Link
          href={`/login?next=${encodeURIComponent(nextPath)}`}
          className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <LogIn className="h-4 w-4 shrink-0 text-white" />

          <span className="text-white">Login</span>

          <ArrowRight className="h-4 w-4 shrink-0 text-white" />
        </Link>
      </section>
    </main>
  );
}
