import { CheckCircle2, Clock3, ShieldCheck } from "lucide-react";

import type { LoginFeature } from "../types";

export const APP_NAME = "DailyWins";

export const APP_SUBTITLE = "Operations Workspace";

export const loginFeatures: LoginFeature[] = [
  {
    icon: ShieldCheck,
    title: "Akses privat",
    description: "Workspace dilindungi oleh login dan permission.",
  },
  {
    icon: CheckCircle2,
    title: "Workflow terstruktur",
    description: "Create → Plan → Connect → Send.",
  },
  {
    icon: Clock3,
    title: "Session-aware",
    description: "Durasi session mengikuti preferensi Remember me.",
  },
];
