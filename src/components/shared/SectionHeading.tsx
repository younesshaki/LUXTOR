import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("mb-12 md:mb-16", {
        "text-center mx-auto max-w-2xl": align === "center",
        "max-w-xl": align === "left",
      })}
    >
      {label && (
        <p
          className={cn(
            "text-xs font-sans uppercase tracking-[0.25em] mb-4",
            dark ? "text-brand-sand" : "text-brand-bronze"
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-balance",
          dark ? "text-white" : "text-brand-black"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base md:text-lg leading-relaxed",
            dark ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
