import type { LucideIcon } from "lucide-react";

export type LoginFeedbackType = "error" | "info";

export type LoginFeedback = {
  type: LoginFeedbackType;
  message: string;
};

export type LoginFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type SessionBadgeProps = {
  remember: boolean;
};

export type DemoAccount = {
  email: string;
  password: string;
  role: string;
};
