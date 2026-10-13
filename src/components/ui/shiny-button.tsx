import type React from "react";
import "./shiny-button.css";

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  /** Render as a span when a parent element (e.g. a Link) owns interactivity. */
  as?: "button" | "span";
}

export function ShinyButton({ children, onClick, className = "", as = "button" }: ShinyButtonProps) {
  const Comp = as;
  return (
    <Comp className={`shiny-cta ${className}`} onClick={onClick}>
      <span>{children}</span>
    </Comp>
  );
}
