import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/design-system/lib/utils";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay in seconds before the reveal starts. */
  delay?: number;
}

/**
 * Blur-to-focus scroll reveal: content starts blurred and dimmed, then
 * scrubs into sharp focus as it enters the viewport. Respects
 * prefers-reduced-motion.
 */
function Reveal({ className, delay = 0, children, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0.18, filter: "blur(4px)", y: 24 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...(props as object)}
    >
      {children}
    </motion.div>
  );
}

export { Reveal };
