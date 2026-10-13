import * as React from "react";

import { cn } from "@/design-system/lib/utils";

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The headline value, e.g. "94%" or "< 200ms". */
  value: string;
  /** Short caption describing the value. */
  label: string;
  /** Optional monospace annotation, e.g. a Big-O or unit note. */
  note?: string;
}

/** Quantifiable stat block: large serif value over a muted caption. */
const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({ className, value, label, note, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
      <span className="font-serif text-4xl font-medium tracking-tight text-primary">
        {value}
      </span>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {note ? (
        <span className="font-mono text-xs text-muted-foreground">{note}</span>
      ) : null}
    </div>
  ),
);
Metric.displayName = "Metric";

export { Metric };
