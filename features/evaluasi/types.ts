export type Activity = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  activities: Activity[];
};

export type EvaluationItem = {
  id: number;
  activityId: number;
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
      type: "category";
      id: number;
      label: string;
    }
  | {
      type: "activity";
      id: number;
      label: string;
    }
  | {
      type: "evaluation";
      id: number;
      label: string;
    }
  | null;

export type ActivityLookupValue = {
  activity: Activity;
  category: Category;
};