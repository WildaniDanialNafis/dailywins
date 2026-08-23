"use client";

import { useEffect, useState } from "react";

export function usePageLoading(duration = 450) {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        setPageLoading(false);
      },
      Math.max(0, duration),
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [duration]);

  return pageLoading;
}
