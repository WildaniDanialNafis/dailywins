"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";

type ToastType = "success" | "error" | "info";

type ToastProps = {
  open: boolean;
  type?: ToastType;
  title?: string;
  message: string;
  onClose: () => void;
  duration?: number;
};

const typeConfig = {
  success: {
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
    titleClass: "text-slate-900",
    progressClass: "bg-emerald-500",
  },

  error: {
    icon: AlertCircle,
    iconClass: "bg-red-50 text-red-600",
    titleClass: "text-slate-900",
    progressClass: "bg-red-500",
  },

  info: {
    icon: Info,
    iconClass: "bg-indigo-50 text-indigo-600",
    titleClass: "text-slate-900",
    progressClass: "bg-indigo-500",
  },
} satisfies Record<
  ToastType,
  {
    icon: typeof Info | typeof CheckCircle2 | typeof AlertCircle;
    iconClass: string;
    titleClass: string;
    progressClass: string;
  }
>;

export function Toast({
  open,
  type = "info",
  title,
  message,
  onClose,
  duration = 3600,
}: ToastProps) {
  const config = typeConfig[type];

  const Icon = config.icon;

  const safeDuration = Math.max(0, duration);

  useEffect(() => {
    if (!open || safeDuration === 0) {
      return;
    }

    const timer = window.setTimeout(onClose, safeDuration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open, safeDuration, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-4 z-100 flex justify-end sm:inset-x-auto sm:bottom-5 sm:right-5"
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
        <div className="flex items-start gap-3 p-4">
          <div
            className={[
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
              config.iconClass,
            ].join(" ")}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1 pr-1">
            {title && (
              <p className={["text-sm font-bold", config.titleClass].join(" ")}>
                {title}
              </p>
            )}

            <p
              className={[
                title ? "mt-1" : "",
                "text-xs leading-5 text-slate-500",
              ].join(" ")}
            >
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Tutup notifikasi"
            title="Tutup notifikasi"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {safeDuration > 0 && (
          <div className="h-0.5 bg-slate-100" aria-hidden="true">
            <div
              className={[
                "h-full origin-left animate-[toast-progress_linear_forwards]",
                config.progressClass,
              ].join(" ")}
              style={{
                animationDuration: `${safeDuration}ms`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
