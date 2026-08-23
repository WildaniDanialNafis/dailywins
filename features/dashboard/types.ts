import type { LucideIcon } from "lucide-react";

export type ScheduleItemType = "routine" | "focus" | "learning";

export type ScheduleItem = {
  time: string;
  activity: string;
  type: ScheduleItemType;
};

export type RecentActivity = {
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
};

export type QuickAction = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
};

export type WorkflowStep = {
  number: string;
  title: string;
  text: string;
};

export type ActiveGroup =
  | {
      name: string;
    }
  | null
  | undefined;

export type DashboardStats = {
  categories: number;
  activities: number;
  pollings: number;
  schedule: number;
};
