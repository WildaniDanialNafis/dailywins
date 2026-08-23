"use client";

import Link from "next/link";
import { Clock3, LockKeyhole, ShieldCheck, Wifi, WifiOff } from "lucide-react";

import { PageSkeleton } from "@/components/ui/skeleton";

import { APP_NAME, APP_SUBTITLE, loginFeatures } from "../data/login-data";
import { useLogin } from "../hooks/use-login";

import { DemoAccountList } from "./demo-account-list";
import { LoginBrand } from "./login-brand";
import { LoginFeatureRow } from "./login-feature-row";
import { LoginFeedback } from "./login-feedback";
import { LoginForm } from "./login-form";

export function LoginPage() {
  const login = useLogin();

  if (login.authLoading || login.isAuthenticated) {
    return <PageSkeleton />;
  }

  return (
    <main className="min-h-svh overflow-x-clip bg-slate-50 text-slate-950">
      <div className="grid min-h-svh lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden overflow-hidden bg-slate-950 lg:block">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-120 w-120 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute left-1/3 top-1/3 h-60 w-60 rounded-full bg-sky-400/5 blur-3xl" />
          </div>

          <div className="relative flex min-h-svh flex-col justify-between p-8 xl:p-12">
            <LoginBrand dark />

            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-semibold text-indigo-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Private workspace
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-white xl:text-5xl">
                Masuk dan lanjutkan pekerjaanmu.
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 xl:text-base">
                Kelola evaluasi, polling, schedule, aktivitas harian, dan
                delivery WhatsApp dari satu workspace DailyWins.
              </p>

              <div className="mt-8 grid max-w-md gap-2.5">
                {loginFeatures.map((feature) => (
                  <LoginFeatureRow key={feature.title} {...feature} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-slate-600">
                © {new Date().getFullYear()} {APP_NAME}
              </p>

              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                <Wifi className="h-3 w-3" />
                Secure workspace
              </span>
            </div>
          </div>
        </aside>

        <section className="flex min-h-svh items-center justify-center px-4 py-5 sm:px-6 sm:py-8 lg:px-10 xl:px-14">
          <div className="w-full max-w-md">
            <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
              <LoginBrand />

              <span
                className={[
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold",
                  login.isOnline
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    login.isOnline ? "bg-emerald-500" : "bg-amber-500",
                  ].join(" ")}
                />

                {login.isOnline ? "Online" : "Offline"}
              </span>
            </div>

            {!login.isOnline && (
              <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5">
                <WifiOff className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-amber-900">
                    Koneksi sedang offline
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-800/80">
                    Periksa koneksi internet sebelum melakukan login.
                  </p>
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/60 sm:rounded-[28px]">
              <div className="p-5 sm:p-7">
                <div>
                  <div
                    className={[
                      "grid h-11 w-11 place-items-center rounded-2xl ring-1",
                      login.sessionExpired
                        ? "bg-amber-50 text-amber-600 ring-amber-100"
                        : "bg-indigo-50 text-indigo-600 ring-indigo-100",
                    ].join(" ")}
                  >
                    {login.sessionExpired ? (
                      <Clock3 className="h-5 w-5" />
                    ) : (
                      <LockKeyhole className="h-5 w-5" />
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <p
                      className={[
                        "text-[10px] font-bold uppercase tracking-[0.18em]",
                        login.sessionExpired
                          ? "text-amber-600"
                          : "text-indigo-500",
                      ].join(" ")}
                    >
                      {login.sessionExpired
                        ? "Session expired"
                        : "Welcome back"}
                    </p>

                    {login.demoUsed && (
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500">
                        Demo account
                      </span>
                    )}
                  </div>

                  <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.8rem]">
                    {login.sessionExpired ? "Login kembali" : "Sign in"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {login.sessionExpired
                      ? "Session kamu telah berakhir. Login kembali untuk melanjutkan pekerjaan."
                      : `Masuk ke workspace ${APP_NAME}.`}
                  </p>
                </div>

                {login.sessionExpired && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3.5">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-amber-900">
                        Session telah berakhir
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-800/80">
                        Setelah berhasil login, kamu akan kembali ke halaman
                        sebelumnya.
                      </p>
                    </div>
                  </div>
                )}

                <LoginFeedback error={login.error} info={login.info} />

                <LoginForm
                  email={login.email}
                  password={login.password}
                  remember={login.remember}
                  showPassword={login.showPassword}
                  busy={login.busy}
                  submitting={login.submitting}
                  sessionExpired={login.sessionExpired}
                  onEmailChange={login.updateEmail}
                  onPasswordChange={login.updatePassword}
                  onRememberChange={login.toggleRemember}
                  onTogglePassword={login.togglePassword}
                  onForgotPassword={login.showForgotPasswordMessage}
                  onSubmit={login.submit}
                />

                <DemoAccountList
                  accounts={login.demoAccounts}
                  busy={login.busy}
                  onSelect={login.fillDemoAccount}
                />
              </div>

              <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-7">
                <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                  <Link
                    href="/"
                    className="text-xs font-semibold text-slate-400 transition hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-100"
                  >
                    Kembali ke halaman utama
                  </Link>

                  <div className="flex items-center justify-center gap-2 sm:justify-end">
                    <span
                      className={[
                        "h-1.5 w-1.5 rounded-full",
                        login.isOnline ? "bg-emerald-500" : "bg-amber-500",
                      ].join(" ")}
                    />

                    <span className="text-[10px] text-slate-400">
                      {login.isOnline
                        ? "Connection available"
                        : "Connection offline"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[10px] leading-5 text-slate-400 sm:text-xs">
              © {new Date().getFullYear()} {APP_NAME} · {APP_SUBTITLE}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
