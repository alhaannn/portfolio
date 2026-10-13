import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Beacon, DesktopNotice, Preloader } from "@/components/portfolio/Chrome";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { Contribution } from "@/components/portfolio/Contribution";
import { About, Faq, Footer, Hero, Metrics, Process, Projects, Testimonials } from "@/components/portfolio/Sections";
import { RoleMatch } from "@/components/portfolio/RoleMatch";
import { SITE_URL } from "@/components/portfolio/data";
import { shareImageMeta } from "@/components/portfolio/share-images";

const TITLE = "Mohammad Alhan Bellary — Agentic AI, Backend & MLOps Engineer";
const DESC =
  "Five in-progress systems spanning Agentic AI, Python backend engineering, MLOps, computer vision and analytics. LangGraph, FastAPI, PyTorch and Kubernetes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: SITE_URL },
      ...shareImageMeta(),
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);
  return (
    <div className="bg-background text-foreground">
      {loading && <Preloader onDone={done} />}
      {!loading && <DesktopNotice />}
      <Beacon />
      <AnimatedNavFramer items={[
        { name: "Home", href: "#home" },
        { name: "Projects", href: "#projects" },
        { name: "GitHub", href: "#activity" },
        { name: "Contact", href: "#contact" },
      ]} />
      <main>
        <Hero ready={!loading} />
        <Metrics />
        <Projects />
        <RoleMatch />
        <Contribution />
        <About />
        <Process />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
