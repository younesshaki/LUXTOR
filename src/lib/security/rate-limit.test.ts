import { describe, expect, it } from "vitest";

import { MemoryRateLimiter } from "@/lib/security/rate-limit";

describe("MemoryRateLimiter", () => {
  it("allows requests until the configured limit is reached", () => {
    const limiter = new MemoryRateLimiter(2, 1_000);

    expect(limiter.check("client-1").success).toBe(true);
    expect(limiter.check("client-1").success).toBe(true);
    expect(limiter.check("client-1").success).toBe(false);
  });
});
