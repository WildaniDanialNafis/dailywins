export type Polling = {
  id: number;
  title: string;
  options: string[];
};

export type ToastState = {
  type: "success" | "error" | "info";
  title: string;
  message: string;
};

export type DeliveryState =
  | "idle"
  | "preparing"
  | "sending"
  | "sent"
  | "failed";

export type DeleteTarget =
  | {
      type: "polling";
      pollingId: number;
      label: string;
    }
  | {
      type: "option";
      pollingId: number;
      optionIndex: number;
      label: string;
    }
  | null;

export type EditingOption = {
  pollingId: number;
  index: number;
} | null;

export type DeletingOption = {
  pollingId: number;
  index: number;
} | null;
