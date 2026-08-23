import { AlertCircle, CheckCircle2 } from "lucide-react";

type LoginFeedbackProps = {
  error: string | null;
  info: string | null;
};

export function LoginFeedback({ error, info }: LoginFeedbackProps) {
  if (error) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

        <span className="min-w-0 leading-5">{error}</span>
      </div>
    );
  }

  if (info) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-5 flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3.5 text-sm text-indigo-700"
      >
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

        <span className="min-w-0 leading-5">{info}</span>
      </div>
    );
  }

  return null;
}
