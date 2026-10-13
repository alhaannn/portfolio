import * as React from "react";

import { cn } from "@/design-system/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seconds per full loop. */
  duration?: number;
  /** Pause the animation while hovered. */
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal rail. Children are duplicated internally for a
 * seamless loop — pass each item once.
 */
function Marquee({
  className,
  duration = 32,
  pauseOnHover = true,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
      {...props}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "flex min-w-full shrink-0 items-center gap-3 pr-3 animate-[marquee_linear_infinite]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{ animationDuration: `${duration}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export { Marquee };
