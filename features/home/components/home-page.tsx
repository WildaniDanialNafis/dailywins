import { APP_NAME, APP_SUBTITLE, infoCards, modules } from "../data/home-data";

import { DailyWorkflowSection } from "./daily-workflow-section";
import { HeroSection } from "./hero-section";
import { HomeCta } from "./home-cta";
import { HomeHeader } from "./home-header";
import { InfoCard } from "./info-card";
import { ModuleCard } from "./module-card";

export function HomePage() {
  return (
    <main className="min-h-svh overflow-x-clip bg-slate-50 text-slate-950">
      <a
        href="#main-content"
        className="sr-only z-100 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:shadow-lg"
      >
        Lewati ke konten utama
      </a>

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-28 -top-20 h-56 w-56 rounded-full bg-indigo-100/80 blur-3xl sm:-left-36 sm:-top-28 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

          <div className="absolute -right-28 top-24 h-60 w-60 rounded-full bg-violet-100/70 blur-3xl sm:-right-36 sm:top-16 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

          <div className="absolute left-1/2 top-168 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-100/50 blur-3xl sm:top-192 sm:h-80 sm:w-80" />
        </div>

        <div className="relative mx-auto w-full max-w-345 px-4 sm:px-6 lg:px-8">
          <HomeHeader />

          <HeroSection />

          <section id="features" className="scroll-mt-6 py-2 sm:py-4">
            <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                  Workspace
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Semua workflow dalam satu tempat
                </h2>
              </div>

              <p className="max-w-2xl text-sm leading-6 text-slate-500">
                Setiap modul memiliki tanggung jawab berbeda, tetapi tetap
                terhubung dalam satu alur kerja DailyWins.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {modules.map((module) => (
                <ModuleCard key={module.title} module={module} />
              ))}
            </div>
          </section>

          <section className="mt-5 grid gap-3 lg:grid-cols-3">
            {infoCards.map((card) => (
              <InfoCard key={card.title} {...card} />
            ))}
          </section>

          <DailyWorkflowSection />

          <HomeCta />

          <footer className="mt-8 border-t border-slate-200/80 py-5 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} {APP_NAME} · {APP_SUBTITLE}
          </footer>
        </div>
      </div>
    </main>
  );
}
