export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 25;

export function normalizePage(value?: number | string | null) {
  const parsed =
    typeof value === "number"
      ? value
      : value
        ? Number.parseInt(value, 10)
        : DEFAULT_PAGE;

  if (!Number.isFinite(parsed) || parsed < 1) {
    return DEFAULT_PAGE;
  }

  return parsed;
}

export function normalizeLimit(value?: number | string | null) {
  const parsed =
    typeof value === "number"
      ? value
      : value
        ? Number.parseInt(value, 10)
        : DEFAULT_LIMIT;

  if (!Number.isFinite(parsed) || parsed < 1) {
    return DEFAULT_LIMIT;
  }

  return Math.min(parsed, 100);
}
