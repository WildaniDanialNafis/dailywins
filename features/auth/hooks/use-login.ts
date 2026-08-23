"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { demoAccounts, useAuth } from "@/components/auth/auth-context";

import { getSafeRedirect, validateLoginForm } from "../utils";
import type { DemoAccount } from "../types";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    login,
    loading: authLoading,
    isAuthenticated,
    authStatus,
  } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [info, setInfo] = useState<string | null>(null);

  const [demoUsed, setDemoUsed] = useState(false);

  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.navigator.onLine;
  });

  const redirectTo = useMemo(
    () => getSafeRedirect(searchParams.get("next")),
    [searchParams],
  );

  const sessionExpired = authStatus === "expired";

  const busy = submitting || authLoading;

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (authLoading || !isAuthenticated) {
      return;
    }

    router.replace(redirectTo);
  }, [authLoading, isAuthenticated, redirectTo, router]);

  const clearFeedback = useCallback(() => {
    setError(null);
    setInfo(null);
  }, []);

  const updateEmail = useCallback(
    (value: string) => {
      setEmail(value);
      setDemoUsed(false);
      clearFeedback();
    },
    [clearFeedback],
  );

  const updatePassword = useCallback(
    (value: string) => {
      setPassword(value);
      setDemoUsed(false);
      clearFeedback();
    },
    [clearFeedback],
  );

  const toggleRemember = useCallback(
    (value: boolean) => {
      setRemember(value);
      clearFeedback();
    },
    [clearFeedback],
  );

  const togglePassword = useCallback(() => {
    if (busy) {
      return;
    }

    setShowPassword((current) => !current);
  }, [busy]);

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (busy) {
        return;
      }

      clearFeedback();

      const validation = validateLoginForm({
        email,
        password,
      });

      if (validation.error) {
        setError(validation.error);
        return;
      }

      if (!validation.email) {
        return;
      }

      setSubmitting(true);

      try {
        const result = await login(validation.email, password, remember);

        if (!result.success) {
          setError(result.message);
          return;
        }

        router.replace(redirectTo);
      } catch {
        setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      } finally {
        setSubmitting(false);
      }
    },
    [busy, clearFeedback, email, login, password, redirectTo, remember, router],
  );

  const fillDemoAccount = useCallback(
    (account: DemoAccount) => {
      if (busy) {
        return;
      }

      setEmail(account.email);
      setPassword(account.password);
      setDemoUsed(true);

      setError(null);
      setInfo(
        `Akun demo ${account.role} sudah diisi. Tekan Sign in untuk melanjutkan.`,
      );
    },
    [busy],
  );

  const showForgotPasswordMessage = useCallback(() => {
    if (busy) {
      return;
    }

    setError(null);
    setInfo("Pemulihan password belum diaktifkan pada versi ini.");
  }, [busy]);

  return {
    email,
    password,
    remember,
    showPassword,

    submitting,
    authLoading,
    busy,

    error,
    info,
    demoUsed,

    isOnline,
    sessionExpired,
    isAuthenticated,

    demoAccounts,

    updateEmail,
    updatePassword,
    toggleRemember,
    togglePassword,

    submit,

    fillDemoAccount,
    showForgotPasswordMessage,
    clearFeedback,
  };
}
