import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "cream" | "dark";
}

export function Section({
  children,
  className,
  id,
  variant = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-padding",
        {
          "bg-background": variant === "default",
          "luxury-gradient": variant === "cream",
          "bg-brand-black text-white": variant === "dark",
        },
        className
      )}
    >
      {children}
    </section>
  );
}
