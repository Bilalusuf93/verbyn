import { capabilities } from "@/lib/site-config";

function Row({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      className={clone ? "marquee-clone flex shrink-0 items-center" : "flex shrink-0 items-center"}
      aria-hidden={clone || undefined}
    >
      {capabilities.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 text-[clamp(1.1rem,0.9rem+1vw,1.6rem)] font-medium tracking-[-0.02em] whitespace-nowrap text-fg-muted sm:px-10">
            {item}
          </span>
          <span className="size-1.5 rotate-45 bg-accent/70" aria-hidden />
        </li>
      ))}
    </ul>
  );
}

/**
 * Capabilities strip. The list is read once by assistive tech; the visual
 * duplicate that makes the loop seamless is aria-hidden. It pauses on hover
 * and wraps into a static row when reduced motion is requested.
 */
export function Capabilities() {
  return (
    <section aria-label="What we do" className="border-y border-line bg-bg-2/60">
      <div className="marquee relative overflow-hidden py-6 sm:py-8 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex">
          <Row />
          <Row clone />
        </div>
      </div>
    </section>
  );
}
