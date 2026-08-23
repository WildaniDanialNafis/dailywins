import type { ConnectionState } from "./types";

export function simulateDelay(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export function getSetupProgress(
  connected: boolean,
  hasActiveGroup: boolean,
  connectionState: ConnectionState,
) {
  if (!connected) {
    return connectionState === "scanning" ? 33 : 0;
  }

  return hasActiveGroup ? 100 : 66;
}
