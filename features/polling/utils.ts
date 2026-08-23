import type { DeliveryState, Polling } from "./types";

export function getNextPollingId(pollings: Polling[]) {
  return Math.max(0, ...pollings.map((polling) => polling.id)) + 1;
}

export function filterPollings(pollings: Polling[], searchValue: string) {
  const query = searchValue.trim().toLowerCase();

  if (!query) {
    return pollings;
  }

  return pollings.filter(
    (polling) =>
      polling.title.toLowerCase().includes(query) ||
      polling.options.some((option) => option.toLowerCase().includes(query)),
  );
}

export function isPollingReady(polling: Polling) {
  return polling.options.length >= 2;
}

export function getSendingCount(
  pollings: Polling[],
  deliveryStates: Record<number, DeliveryState>,
) {
  return pollings.filter((polling) => {
    const state = deliveryStates[polling.id];

    return state === "preparing" || state === "sending";
  }).length;
}

export function getDeliveredCount(
  pollings: Polling[],
  deliveryStates: Record<number, DeliveryState>,
) {
  return pollings.filter((polling) => deliveryStates[polling.id] === "sent")
    .length;
}

export function getTotalOptions(pollings: Polling[]) {
  return pollings.reduce((total, polling) => total + polling.options.length, 0);
}
