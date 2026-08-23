import { AlertCircle, CheckCircle2 } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import type { DeliveryState } from "../types";

type ScheduleDeliveryStatusProps = {
  state: DeliveryState;
};

export function ScheduleDeliveryStatus({ state }: ScheduleDeliveryStatusProps) {
  if (state === "idle") {
    return null;
  }

  if (state === "preparing") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
        <LoadingSpinner />
        Preparing
      </span>
    );
  }

  if (state === "sending") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
        <LoadingSpinner />
        Sending
      </span>
    );
  }

  if (state === "sent") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
        <CheckCircle2 className="h-3 w-3" />
        Sent
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-700">
      <AlertCircle className="h-3 w-3" />
      Failed
    </span>
  );
}
