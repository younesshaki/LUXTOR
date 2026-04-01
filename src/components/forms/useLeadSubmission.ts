"use client";

import { useState } from "react";

import type { LeadSubmissionInput } from "@/lib/validations/submissions";

type SubmissionResult = {
  submissionId: string;
  message: string;
  suggestAccountCreation?: boolean;
};

export function useLeadSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  async function submitSubmission(payload: LeadSubmissionInput) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/lead-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as SubmissionResult & { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "We could not save your request right now.");
      }

      setResult(data);
      return data;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "We could not save your request right now.";
      setError(message);
      throw caughtError;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    result,
    setError,
    setResult,
    submitSubmission,
  };
}
