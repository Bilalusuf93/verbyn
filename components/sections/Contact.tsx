import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

const expectations = [
  "Share what you're building and where you're stuck.",
  "We'll read it properly and reply by email.",
  "If it's a fit, we'll set up a short call to dig in.",
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-fg-subtle">(05)</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden />
            <span>Contact</span>
          </p>
          <h2 id="contact-title" className="mt-6 text-h2 font-semibold text-fg">
            Tell us about <span className="text-fg-muted">your project.</span>
          </h2>
          <p className="mt-6 max-w-md text-lead text-fg-muted">
            A rough idea is plenty. The more context you share, the more useful our first reply will be.
          </p>

          <ol className="mt-12 space-y-5 border-t border-line pt-8">
            {expectations.map((item, i) => (
              <li key={item} className="flex gap-5 text-[0.95rem] text-fg-muted">
                <span className="font-mono text-xs leading-6 text-accent">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>

          {siteConfig.email || siteConfig.socials.length ? (
            <div className="mt-12 flex flex-col gap-3 text-sm">
              {siteConfig.email ? (
                <a href={`mailto:${siteConfig.email}`} className="inline-flex w-fit items-center gap-2.5 text-fg">
                  <Mail className="size-4 text-fg-muted" aria-hidden />
                  <span className="link-underline">{siteConfig.email}</span>
                </a>
              ) : null}
              {siteConfig.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-fg-muted hover:text-fg"
                >
                  <span className="link-underline">{s.label}</span>
                  <ArrowUpRight className="size-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
