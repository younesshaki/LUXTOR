type SubmissionStatusBadgeProps = {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger";
};

const toneClasses: Record<NonNullable<SubmissionStatusBadgeProps["tone"]>, string> = {
  neutral: "bg-brand-cream text-brand-charcoal",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
};

export function SubmissionStatusBadge({
  label,
  tone = "neutral",
}: SubmissionStatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}
