import { AlertCircle, CheckCircle2 } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import type { DeliveryState } from "../types";

export function DeliveryStatus({ state }: { state: DeliveryState }) {
  if (state === "idle") {
    return null;
  }

  const config = {
    preparing: {
      label: "Preparing",
      tone: "bg-amber-50 text-amber-700",
    },
    sending: {
      label: "Sending",
      tone: "bg-indigo-50 text-indigo-700",
    },
    sent: {
      label: "Sent",
      tone: "bg-emerald-50 text-emerald-700",
    },
    failed: {
      label: "Failed",
      tone: "bg-red-50 text-red-700",
    },
  } as const;

  const current = config[state];

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
        current.tone,
      ].join(" ")}
    >
      {state === "preparing" || state === "sending" ? (
        <LoadingSpinner />
      ) : state === "sent" ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <AlertCircle className="h-3 w-3" />
      )}

      {current.label}
    </span>
  );
}
