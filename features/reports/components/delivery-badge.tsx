import { AlertCircle, CheckCircle2 } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { getDeliveryLabel, getDeliveryTone } from "../utils";
import type { DeliveryState } from "../types";

export function DeliveryBadge({ state }: { state: DeliveryState }) {
  if (state === "idle") {
    return null;
  }

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
        getDeliveryTone(state),
      ].join(" ")}
    >
      {state === "preparing" || state === "sending" ? (
        <LoadingSpinner />
      ) : state === "sent" ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <AlertCircle className="h-3 w-3" />
      )}

      {getDeliveryLabel(state)}
    </span>
  );
}
