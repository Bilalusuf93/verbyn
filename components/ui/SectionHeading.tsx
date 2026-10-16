import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small mono label, e.g. "(02) Services". */
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Editorial section header: label column on the left, headline + intro on
 * the right on large screens; stacked on mobile.
 */
export function SectionHeading({ index, label, title, description, id, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("grid gap-6 lg:grid-cols-12 lg:gap-8", className)}>
      <p className="eyebrow flex items-center gap-3 lg:col-span-3 lg:pt-4">
        <span className="text-fg-subtle">({index})</span>
        <span className="h-px w-6 bg-line-strong" aria-hidden />
        <span>{label}</span>
      </p>
      <div className="lg:col-span-9">
        <h2 id={id} className="text-h2 font-semibold text-fg">
          {title}
        </h2>
        {description ? (
          <p className="mt-6 max-w-2xl text-lead text-fg-muted">{description}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
