import "./github-star-button.css";

interface GithubStarButtonProps {
  /** GitHub destination the button links to. */
  href: string;
  /** Visible label. */
  label?: string;
  /** Screen-reader description of the destination, e.g. "Open alhaannn on GitHub". */
  ariaLabel?: string;
  /** Live star total across the profile's public repos; omitted while loading or unavailable. */
  stars?: number;
  isPending?: boolean;
  className?: string;
}

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function GithubStarButton({
  href,
  label = "Star on GitHub",
  ariaLabel,
  stars,
  isPending = false,
  className = "",
}: GithubStarButtonProps) {
  const showStars = !isPending && typeof stars === "number";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={`rainbow-cta group inline-flex items-center gap-2 rounded-md px-4 py-2 font-sans text-sm font-semibold tracking-wide text-foreground no-underline outline-none transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      <span className="flex items-center gap-1">
        <svg
          className="size-4"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
        <span>{label}</span>
      </span>

      {showStars ? (
        <span className="ml-1 flex items-center gap-1">
          <svg
            className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-accent"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              fillRule="evenodd"
            />
          </svg>
          <span className="font-mono tabular-nums tracking-wider">
            {compact.format(stars)}
            <span className="sr-only"> stars</span>
          </span>
        </span>
      ) : null}
    </a>
  );
}
