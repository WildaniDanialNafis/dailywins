"use client";

import { AlertTriangle, X } from "lucide-react";

import { ButtonContent } from "@/components/ui/button-content";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  loading = false,
  destructive = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  const confirmTone = destructive
    ? "bg-red-600 hover:bg-red-700"
    : "bg-indigo-600 hover:bg-indigo-700";

  const iconTone = destructive
    ? "bg-red-50 text-red-600"
    : "bg-indigo-50 text-indigo-600";

  return (
    <div
      className="fixed inset-0 z-90 flex items-end justify-center bg-slate-950/30 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="w-full max-w-md rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div
              className={[
                "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                iconTone,
              ].join(" ")}
            >
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <h2
                id="confirm-dialog-title"
                className="text-base font-bold tracking-tight text-slate-900 sm:text-lg"
              >
                {title}
              </h2>

              <p
                id="confirm-dialog-description"
                className="mt-2 text-sm leading-6 text-slate-500"
              >
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="ui-button ui-button-secondary w-full sm:w-auto"
            >
              {cancelLabel}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={[
                "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition",
                "disabled:cursor-not-allowed disabled:opacity-50",
                confirmTone,
                "sm:w-auto",
              ].join(" ")}
            >
              <ButtonContent loading={loading} loadingText="Memproses...">
                <span className="text-white">{confirmLabel}</span>
              </ButtonContent>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
