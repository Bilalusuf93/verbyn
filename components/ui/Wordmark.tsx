import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Typographic wordmark: brand mark + name, with a lime full stop. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-semibold tracking-[-0.04em] text-fg", className)}>
      <BrandMark className="size-[1.15em]" />
      <span>
        {siteConfig.name.toLowerCase()}
        <span className="text-accent">.</span>
      </span>
    </span>
  );
}

/** Mark: a square with a cut corner that reads as forward motion. Also used for the favicon. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect width="32" height="32" rx="8" fill="#F5F5F5" />
      <path d="M9 9h7.5L23 23h-7.5z" fill="#08090B" />
      <circle cx="21.5" cy="11" r="2.5" fill="#C7FF5E" />
    </svg>
  );
}
