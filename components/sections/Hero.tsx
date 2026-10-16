import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

const lines = [
  <>Building digital</>,
  <>experiences that move</>,
  <>
    businesses <em className="font-serif font-normal tracking-[-0.02em] text-accent italic">forward.</em>
  </>,
];

/**
 * Server-rendered hero. The entrance sequence is CSS-only (see .enter-* in
 * globals.css) so the headline paints immediately with no hydration wait,
 * and reduced-motion users get the final state straight away.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-(--nav-h)"
    >
      <HeroBackground />

      <div className="container-site flex flex-1 flex-col justify-end pt-16 pb-14 sm:pb-20 lg:pt-24">
        <p className="eyebrow enter-fade mb-8 flex items-center gap-3 sm:mb-10" style={{ ["--d" as string]: "120ms" }}>
          <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
          {siteConfig.tagline}
        </p>

        <h1 id="hero-title" className="text-display max-w-[16ch] font-semibold text-fg sm:max-w-none">
          {lines.map((line, i) => (
            <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <span className="enter-line block" style={{ ["--i" as string]: i }}>
                {line}
              </span>{" "}
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 sm:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
          <p
            className="enter-fade max-w-xl text-lead text-fg-muted lg:col-span-6"
            style={{ ["--d" as string]: "620ms" }}
          >
            We design and build modern digital experiences, products, and web platforms that help ambitious
            businesses stand out, connect with customers, and grow.
          </p>

          <div className="flex flex-col gap-3 min-[420px]:flex-row lg:col-span-6 lg:justify-end">
            <span className="enter-fade block" style={{ ["--d" as string]: "760ms" }}>
              <ButtonLink href="#contact" size="lg" className="w-full min-[420px]:w-auto">
                Start a Project
              </ButtonLink>
            </span>
            <span className="enter-fade block" style={{ ["--d" as string]: "840ms" }}>
              <ButtonLink href="#work" size="lg" variant="secondary" className="w-full min-[420px]:w-auto">
                Explore Our Work
              </ButtonLink>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Decorative: masked grid + a slowly rotating light ring. Never above the text. */
function HeroBackground() {
  return (
    <div aria-hidden className="enter-bg pointer-events-none absolute inset-0 -z-10">
      <div className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_30%,#000_20%,transparent_75%)]" />

      {/* Soft depth glow */}
      <div className="absolute -top-[20%] right-[-25%] size-[70rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgb(124_108_255/0.16),transparent)] sm:right-[-10%]" />

      {/* Aperture ring */}
      <div className="absolute top-[6%] right-[-55%] size-[34rem] sm:top-[2%] sm:right-[-22%] sm:size-[46rem] lg:right-[-8%] lg:size-[52rem]">
        <div
          className="motion-ambient absolute inset-0 animate-spin-slow rounded-full opacity-80"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgb(199 255 94 / 0.9) 50deg, rgb(79 140 255 / 0.55) 140deg, transparent 220deg, rgb(124 108 255 / 0.5) 300deg, transparent 360deg)",
            mask: "radial-gradient(closest-side, transparent 69%, #000 70%, #000 70.6%, transparent 71.6%)",
            WebkitMask:
              "radial-gradient(closest-side, transparent 69%, #000 70%, #000 70.6%, transparent 71.6%)",
          }}
        />
        <div
          className="motion-ambient absolute inset-[12%] animate-spin-slow rounded-full opacity-40 [animation-direction:reverse] [animation-duration:72s]"
          style={{
            background:
              "conic-gradient(from 90deg, transparent, rgb(245 245 245 / 0.6) 40deg, transparent 120deg, transparent 360deg)",
            mask: "radial-gradient(closest-side, transparent 98.4%, #000 99%)",
            WebkitMask: "radial-gradient(closest-side, transparent 98.4%, #000 99%)",
          }}
        />
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(closest-side,rgb(199_255_94/0.08),transparent)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
