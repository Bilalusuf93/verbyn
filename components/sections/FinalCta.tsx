import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * Closing call to action. Uses the configured email when one exists,
 * otherwise scrolls to the contact form.
 */
export function FinalCta() {
  const href = siteConfig.email ? `mailto:${siteConfig.email}` : "#contact";

  return (
    <section aria-labelledby="cta-title" className="px-[clamp(0.5rem,0.25rem+1vw,1rem)]">
      <div className="relative isolate overflow-hidden rounded-xl border border-line bg-surface">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -bottom-1/2 left-1/2 aspect-square w-[min(80rem,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(199_255_94/0.16),rgb(124_108_255/0.08)_45%,transparent_70%)]" />
          <div className="grid-lines absolute inset-0 opacity-40 [mask-image:linear-gradient(to_top,#000,transparent_70%)]" />
        </div>

        <div className="container-site flex flex-col items-center py-[clamp(5rem,3rem+8vw,9rem)] text-center">
          <Reveal>
            <p className="eyebrow">(04) Next step</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="cta-title"
              className="mt-8 max-w-[14ch] text-[clamp(2.6rem,1.2rem+6vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-fg"
            >
              Have something <em className="font-serif font-normal tracking-[-0.02em] text-accent italic">great</em> in
              mind?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-md text-lead text-fg-muted">
              Let&apos;s turn your next idea into a thoughtful digital experience.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <a
              href={href}
              className="group/cta mt-12 inline-flex items-center gap-4 rounded-full bg-accent py-2.5 pr-2.5 pl-8 text-lg font-medium text-accent-ink transition-transform duration-200 active:scale-[0.97]"
            >
              Let&apos;s Talk
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent-ink text-accent transition-transform duration-300 ease-out-expo group-hover/cta:translate-x-1 group-hover/cta:-rotate-45">
                <ArrowRight className="size-5" aria-hidden />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
