import { ArrowUp, ArrowUpRight } from "lucide-react";
import { cacheLife } from "next/cache";
import { Wordmark } from "@/components/ui/Wordmark";
import { navigation, siteConfig } from "@/lib/site-config";

/** Year is computed on the server and refreshed daily (Cache Components). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="mt-[clamp(1rem,0.5rem+2vw,2rem)] border-t border-line">
      <div className="container-site grid gap-12 py-14 sm:py-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <a href="#top" className="-m-1 inline-block rounded-md p-1 text-xl" aria-label={`${siteConfig.name} — back to top`}>
            <Wordmark />
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
            A digital product studio designing and building thoughtful websites, products, and AI-powered experiences.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-underline text-fg-muted hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          {siteConfig.socials.length ? (
            <>
              <p className="eyebrow mb-4">Elsewhere</p>
              <ul className="space-y-2.5 text-sm">
                {siteConfig.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg"
                    >
                      <span className="link-underline">{s.label}</span>
                      <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>

      <div className="container-site flex items-center justify-between gap-6 border-t border-line py-6 text-xs text-fg-subtle">
        <p>
          © <CurrentYear /> {siteConfig.name}. All rights reserved.
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5 rounded-full py-2 text-fg-muted transition-colors hover:text-fg"
        >
          Back to top
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-line transition-[border-color,transform] duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:border-accent/60">
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-px" aria-hidden />
          </span>
        </a>
      </div>
    </footer>
  );
}
