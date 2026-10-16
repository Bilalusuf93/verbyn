"use client";

import { ArrowUpRight } from "lucide-react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useState, type PointerEvent } from "react";
import type { Project } from "@/lib/site-config";
import { pad } from "@/lib/utils";

/**
 * Featured project card. The whole card is clickable through a stretched
 * link (one tab stop, one accessible name). The visual drifts gently with
 * the pointer on fine-pointer devices only, and not at all with reduced motion.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.4 });
  const x = useTransform(sx, (v) => v * 14);
  const y = useTransform(sy, (v) => v * 10);
  const xBack = useTransform(sx, (v) => v * -6);
  const yBack = useTransform(sy, (v) => v * -4);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const parallax = finePointer && !reduce;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!parallax) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const domain = new URL(project.href).hostname.replace(/^www\./, "");

  return (
    <article
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative overflow-hidden rounded-xl border border-line bg-bg-2 transition-colors duration-300 hover:border-line-strong has-[a:focus-visible]:border-accent/60"
    >
      {/* Meta bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line px-6 py-4 font-mono text-xs text-fg-muted sm:px-8">
        <span className="flex items-center gap-3">
          <span className="text-fg-subtle">{pad(index + 1)}</span>
          <span className="text-fg">Featured project</span>
        </span>
        <span className="flex items-center gap-6">
          <span>{project.category}</span>
          <span className="hidden sm:inline">{domain}</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Copy */}
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:col-span-5 lg:p-10 xl:p-12">
          <div>
            <h3 className="text-[clamp(2.75rem,1.6rem+4.5vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-fg">
              {project.name}
            </h3>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-fg-muted">{project.description}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="About the product">
              {project.facts.map((fact) => (
                <li key={fact} className="rounded-sm border border-line px-2.5 py-1.5 font-mono text-[0.7rem] text-fg-muted uppercase tracking-wide">
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={project.href}
            target={project.external ? "_blank" : undefined}
            rel={project.external ? "noopener noreferrer" : undefined}
            className="inline-flex w-fit items-center gap-3 text-[0.95rem] font-medium text-fg after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-300 ease-out-expo group-hover:rotate-45">
              <ArrowUpRight className="size-5" aria-hidden />
            </span>
            <span className="link-underline pb-0.5 group-hover:bg-[length:100%_1px]">Visit live website</span>
            {project.external ? <span className="sr-only"> — {project.name}, opens in a new tab</span> : null}
          </a>
        </div>

        {/* Visual */}
        <div className="relative p-3 pt-0 sm:p-4 sm:pt-0 lg:col-span-7 lg:p-4 lg:pl-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-bg sm:aspect-[16/11]">
            <m.div className="absolute inset-0" style={parallax ? { x: xBack, y: yBack } : undefined}>
              <div className="grid-lines absolute -inset-8 opacity-50 [background-size:44px_44px] [mask-image:radial-gradient(closest-side,#000,transparent)]" />
            </m.div>
            <m.div className="absolute inset-0" style={parallax ? { x, y } : undefined}>
              <div className="size-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                <VoiceVisual />
              </div>
            </m.div>
            <span className="absolute bottom-3 left-3 rounded-sm bg-bg/80 px-2 py-1 font-mono text-[0.65rem] text-fg-subtle uppercase tracking-wider backdrop-blur-sm">
              Illustration
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

const bars = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.45, 0.85, 0.6, 0.95, 0.5, 0.75, 0.4, 0.65, 0.3];

/** Original abstract composition: concentric "signal" rings around a voice waveform. */
function VoiceVisual() {
  return (
    <div aria-hidden className="relative flex size-full items-center justify-center">
      {[92, 72, 52].map((s, i) => (
        <span
          key={s}
          className="absolute aspect-square rounded-full border"
          style={{
            width: `${s}%`,
            maxWidth: `${s * 0.62}vh`,
            borderColor: `rgb(255 255 255 / ${0.05 + i * 0.03})`,
          }}
        />
      ))}
      <span className="absolute aspect-square w-[40%] max-w-[26vh] rounded-full bg-[radial-gradient(closest-side,rgb(199_255_94/0.18),rgb(124_108_255/0.08)_60%,transparent)]" />
      <div className="relative flex h-[34%] items-center gap-[clamp(3px,0.6vw,7px)]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="wave-bar motion-ambient block w-[clamp(4px,0.7vw,8px)] rounded-full"
            style={{
              height: `${h * 100}%`,
              ["--i" as string]: i,
              background: i % 4 === 0 ? "var(--accent)" : "rgb(245 245 245 / 0.85)",
            }}
          />
        ))}
      </div>
      <span className="absolute top-[14%] left-[10%] font-mono text-[0.65rem] text-fg-subtle uppercase tracking-wider">
        Voice
      </span>
      <span className="absolute right-[10%] bottom-[14%] font-mono text-[0.65rem] text-fg-subtle uppercase tracking-wider">
        AI
      </span>
    </div>
  );
}
