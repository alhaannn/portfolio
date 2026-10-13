import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/design-system";
import "./stagger-testimonials.css";

interface Endorsement {
  who: string;
  org: string;
  quote: string;
}

// Adapted from the supplied stagger-testimonials: content stays with the
// portfolio, and the three existing endorsements wrap without invented rows.
export function StaggerTestimonials({ testimonials }: { testimonials: readonly Endorsement[] }) {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const move = (steps: number) => setActive((current) =>
    (current + steps + testimonials.length) % testimonials.length,
  );

  if (!testimonials.length) return null;

  return (
    <div
      className="stagger-testimonials relative w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Portfolio endorsements"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      }}
      onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        const end = event.changedTouches[0]?.clientX;
        if (touchStart !== null && end !== undefined && Math.abs(end - touchStart) > 40) {
          move(end < touchStart ? 1 : -1);
        }
        setTouchStart(null);
      }}
    >
      {testimonials.map((testimonial, index) => {
        let position = (index - active + testimonials.length) % testimonials.length;
        if (position > Math.floor(testimonials.length / 2)) position -= testimonials.length;
        const center = position === 0;
        return (
          <motion.figure
            key={testimonial.who}
            className={`stagger-testimonial absolute m-0 flex flex-col gap-5 p-6 md:p-8 ${center ? "z-10 bg-primary text-primary-foreground" : "z-0 bg-card text-card-foreground"}`}
            initial={false}
            animate={{ x: `${-50 + position * 78}%`, y: center ? "-55%" : "-40%", rotate: center ? 0 : position * 3 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: "easeInOut" }}
            aria-hidden={!center}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${testimonials.length}`}
          >
            <div className="flex items-center gap-4">
              <span className={`flex size-12 shrink-0 items-center justify-center rounded-md font-mono text-lg ${center ? "bg-primary-foreground text-primary" : "bg-secondary text-primary"}`} aria-hidden="true">
                {testimonial.who.split(" ").slice(0, 2).map((word) => word[0]).join("")}
              </span>
              <Quote className="ml-auto size-8 text-accent" aria-hidden="true" />
            </div>
            <blockquote className="font-serif text-xl leading-relaxed italic">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-auto">
              <p className="text-sm font-semibold">{testimonial.who}</p>
              <p className="mt-2 font-mono text-xs">{testimonial.org}</p>
            </figcaption>
          </motion.figure>
        );
      })}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-5">
        <Button size="icon" variant="outline" aria-label="Previous testimonial" onClick={() => move(-1)} disabled={testimonials.length < 2}>
          <ChevronLeft />
        </Button>
        <span className="font-mono text-xs text-muted-foreground" aria-live="polite" aria-atomic="true">
          {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>
        <Button size="icon" variant="outline" aria-label="Next testimonial" onClick={() => move(1)} disabled={testimonials.length < 2}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}