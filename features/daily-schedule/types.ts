export type ScheduleBlock = {
  id: number;
  start: string;
  end: string;
  activity: string;
};

export type DraftState = {
  start: string;
  end: string;
  activity: string;
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
      type: "item";
      id: number;
      activity: string;
    }
  | {
      type: "selected";
      count: number;
    }
  | {
      type: "reset";
    }
  | null;
