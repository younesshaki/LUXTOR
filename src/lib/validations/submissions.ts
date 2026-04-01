import { z } from "zod";

export const submissionTypes = ["quote", "contact"] as const;
export const submissionStatuses = [
  "submitted",
  "under_review",
  "contacted",
  "converted",
  "closed",
] as const;
export const odooSyncStatuses = ["pending", "queued", "synced", "failed"] as const;

const optionalTrimmedString = z
  .union([z.string().trim().max(5000), z.literal("")])
  .optional()
  .transform((value) => {
    if (!value) {
      return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  });

export const leadSubmissionSchema = z
  .object({
    type: z.enum(submissionTypes),
    fullName: z.string().trim().min(2).max(120),
    email: z.email().transform((value) => value.trim().toLowerCase()),
    phone: optionalTrimmedString,
    suburb: optionalTrimmedString,
    serviceInterest: optionalTrimmedString,
    message: optionalTrimmedString,
    sourcePage: z.string().trim().min(1).max(255),
    sourceVariant: optionalTrimmedString,
    turnstileToken: optionalTrimmedString,
  })
  .superRefine((value, ctx) => {
    if (value.type === "quote") {
      if (!value.phone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "A phone number is required for quote requests.",
        });
      }
      if (!value.suburb) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["suburb"],
          message: "A suburb or area is required for quote requests.",
        });
      }
      if (!value.serviceInterest) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["serviceInterest"],
          message: "Please choose a service before requesting a quote.",
        });
      }
    }

    if (value.type === "contact" && !value.message) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["message"],
        message: "Please enter a message before sending your request.",
      });
    }
  });

export const adminSubmissionUpdateSchema = z.object({
  status: z.enum(submissionStatuses),
  internalNotes: optionalTrimmedString,
});

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;
