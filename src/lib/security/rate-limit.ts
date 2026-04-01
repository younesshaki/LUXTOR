type RateLimitEntry = {
  count: number;
  resetAt: number;
};

export class MemoryRateLimiter {
  private readonly store = new Map<string, RateLimitEntry>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number
  ) {}

  check(key: string) {
    const now = Date.now();
    const existing = this.store.get(key);

    if (!existing || existing.resetAt <= now) {
      const next = {
        count: 1,
        resetAt: now + this.windowMs,
      };
      this.store.set(key, next);
      return {
        success: true,
        remaining: this.limit - 1,
        resetAt: next.resetAt,
      };
    }

    if (existing.count >= this.limit) {
      return {
        success: false,
        remaining: 0,
        resetAt: existing.resetAt,
      };
    }

    existing.count += 1;
    this.store.set(key, existing);

    return {
      success: true,
      remaining: this.limit - existing.count,
      resetAt: existing.resetAt,
    };
  }
}

export function getClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return headers.get("x-real-ip") ?? "unknown";
}
