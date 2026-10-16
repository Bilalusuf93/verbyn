import { DrawLine } from "@/components/ui/DrawLine";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/site-config";
import { pad } from "@/lib/utils";

/**
 * Four-step process. Horizontal timeline from lg up, vertical rail on
 * smaller screens. A lime line draws across the rail on reveal.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y border-t border-line">
      <div className="container-site">
        <SectionHeading
          id="process-title"
          index="03"
          label="Process"
          title={
            <>
              Good work comes from <span className="text-fg-muted">a good process.</span>
            </>
          }
        />

        <div className="relative mt-16 sm:mt-24">
          {/* Rails: vertical on mobile, horizontal on desktop */}
          <div aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line lg:hidden">
            <DrawLine axis="y" className="h-full w-px opacity-70" />
          </div>
          <div aria-hidden className="absolute top-[5px] right-0 left-0 hidden h-px bg-line lg:block">
            <DrawLine axis="x" className="h-px w-full opacity-70" />
          </div>

          <Reveal as="ol" group staggerBy={0.12} delay={0.1} className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <RevealItem as="li" key={step.title} className="relative pl-10 lg:pt-12 lg:pl-0">
                <span
                  aria-hidden
                  className="absolute top-1 left-0 size-[11px] rounded-full border border-accent bg-bg lg:top-0"
                />
                <p className="font-mono text-xs text-fg-subtle">Step {pad(i + 1)}</p>
                <h3 className="mt-3 text-h3 font-semibold text-fg">{step.title}</h3>
                <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-fg-muted">{step.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
