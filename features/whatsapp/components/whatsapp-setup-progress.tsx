import { Check } from "lucide-react";

type SetupStepProps = {
  number: string;
  title: string;
  description: string;
  active: boolean;
  complete: boolean;
};

function SetupStep({
  number,
  title,
  description,
  active,
  complete,
}: SetupStepProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span
        className={[
          "grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[10px] font-bold ring-1 transition",
          complete
            ? "bg-emerald-500 text-white ring-emerald-500"
            : active
              ? "bg-indigo-600 text-white ring-indigo-600"
              : "bg-white text-slate-400 ring-slate-200",
        ].join(" ")}
      >
        {complete ? <Check className="h-4 w-4" /> : number}
      </span>

      <div className="min-w-0 pt-0.5">
        <p
          className={[
            "text-xs font-semibold",
            active || complete ? "text-slate-800" : "text-slate-400",
          ].join(" ")}
        >
          {title}
        </p>

        <p className="mt-0.5 text-[11px] leading-5 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

type WhatsAppSetupProgressProps = {
  connected: boolean;
  hasActiveGroup: boolean;
  progress: number;
};

export function WhatsAppSetupProgress({
  connected,
  hasActiveGroup,
  progress,
}: WhatsAppSetupProgressProps) {
  return (
    <section className="mb-6 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        <SetupStep
          number="01"
          title="Hubungkan"
          description="Scan QR untuk mengaktifkan channel."
          active={!connected}
          complete={connected}
        />

        <SetupStep
          number="02"
          title="Pilih group"
          description="Tentukan target delivery."
          active={connected && !hasActiveGroup}
          complete={hasActiveGroup}
        />

        <SetupStep
          number="03"
          title="Ready"
          description="DailyWins siap mengirim."
          active={hasActiveGroup}
          complete={hasActiveGroup}
        />
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </section>
  );
}
