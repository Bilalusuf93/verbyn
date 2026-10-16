import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-out-expo active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-[#d6ff85]",
  secondary: "border border-line-strong text-fg hover:border-fg/40 hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-[0.95rem] sm:h-14 sm:px-7",
};

type Common = {
  variant?: Variant;
  size?: Size;
  /** Trailing arrow: "right" for in-page, "external" for new-tab links. */
  icon?: "right" | "external" | false;
  children: ReactNode;
};

function Icon({ kind }: { kind: Common["icon"] }) {
  if (!kind) return null;
  const Glyph = kind === "external" ? ArrowUpRight : ArrowRight;
  return (
    <span aria-hidden className="relative -mr-1 inline-flex size-5 items-center justify-center overflow-hidden">
      <Glyph
        className={cn(
          "size-4 transition-transform duration-300 ease-out-expo",
          kind === "external"
            ? "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            : "group-hover/btn:translate-x-0.5",
        )}
        strokeWidth={2}
      />
    </span>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon = "right",
  className,
  children,
  ...props
}: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      <Icon kind={icon} />
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon = false,
  className,
  children,
  type = "button",
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      <Icon kind={icon} />
    </button>
  );
}
