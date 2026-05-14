export const STORAGE_KEYS = {
  movieSwipe: 'movieswipe-state'
} as const;

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
