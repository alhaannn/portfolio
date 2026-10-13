const RESUME_URLS = {
  aiml: "/resumes/aiml.pdf",
  backend: "/resumes/backend.pdf",
  genai: "/resumes/genai.pdf",
  mlops: "/resumes/mlops.pdf",
} as const;
import { PROJECT_DETAILS } from "./project-details";

export const ROLE_PROFILES = [
  {
    slug: "genai-agentic-ai-engineer",
    role: "GenAI / Agentic AI Engineer",
    seoDescription: "Mohammad Alhan Bellary, GenAI and Agentic AI Engineer in Bengaluru: LangGraph agents, hybrid RAG, guardrails, and LLM evaluation.",
    eyebrow: "Agents that reason, retrieve, verify, and recover",
    story:
      "My path into agentic AI is grounded in building systems around the model, not treating a prompt as the product. Across two in-progress agent workflows, I am applying typed state, hybrid retrieval, bounded self-correction, source-aware evaluation, and human review so generated answers remain inspectable and useful.",
    fit: "I bring a backend-first approach to agentic systems: explicit contracts, controlled tool access, observable execution, and evaluation against defined targets.",
    evidence: "BCA in Information Technology, IIT Dharwad-aligned NSQF L5.0 training, Oracle Data Science Professional, and an in-progress multi-agent research system.",
    capabilities: [
      { title: "Orchestration", body: "Stateful LangGraph workflows with planner, retriever, fact-checker, and correction loops." },
      { title: "Grounding", body: "Hybrid retrieval with Qdrant or Chroma, BM25, schema context, and structured fallbacks." },
      { title: "Guardrails", body: "Pydantic contracts, PII redaction, prompt-injection checks, read-only tools, and bounded retries." },
      { title: "Evaluation", body: "Faithfulness, relevancy, context recall, tracing, and target-based regression checks." },
    ],
    skills: ["Python 3.13", "LangGraph", "LangChain v1", "FastAPI", "Qdrant", "Chroma", "BM25", "Pydantic v2", "Langfuse", "Docker"],
    projectSlugs: ["research-assistant", "self-healing-sql-agent", "ai-gateway"],
    resumeHighlights: [
      "Agent orchestration and self-correcting workflows",
      "Retrieval, grounding, and output validation",
      "LLM evaluation, safety, and observability",
    ],
    resumeUrl: RESUME_URLS.genai as string | null,
  },
  {
    slug: "software-engineer-backend",
    role: "Software Engineer (Backend)",
    seoDescription: "Mohammad Alhan Bellary, Backend Software Engineer in Bengaluru: production Django at Heagl Technologies, FastAPI, Celery, Redis, PostgreSQL.",
    eyebrow: "Reliable Python services beyond the request-response path",
    story:
      "My backend story combines commercial delivery with systems-focused portfolio work. At Heagl Technologies, I shipped five features across two production Django codebases and resolved 15+ bugs; the in-progress AI gateway extends that practice into typed APIs, distributed workers, persistence, traffic controls, and provider resilience.",
    fit: "I approach backend engineering through clear contracts and failure modes: validate early, move expensive work off the request path, persist what matters, and use senior review and operational evidence to improve the system.",
    evidence: "Junior Software Developer internship at Heagl Technologies, BCA in Information Technology, five shipped production features, 15+ resolved bugs, and three relevant in-progress systems.",
    capabilities: [
      { title: "Service design", body: "Typed FastAPI endpoints, Pydantic validation, relational persistence, and migration-aware data access." },
      { title: "Async execution", body: "Celery workers and Redis queues that separate long-running jobs from web requests." },
      { title: "Resilience", body: "Token-bucket limits, semantic deduplication, provider fallback, and bounded failure handling." },
      { title: "Delivery", body: "Pytest targets, GitHub Actions, container builds, usage records, and latency telemetry." },
    ],
    skills: ["Python 3.13", "FastAPI", "Celery", "Redis", "PostgreSQL", "SQLAlchemy", "Alembic", "Pydantic v2", "LiteLLM", "GitHub Actions"],
    projectSlugs: ["ai-gateway", "self-healing-sql-agent", "research-assistant"],
    resumeHighlights: [
      "Commercial Django delivery across two production codebases",
      "Traffic controls, persistence, and provider resilience",
      "Testing, CI, containers, and operational telemetry",
    ],
    resumeUrl: RESUME_URLS.backend as string | null,
  },
  {
    slug: "mlops-engineer",
    role: "MLOps Engineer",
    seoDescription: "Mohammad Alhan Bellary, MLOps Engineer in Bengaluru: MLflow and DVC reproducibility, Docker and Kubernetes delivery, Prometheus drift monitoring.",
    eyebrow: "Reproducible models with visible operational health",
    story:
      "My MLOps direction connects model experiments to the conditions that make them dependable after training. The in-progress anomaly pipeline spans versioned data, tracked experiments, drift signals, container delivery, autoscaling, rollback planning, and service telemetry rather than ending at a notebook metric.",
    fit: "I am building the habits that make model work repeatable and operable: version inputs, register experiments, package inference, watch drift and latency, and define recovery before deployment.",
    evidence: "BCA in Information Technology, Oracle Data Science Professional, IIT Dharwad-aligned deployment training, and two MLOps-relevant in-progress systems.",
    capabilities: [
      { title: "Reproducibility", body: "DVC datasets, MLflow experiments, model registration, and comparable training runs." },
      { title: "Deployment", body: "Docker packaging, Kubernetes rolling updates, HPA, and planned rollback triggers." },
      { title: "Observability", body: "Prometheus metrics, Grafana views, health signals, latency, volume, and drift visibility." },
      { title: "Lifecycle", body: "Automated retraining direction, evaluation gates, model versioning, and safe release practices." },
    ],
    skills: ["Python 3.13", "XGBoost", "PyTorch", "MLflow", "DVC", "Docker", "Kubernetes", "Prometheus", "Grafana", "GitHub Actions"],
    projectSlugs: ["anomaly-detection", "multimodal-inspection", "ai-gateway"],
    resumeHighlights: [
      "Experiment and dataset reproducibility",
      "Containerized inference and deployment safety",
      "Drift, service health, and model observability",
    ],
    resumeUrl: RESUME_URLS.mlops as string | null,
  },
  {
    slug: "ai-ml-engineer",
    role: "AI/ML Engineer",
    seoDescription: "Mohammad Alhan Bellary, AI/ML Engineer in Bengaluru: PyTorch, XGBoost, YOLOv8 computer vision, ONNX inference, and evaluation pipelines.",
    eyebrow: "Applied models measured from training to inference",
    story:
      "My applied ML work is developing across anomaly detection and multimodal inspection. I am connecting dataset preparation and model evaluation to deployment constraints: combining vision with operational metadata, comparing practical baselines, optimizing inference, and preserving records that allow predictions to be reviewed.",
    fit: "I combine model-focused work with systems thinking, so evaluation targets, inference performance, API contracts, and auditability are considered alongside training quality.",
    evidence: "BCA in Information Technology, Oracle Data Science Professional, IBM AI Literacy, CheTech Hackathon first place, and two applied-ML systems in progress.",
    capabilities: [
      { title: "Modeling", body: "XGBoost, anomaly baselines, PyTorch workflows, YOLOv8, and multimodal feature direction." },
      { title: "Computer vision", body: "OpenCV preparation, object detection, category confidence, and reviewable bounding-box outputs." },
      { title: "Inference", body: "ONNX Runtime optimization, CPU-oriented serving, FastAPI contracts, and target benchmarks." },
      { title: "Evaluation", body: "Dataset-aware metrics, error analysis, target mAP and FPS, and traceable anomaly records." },
    ],
    skills: ["Python 3.13", "PyTorch", "XGBoost", "YOLOv8", "OpenCV", "ONNX Runtime", "Pandas", "FastAPI", "PostgreSQL", "MLflow"],
    projectSlugs: ["multimodal-inspection", "anomaly-detection", "research-assistant"],
    resumeHighlights: [
      "Applied modeling and computer vision pipelines",
      "Evaluation, error analysis, and target benchmarks",
      "Optimized inference and auditable serving",
    ],
    resumeUrl: RESUME_URLS.aiml as string | null,
  },
] as const;

export type RoleProfile = (typeof ROLE_PROFILES)[number];
export type RoleSlug = RoleProfile["slug"];

export function getRoleProfile(slug: string) {
  return ROLE_PROFILES.find((profile) => profile.slug === slug);
}

export function getRoleProjects(profile: RoleProfile) {
  return profile.projectSlugs.flatMap((slug) => {
    const project = PROJECT_DETAILS.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
}

export function getRoleSlug(role: string) {
  return ROLE_PROFILES.find((profile) => profile.role === role)?.slug;
}