import { ArrowRight } from "lucide-react";

import type { DemoAccount } from "../types";

type DemoAccountListProps = {
  accounts: readonly DemoAccount[];
  busy: boolean;
  onSelect: (account: DemoAccount) => void;
};

export function DemoAccountList({
  accounts,
  busy,
  onSelect,
}: DemoAccountListProps) {
  if (accounts.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border-t border-slate-100 pt-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-600">Demo accounts</p>

          <p className="mt-0.5 text-[10px] text-slate-400">
            Untuk simulasi UI dan permission
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-500">
          Demo
        </span>
      </div>

      <div className="mt-3 grid gap-2">
        {accounts.map((account) => (
          <button
            key={account.email}
            type="button"
            onClick={() => onSelect(account)}
            disabled={busy}
            className="group flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left transition duration-200 hover:border-indigo-100 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-xs font-semibold text-slate-700">
                  {account.role}
                </p>

                <span className="rounded-full bg-indigo-50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-indigo-600">
                  Demo
                </span>
              </div>

              <p className="mt-0.5 truncate text-[11px] text-slate-400">
                {account.email}
              </p>
            </div>

            <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 text-[10px] font-semibold text-indigo-600 ring-1 ring-slate-200 transition group-hover:bg-indigo-50 group-hover:ring-indigo-100">
              Use
              <ArrowRight className="h-3 w-3" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
