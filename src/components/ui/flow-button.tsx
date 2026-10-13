import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/** Supplied flow button: arrows swap sides while a circle fills the pill on hover. Renders its child link. */
export function FlowButton({ children }: { children: ReactNode }) {
  return (
    <span className="group relative inline-flex items-center gap-1 overflow-hidden rounded-full border border-border bg-transparent px-8 py-3 text-sm font-semibold text-foreground transition-all duration-700 ease-out hover:rounded-xl hover:border-transparent hover:text-primary-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      <ArrowRight aria-hidden className="absolute -left-1/4 z-10 size-4 text-primary-foreground transition-all duration-700 ease-out group-hover:left-4 motion-reduce:transition-none" />
      <span className="relative z-[1] -translate-x-3 transition-all duration-700 ease-out group-hover:translate-x-3 motion-reduce:transition-none [&>a]:outline-none">{children}</span>
      <span aria-hidden className="absolute inset-0 scale-0 rounded-full bg-primary opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 motion-reduce:transition-none" />
      <ArrowRight aria-hidden className="absolute right-4 z-10 size-4 text-foreground transition-all duration-700 ease-out group-hover:-right-1/4 motion-reduce:transition-none" />
    </span>
  );
}
