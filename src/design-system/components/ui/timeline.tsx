import * as React from "react";

import { cn } from "@/design-system/lib/utils";

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("relative flex flex-col gap-8 border-l border-border pl-8", className)}
    {...props}
  />
));
Timeline.displayName = "Timeline";

export interface TimelineStepProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Zero-padded step number, e.g. "01". */
  step: string;
  title: string;
}

const TimelineStep = React.forwardRef<HTMLLIElement, TimelineStepProps>(
  ({ className, step, title, children, ...props }, ref) => (
    <li ref={ref} className={cn("relative", className)} {...props}>
      <span
        aria-hidden
        className="absolute -left-[41px] top-1 size-4 rounded-full border-2 border-accent bg-background"
      />
      <span className="font-mono text-xs font-medium tracking-widest text-accent">
        {step} //
      </span>
      <h4 className="mt-1 font-serif text-xl font-medium tracking-tight">
        {title}
      </h4>
      <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </li>
  ),
);
TimelineStep.displayName = "TimelineStep";

export { Timeline, TimelineStep };
