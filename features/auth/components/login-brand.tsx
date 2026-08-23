import Link from "next/link";
import { Sparkles } from "lucide-react";

type LoginBrandProps = {
  dark?: boolean;
};

export function LoginBrand({ dark = false }: LoginBrandProps) {
  return (
    <Link
      href="/"
      className={[
        "group flex w-fit items-center gap-3",
        dark ? "text-white" : "text-slate-950",
      ].join(" ")}
      aria-label="DailyWins home"
    >
      <div
        className={[
          "grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition duration-200",
          dark
            ? "bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-400/10 group-hover:bg-indigo-500/15"
            : "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 group-hover:bg-indigo-100",
        ].join(" ")}
      >
        <Sparkles className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p
          className={[
            "text-sm font-bold tracking-tight",
            dark ? "text-white" : "text-slate-950",
          ].join(" ")}
        >
          DailyWins
        </p>

        <p
          className={[
            "mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em]",
            dark ? "text-slate-500" : "text-slate-400",
          ].join(" ")}
        >
          Operations Workspace
        </p>
      </div>
    </Link>
  );
}
