"use client";

import { useEffect, useMemo, useState } from "react";

import { workflowSteps } from "../data/home-data";

export function useWorkflowPreview() {
  const [activeStep, setActiveStep] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % workflowSteps.length);
    }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  const currentWorkflow = useMemo(
    () => workflowSteps[activeStep] ?? workflowSteps[0],
    [activeStep],
  );

  const currentWorkflowProgress =
    ((activeStep + 1) / workflowSteps.length) * 100;

  return {
    activeStep,
    setActiveStep,
    isPaused,
    setIsPaused,
    currentWorkflow,
    currentWorkflowProgress,
  };
}
