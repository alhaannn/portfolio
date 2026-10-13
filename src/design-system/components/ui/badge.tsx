import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/design-system/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        accent: "border-transparent bg-accent-soft text-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Renders a breathing coral pulse dot before the label. */
  pulse?: boolean;
}

function Badge({ className, variant, pulse, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {pulse ? (
        <span
          aria-hidden
          className="size-1.5 animate-pulse rounded-full bg-accent"
        />
      ) : null}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
