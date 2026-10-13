import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { PortfolioThemeProvider } from "@/components/portfolio/Theme";
import { SITE_URL } from "@/components/portfolio/data";
import { NotFound } from "@/components/ui/ghost-404-page";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mohammad Alhan Bellary — AI Systems Engineer" },
      { name: "description", content: "Portfolio of Mohammad Alhan Bellary, Software & AI Systems Engineer." },
      { name: "author", content: "Mohammad Alhan Bellary" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mohammad Alhan Bellary — Portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "WebSite", name: "Mohammad Alhan Bellary — Portfolio", url: SITE_URL },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mohammad Alhan Bellary",
          alternateName: "Alhan Bellary",
          url: SITE_URL,
          email: "mailto:alhanbellary123@gmail.com",
          jobTitle: ["GenAI / Agentic AI Engineer", "Software Engineer (Backend)", "MLOps Engineer", "AI/ML Engineer"],
          address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "IBMR Business School" },
            { "@type": "CollegeOrUniversity", name: "IIT Dharwad" },
          ],
          worksFor: { "@type": "Organization", name: "Heagl Technologies" },
          hasCredential: [
            { "@type": "EducationalOccupationalCredential", name: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional" },
            { "@type": "EducationalOccupationalCredential", name: "IBM SkillsBuild AI Literacy" },
            { "@type": "EducationalOccupationalCredential", name: "NSQF Level 5.0 A.I – Technocrat (IIT Dharwad, in progress)" },
          ],
          knowsAbout: ["Agentic AI", "LangGraph", "RAG", "FastAPI", "Django", "Celery", "PostgreSQL", "MLOps", "MLflow", "Kubernetes", "PyTorch", "Computer Vision"],
          sameAs: ["https://github.com/alhaannn", "https://www.linkedin.com/in/alhan-bellary", "https://www.instagram.com/alhaaannnn"],
        },
      ]),
    }],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioThemeProvider>
        <Outlet />
      </PortfolioThemeProvider>
    </QueryClientProvider>
  );
}
