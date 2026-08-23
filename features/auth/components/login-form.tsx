import { ArrowRight, Eye, EyeOff } from "lucide-react";
import type { FormEvent } from "react";

import { ButtonContent } from "@/components/ui/button-content";

import { LoginSessionBadge } from "./login-session-badge";

type LoginFormProps = {
  email: string;
  password: string;
  remember: boolean;
  showPassword: boolean;
  busy: boolean;
  submitting: boolean;
  sessionExpired: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberChange: (value: boolean) => void;
  onTogglePassword: () => void;
  onForgotPassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
};

export function LoginForm({
  email,
  password,
  remember,
  showPassword,
  busy,
  submitting,
  sessionExpired,
  onEmailChange,
  onPasswordChange,
  onRememberChange,
  onTogglePassword,
  onForgotPassword,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold text-slate-700">
          Email
        </span>

        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          autoCapitalize="none"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="you@example.com"
          disabled={busy}
          className="ui-input min-h-11 w-full disabled:cursor-not-allowed disabled:opacity-60"
        />
      </label>

      <label className="block">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-700">Password</span>

          <button
            type="button"
            onClick={onForgotPassword}
            disabled={busy}
            className="min-h-8 px-1 text-[11px] font-semibold text-indigo-600 transition hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Forgot password?
          </button>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Enter your password"
            disabled={busy}
            className="ui-input min-h-11 w-full pr-12 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={onTogglePassword}
            disabled={busy}
            className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </label>

      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex min-h-9 cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={(event) => onRememberChange(event.target.checked)}
              disabled={busy}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600 disabled:cursor-not-allowed"
            />

            <span className="text-xs font-medium text-slate-600">
              Remember me
            </span>
          </label>

          <LoginSessionBadge remember={remember} />
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/70 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <ButtonContent loading={submitting} loadingText="Signing in...">
          <span className="text-white">
            {sessionExpired ? "Login kembali" : "Sign in"}
          </span>

          <ArrowRight className="h-4 w-4 shrink-0 text-white" />
        </ButtonContent>
      </button>
    </form>
  );
}
