"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type DraftStatus = "idle" | "saving" | "saved" | "restored";

type UseDraftAutosaveOptions<T> = {
  key: string;
  value: T;
  enabled?: boolean;
  delay?: number;
};

type UseDraftAutosaveResult<T> = {
  status: DraftStatus;
  hasDraft: boolean;
  restoredValue: T | null;
  clearDraft: () => void;
};

type StoredDraft<T> = {
  value: T;
  savedAt: number;
};

function readStoredDraft<T>(key: string): StoredDraft<T> | null {
  try {
    const raw = window.localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<StoredDraft<T>>;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.savedAt !== "number" ||
      !("value" in parsed)
    ) {
      window.localStorage.removeItem(key);
      return null;
    }

    return {
      value: parsed.value as T,
      savedAt: parsed.savedAt,
    };
  } catch {
    return null;
  }
}

export function useDraftAutosave<T>({
  key,
  value,
  enabled = true,
  delay = 800,
}: UseDraftAutosaveOptions<T>): UseDraftAutosaveResult<T> {
  const initialDraft = useState<StoredDraft<T> | null>(() => {
    if (!enabled || typeof window === "undefined") {
      return null;
    }

    return readStoredDraft<T>(key);
  })[0];

  const [status, setStatus] = useState<DraftStatus>(
    initialDraft ? "restored" : "idle",
  );

  const [hasDraft, setHasDraft] = useState(Boolean(initialDraft));

  const [restoredValue] = useState<T | null>(initialDraft?.value ?? null);

  const initializedRef = useRef(enabled);

  const serializedValue = JSON.stringify(value);

  useEffect(() => {
    if (!enabled) {
      initializedRef.current = false;
      return;
    }

    initializedRef.current = true;

    return () => {
      initializedRef.current = false;
    };
  }, [enabled, key]);

  useEffect(() => {
    if (!enabled || !initializedRef.current) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        try {
          setStatus("saving");

          const draft: StoredDraft<T> = {
            value,
            savedAt: Date.now(),
          };

          window.localStorage.setItem(key, JSON.stringify(draft));

          setHasDraft(true);
          setStatus("saved");
        } catch {
          setStatus("idle");
        }
      },
      Math.max(0, delay),
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, enabled, key, serializedValue, value]);

  const clearDraft = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore unavailable storage.
    }

    setHasDraft(false);
    setStatus("idle");
  }, [key]);

  return {
    status,
    hasDraft,
    restoredValue,
    clearDraft,
  };
}
