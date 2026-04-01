import { describe, expect, it } from "vitest";

import { leadSubmissionSchema } from "@/lib/validations/submissions";

describe("leadSubmissionSchema", () => {
  it("accepts a complete quote submission", () => {
    const parsed = leadSubmissionSchema.parse({
      type: "quote",
      fullName: "Youness Haki",
      email: "TEST@EXAMPLE.COM",
      phone: "+1 555 123 4567",
      suburb: "Los Angeles",
      serviceInterest: "curtains",
      message: "Floor to ceiling linen drapes for the living room.",
      sourcePage: "/quote",
      sourceVariant: "quote-page",
      turnstileToken: "",
    });

    expect(parsed.email).toBe("test@example.com");
    expect(parsed.type).toBe("quote");
  });

  it("rejects a quote submission that is missing required quote fields", () => {
    const result = leadSubmissionSchema.safeParse({
      type: "quote",
      fullName: "Youness Haki",
      email: "test@example.com",
      phone: "",
      suburb: "",
      serviceInterest: "",
      message: "",
      sourcePage: "/quote",
      sourceVariant: "quote-page",
      turnstileToken: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a contact submission without a message", () => {
    const result = leadSubmissionSchema.safeParse({
      type: "contact",
      fullName: "Youness Haki",
      email: "test@example.com",
      sourcePage: "/contact",
      sourceVariant: "contact-page",
      turnstileToken: "",
    });

    expect(result.success).toBe(false);
  });
});
