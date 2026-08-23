"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  LockKeyhole,
  RefreshCw,
  SearchX,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const APP_NAME = "DailyWins";
const APP_SUBTITLE = "Operations Workspace";

const recoveryLinks = [
  {
    href: "/",
    label: "Halaman utama",
    description: "Kembali ke landing page DailyWins.",
    icon: Home,
  },
  {
    href: "/login",
    label: "Masuk ke workspace",
    description: "Buka workspace dan lanjutkan aktivitas.",
    icon: LockKeyhole,
  },
];

function ErrorVisual() {
  return (
    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-linear-to-br from-indigo-50 via-white to-violet-50 px-6 py-10 sm:min-h-[360px] lg:min-h-[560px] lg:px-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-100 sm:h-72 sm:w-72" />

        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-indigo-200 sm:h-52 sm:w-52" />

        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-xl sm:h-36 sm:w-36" />

        <div className="absolute left-[16%] top-[18%] h-2 w-2 rounded-full bg-indigo-300" />

        <div className="absolute right-[18%] top-[28%] h-2.5 w-2.5 rounded-full bg-violet-300" />

        <div className="absolute bottom-[20%] left-[24%] h-2 w-2 rounded-full bg-sky-300" />

        <div className="absolute bottom-[18%] right-[22%] h-2 w-2 rounded-full bg-indigo-200" />
      </div>

      <div className="relative">
        <div className="relative grid h-36 w-36 place-items-center rounded-[28px] bg-white shadow-2xl shadow-indigo-100/80 ring-1 ring-indigo-100 sm:h-48 sm:w-48 sm:rounded-[32px]">
          <div className="absolute inset-3 rounded-[22px] border border-slate-100 sm:inset-4 sm:rounded-[26px]" />

          <SearchX className="relative h-16 w-16 text-indigo-500 sm:h-20 sm:w-20" />

          <span className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-2xl bg-white text-indigo-500 shadow-lg ring-1 ring-slate-100 sm:-right-4 sm:-top-4 sm:h-12 sm:w-12">
            <Compass className="h-5 w-5" />
          </span>

          <span className="absolute -bottom-3 -left-3 grid h-11 w-11 place-items-center rounded-2xl bg-white text-violet-500 shadow-lg ring-1 ring-slate-100 sm:-bottom-4 sm:-left-4 sm:h-12 sm:w-12">
            <ArrowRight className="h-5 w-5" />
          </span>

          <span className="absolute -left-2 top-3 grid h-9 w-9 place-items-center rounded-xl bg-white text-indigo-400 shadow-md ring-1 ring-slate-100 sm:-left-4 sm:top-5">
            <Sparkles className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

function RecoveryCard({
  href,
  label,
  description,
  icon: Icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: typeof Home;
}) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:p-4"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-50 text-indigo-600 ring-1 ring-slate-200">
        <Icon className="h-4.5 w-4.5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-bold text-slate-800 sm:text-sm">
          {label}
        </span>

        <span className="mt-0.5 block truncate text-[10px] leading-5 text-slate-400 sm:text-[11px]">
          {description}
        </span>
      </span>

      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
    </Link>
  );
}

export default function NotFound() {
  const [retrying, setRetrying] = useState(false);
  const [retryProgress, setRetryProgress] = useState(0);

  useEffect(() => {
    if (!retrying) {
      return;
    }

    const timer = window.setInterval(() => {
      setRetryProgress((current) => {
        if (current >= 100) {
          return 100;
        }

        return Math.min(current + 20, 100);
      });
    }, 120);

    return () => {
      window.clearInterval(timer);
    };
  }, [retrying]);

  useEffect(() => {
    if (!retrying) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.location.reload();
    }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, [retrying]);

  function retryPage() {
    if (retrying) {
      return;
    }

    setRetryProgress(0);
    setRetrying(true);
  }

  return (
    <main className="min-h-svh overflow-x-clip bg-slate-50 text-slate-950">
      <a
        href="#not-found-content"
        className="sr-only z-[100] rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Lewati ke konten utama
      </a>

      <div className="relative flex min-h-svh items-center justify-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-indigo-100/70 blur-3xl sm:-left-40 sm:-top-40 sm:h-96 sm:w-96" />

          <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-violet-100/60 blur-3xl sm:-bottom-40 sm:-right-40 sm:h-96 sm:w-96" />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-3xl sm:h-96 sm:w-96" />
        </div>

        <div className="relative w-full max-w-5xl">
          <div className="mb-4 flex items-center justify-between gap-3 px-1 sm:mb-5">
            <Link
              href="/"
              className="group inline-flex min-w-0 items-center gap-2"
              aria-label={`${APP_NAME} home`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100 transition group-hover:-translate-y-0.5 group-hover:shadow-md sm:h-10 sm:w-10 sm:rounded-2xl">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>

              <span className="min-w-0">
                <span className="block truncate text-sm font-bold tracking-tight text-slate-950 sm:text-[15px]">
                  {APP_NAME}
                </span>

                <span className="block truncate text-[9px] font-medium uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">
                  {APP_SUBTITLE}
                </span>
              </span>
            </Link>

            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 shadow-sm ring-1 ring-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              404
            </span>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-200/70 backdrop-blur-xl sm:rounded-[28px] lg:rounded-[32px]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <ErrorVisual />

              <section
                id="not-found-content"
                className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:p-10 xl:p-12"
              >
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href="/"
                    className="inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-100"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Kembali
                  </Link>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-700">
                    Route not found
                  </span>
                </div>

                <div className="mt-7 sm:mt-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[4.25rem] font-bold leading-none tracking-[-0.065em] text-slate-950 sm:text-7xl">
                      404
                    </p>

                    <div className="mb-1 hidden h-8 w-px bg-slate-200 sm:block" />

                    <div className="mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-500">
                        DailyWins
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Halaman tidak tersedia
                      </p>
                    </div>
                  </div>

                  <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem]">
                    Halaman yang kamu cari tidak ditemukan.
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                    URL mungkin sudah berubah, halaman belum tersedia, atau
                    alamat yang dibuka tidak sesuai. Gunakan salah satu jalur
                    berikut untuk kembali ke workflow DailyWins.
                  </p>
                </div>

                <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {recoveryLinks.map((item) => (
                    <RecoveryCard key={item.href} {...item} />
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={retryPage}
                    disabled={retrying}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 text-sm font-semibold text-slate-700 transition duration-200 hover:bg-white focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <RefreshCw
                      className={[
                        "h-4 w-4 shrink-0 text-slate-500",
                        retrying ? "animate-spin" : "",
                      ].join(" ")}
                    />

                    <span>
                      {retrying ? "Memuat ulang..." : "Coba muat ulang"}
                    </span>
                  </button>

                  {retrying && (
                    <div className="mt-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all duration-150"
                          style={{
                            width: `${retryProgress}%`,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-center text-[10px] font-medium text-slate-400">
                        Memeriksa ulang halaman...
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5">
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-700">
                        {APP_NAME}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {APP_SUBTITLE}
                      </p>
                    </div>

                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 ring-1 ring-slate-100">
                      <LockKeyhole className="h-3 w-3" />
                      Private workspace
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <footer className="mt-5 px-2 text-center text-[11px] leading-5 text-slate-400 sm:text-xs">
            © {new Date().getFullYear()} {APP_NAME} · {APP_SUBTITLE}
          </footer>
        </div>
      </div>
    </main>
  );
}
