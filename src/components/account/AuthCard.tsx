import type { ReactNode } from "react";

export function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md rounded-sm border border-brand-sand/20 bg-white p-8 shadow-sm">
      <h1 className="font-heading text-3xl text-brand-black">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}
