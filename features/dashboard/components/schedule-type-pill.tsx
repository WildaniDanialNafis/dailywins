import type { ScheduleItemType } from "../types";

const scheduleTypeConfig = {
  routine: {
    label: "Routine",
    tone: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  focus: {
    label: "Focus",
    tone: "bg-indigo-50 text-indigo-700",
    dot: "bg-indigo-500",
  },
  learning: {
    label: "Learning",
    tone: "bg-violet-50 text-violet-700",
    dot: "bg-violet-500",
  },
} as const;

export function ScheduleTypePill({ type }: { type: ScheduleItemType }) {
  const config = scheduleTypeConfig[type];

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-semibold",
        config.tone,
      ].join(" ")}
    >
      <span className={["h-1.5 w-1.5 rounded-full", config.dot].join(" ")} />

      {config.label}
    </span>
  );
}
