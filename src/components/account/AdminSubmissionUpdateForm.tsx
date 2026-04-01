"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { submissionStatuses } from "@/lib/validations/submissions";

export function AdminSubmissionUpdateForm({
  submissionId,
  initialStatus,
  initialNotes,
}: {
  submissionId: string;
  initialStatus: string;
  initialNotes?: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [internalNotes, setInternalNotes] = useState(initialNotes ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/admin/submissions/${submissionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        internalNotes,
      }),
    });

    const payload = (await response.json()) as { error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(payload.error ?? "Could not update this submission.");
      return;
    }

    setMessage("Submission updated.");
    router.refresh();
  }

  return (
    <form className="space-y-4 rounded-sm border border-brand-sand/20 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="admin-status" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Status
        </label>
        <select
          id="admin-status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="flex h-12 w-full rounded-none border border-brand-sand/40 bg-transparent px-3 py-1 text-sm transition-colors focus-visible:border-brand-bronze focus-visible:outline-none"
        >
          {submissionStatuses.map((value) => (
            <option key={value} value={value}>
              {value.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="admin-notes" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Internal Notes
        </label>
        <textarea
          id="admin-notes"
          value={internalNotes}
          onChange={(event) => setInternalNotes(event.target.value)}
          rows={6}
          className="w-full rounded-none border border-brand-sand/40 px-4 py-3 text-sm focus:border-brand-bronze focus:outline-none"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-none bg-brand-bronze px-5 py-3 text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand-bronze/90 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
