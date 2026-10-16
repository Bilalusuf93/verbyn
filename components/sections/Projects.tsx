import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/site-config";

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y border-t border-line bg-bg-2/40">
      <div className="container-site">
        <SectionHeading
          id="work-title"
          index="02"
          label="Work"
          title="Selected work."
          description="A selection of digital experiences and products we've helped bring to life."
        />

        <div className="mt-16 space-y-6 sm:mt-20">
          {projects.map((project, i) => (
            <Reveal key={project.href} delay={i * 0.08}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

        {projects.length < 2 ? (
          <Reveal className="mt-6">
            <p className="flex items-center justify-between gap-6 rounded-xl border border-dashed border-line px-6 py-5 text-sm text-fg-muted sm:px-8">
              <span>More projects coming soon.</span>
              <span className="font-mono text-xs text-fg-subtle" aria-hidden>
                {String(projects.length + 1).padStart(2, "0")} / —
              </span>
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
