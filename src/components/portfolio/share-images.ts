import { SITE_URL } from "./data";
import type { RoleSlug } from "./role-profiles";

const ROLE_SHARE_FILES = {
  "genai-agentic-ai-engineer": "share-genai.jpg",
  "software-engineer-backend": "share-backend.jpg",
  "mlops-engineer": "share-mlops.jpg",
  "ai-ml-engineer": "share-aiml.jpg",
} satisfies Record<RoleSlug, string>;

export function shareImageMeta(slug?: RoleSlug) {
  const file = slug ? ROLE_SHARE_FILES[slug] : "share-home.jpg";
  const image = `${SITE_URL}/share/${file}`;
  const alt = slug
    ? "Mohammad Alhan Bellary — role-specific engineering portfolio"
    : "Mohammad Alhan Bellary — Agentic AI, Backend, MLOps and AI/ML portfolio";
  return [
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: alt },
  ];
}