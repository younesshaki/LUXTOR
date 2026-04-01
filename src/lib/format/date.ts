const stableDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatStableDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;

  return stableDateFormatter.format(date);
}
