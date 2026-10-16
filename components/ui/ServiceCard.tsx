import type { Service } from "@/lib/site-config";
import { pad } from "@/lib/utils";

/**
 * A cell in the services grid. Hover is pure CSS (no JS): the surface lifts,
 * a lime rule draws across the top and the icon turns slightly.
 */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <article className="group relative flex h-full flex-col bg-bg p-7 transition-colors duration-300 hover:bg-bg-2 sm:p-9 lg:p-10">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between">
        <span className="inline-flex size-12 items-center justify-center rounded-md border border-line bg-surface text-fg transition-[border-color,color,transform] duration-300 ease-out-expo group-hover:-rotate-6 group-hover:border-accent/40 group-hover:text-accent">
          <Icon className="size-5" strokeWidth={1.6} aria-hidden />
        </span>
        <span className="font-mono text-xs text-fg-subtle">{pad(index + 1)}</span>
      </div>

      <h3 className="mt-10 max-w-[18ch] text-h3 font-semibold text-fg sm:mt-14">{service.title}</h3>
      <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-fg-muted">{service.description}</p>

      <ul className="mt-8 space-y-2.5 border-t border-line pt-6 text-sm text-fg-muted">
        {service.points.map((point) => (
          <li key={point} className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-px w-3 bg-fg-subtle transition-[width,background-color] duration-300 group-hover:w-5 group-hover:bg-accent"
            />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
