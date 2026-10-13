# AGENTS.md

- Extracted third-party components live in `src/components/ui/` and stay vendor-owned; reconstruct missing stylesheets beside the component (e.g. `morph-orb.css`) rather than editing vendor JS, and patch vendor code only for SSR safety or token-derived colors.
- The robot scene mounts lazily client-side with local lighting and bounded movement; the orb docks beneath it and portals answers to viewport centre. App styles fit its decorative glow to host width to prevent mobile overflow without clipping answers.
- The hero backdrop is the supplied murmuration-wordmark canvas (flock forms "ALHAN", reeds off) behind hero content; app code feeds it hex theme tokens, forwards hero-wide pointer moves to its root so the hawk works over foreground, and adds a token scrim behind the text plus small-screen top padding for the nav.
- The engineering-process factory uses the supplied Three.js engine with a lazy client-side wrapper and design-system controls; its canonical physical and animated order is Data → Build → Validate → Observe → Deploy, while illustration roles resolve CSS colors to sRGB and the scene refreshes on theme changes.
- The staggered endorsement carousel accepts quotes as props and uses initials rather than stock portraits, so presentation never invents people or endorsements.
- Commit Telemetry and Quantified Signal fit one viewport; Featured Projects stacks its orbit gallery above details, compacted without scrolling on phones, with nullable selection shared through PROJECT_DETAILS to keep images, links and placeholder synchronized.
- The supplied animated navigation accepts app-owned section links; navigation and the profile beacon occupy opposite corners, with the beacon offset below on narrow screens.
- Project summaries and case studies share one app-owned data module with a single dynamic project route, preventing selection and detail content from diverging.
- Portfolio projects are modeled as in-progress builds; numerical benchmarks must always be labeled as targets across summaries, detail pages, signals, and AI-orb answers.
- The footer prints "alhan" as a halftone-dot wordmark (token colours, re-prints on theme flips) with the same contact blocks above it.
- Profile and startup motion lives in portfolio Chrome, with a hover bridge across the portalled profile and reduced-motion bypass, so actions stay reachable and the entrance never blocks motion-sensitive visitors.
- Portfolio theme state lives in a shared root provider, persists only the visitor's display preference locally, and drives semantic app tokens and the hero backdrop without changing vendor components.

- Role Match asks the AI backend (Groq with Gemini backup) for structured recommendations constrained to enums of existing project slugs and portfolio skills, re-validated server-side, so the model cannot invent projects or skills.
- Role career profiles share one app-owned data module and one dynamic route; resume delivery has five explicit slots (one general, four role-specific) and unavailable PDFs must never render broken download actions.
- Verified career evidence is consolidated in the Engineering Persona tabs and role profiles rather than new homepage sections, keeping the portfolio compact while preserving source attribution for approximate outcomes.
- Engineering Persona uses a content-sized sticky scene and a compact ring below desktop widths, so career evidence stays reachable in short viewports throughout the scroll animation.
- The sitemap, robots and llms.txt server routes build absolute URLs from the canonical SITE_URL (https://alhan.me) in data.ts plus the role/project data modules, so self-hosted deployments behind proxies always emit the public domain; /llms.txt is generated from the same data modules so bot-facing facts never drift from the visible site.
- Social share artwork lives as optimized static JPEGs under public/share, mapped by role slug in one app-owned metadata helper with canonical-domain URLs.
- All portfolio media ships inside the repo: resumes in `public/resumes/`, project covers and raster images as WebP (≤1200px) in `src/assets/`. Google Fonts requests only load weights used in code.
- The Ask Orb calls Groq / Gemini REST endpoints directly with `GROQ_API_KEY` / `GOOGLE_API_KEY`: Groq is tried first for speed and Gemini is the backup. The official `@google/genai` SDK is not used — it sets array-valued response headers that crash the edge-style server runtime; answers are read from the last `model_output` step's `content[].text`.
- All not-found cases render the supplied ghost 404 component (`src/components/ui/ghost-404-page.tsx`) via the root `notFoundComponent`, so missing pages share one themed design while the server keeps the true 404 status.
