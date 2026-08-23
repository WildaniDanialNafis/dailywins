import type { ComponentType } from "react";

export type ConnectionState = "disconnected" | "scanning" | "connected";

export type ToastState = {
  type: "success" | "error" | "info";
  title: string;
  message: string;
};

export type WhatsAppGroup = {
  id: string;
  name: string;
  members: number;
};

export type FeatureCardData = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};
