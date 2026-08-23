import { Clock3 } from "lucide-react";

type LoginSessionBadgeProps = {
  remember: boolean;
};

export function LoginSessionBadge({ remember }: LoginSessionBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-400">
      <Clock3 className="h-3.5 w-3.5" />

      {remember ? "Session 30 hari" : "Session 8 jam"}
    </span>
  );
}
