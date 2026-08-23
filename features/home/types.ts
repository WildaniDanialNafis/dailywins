import type { LucideIcon } from "lucide-react";

export type WorkflowStep = {
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
};

export type HomeModule = {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  href: string;
  tone: string;
  accent: string;
};

export type HomeStat = {
  value: string;
  label: string;
  description: string;
};

export type QuickFact = {
  icon: LucideIcon;
  label: string;
};

export type WorkflowPreviewItem = {
  time: string;
  title: string;
  type: string;
  tone: string;
};

export type InfoCardData = {
  icon: LucideIcon;
  title: string;
  description: string;
};
