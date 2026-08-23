export function getScheduleItemKey(time: string, activity: string) {
  return `${time}-${activity}`;
}

export function calculateCompletionPercentage(
  completedCount: number,
  totalCount: number,
) {
  if (totalCount === 0) {
    return 0;
  }

  return Math.round((completedCount / totalCount) * 100);
}

export function formatDashboardStatus(
  connected: boolean,
  hasActiveGroup: boolean,
) {
  if (connected && hasActiveGroup) {
    return "Ready";
  }

  if (connected) {
    return "Connected";
  }

  return "Optional";
}
