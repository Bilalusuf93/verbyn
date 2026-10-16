import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          index="01"
          label="Services"
          title={
            <>
              From first idea to <span className="text-fg-muted">final experience.</span>
            </>
          }
          description="We combine thoughtful design, modern engineering, and strategic thinking to turn ambitious ideas into products people love using."
        />

        {/* Shared hairlines: the 1px gap over a line-coloured background draws the grid. */}
        <Reveal
          as="ul"
          group
          staggerBy={0.09}
          className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-20 md:grid-cols-2"
        >
          {services.map((service, i) => (
            // The <li> stays opaque so hidden cells never show the hairline colour.
            <li key={service.title} className="bg-bg">
              <RevealItem className="h-full">
                <ServiceCard service={service} index={i} />
              </RevealItem>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
