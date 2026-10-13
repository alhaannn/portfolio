const GENERAL_RESUME_URL = "/resumes/general.pdf";

export const SITE_URL = "https://alhan.me";

export const CONTACT = {
  email: "alhanbellary123@gmail.com",
  website: SITE_URL,
  github: "https://github.com/alhaannn",
  linkedin: "https://www.linkedin.com/in/alhan-bellary",
  instagram: "https://www.instagram.com/alhaaannnn",
  location: "Bengaluru, India",
  resume: GENERAL_RESUME_URL as string | null,
};

export const STACK = [
  "Python 3.13", "uv", "LangGraph", "LangChain v1", "FastAPI", "Celery", "Redis",
  "PostgreSQL", "SQLAlchemy", "Alembic", "Qdrant", "Chroma", "BM25", "LiteLLM", "PyTorch",
  "XGBoost", "YOLOv8", "OpenCV", "ONNX Runtime", "Pandas", "Plotly", "Docker", "Kubernetes",
  "MLflow", "DVC", "Prometheus", "Grafana", "Langfuse",
];

export const METRICS = [
  { value: "?? / 150", label: "Active NeetCode Streak", note: "Trees · Graphs · DP — daily in Python" },
  { value: "NSQF L5.0", label: "AI Technocrat Credential", note: "IIT Dharwad collaboration" },
  { value: "< 200ms", label: "P95 Gateway Latency", note: "Token-bucket limiter + LiteLLM fallbacks" },
  { value: "120 Hours", label: "Production OJT", note: "Docker · Kubernetes · CI/CD telemetry" },
];

export const PROJECTS = [
  {
    n: "01",
    title: "Enterprise Multi-Agent Knowledge & Research Assistant",
    tag: "Agentic AI & LLMOps",
    targetRole: "GenAI / Agentic AI Engineer", status: "In progress",
    problem: "Vanilla RAG can hallucinate on complex queries requiring cross-document synthesis, source verification, and structured reports.",
    stack: ["LangGraph", "FastAPI SSE", "Qdrant", "BM25", "Pydantic v2", "Ragas", "Docker"],
    desc: "A cyclical Planner, Retriever, and Fact-Checker workflow combining hybrid and vectorless RAG with enterprise guardrails.",
    metrics: ["Target: 34% lower context hallucination", "Evaluate: faithfulness · relevancy · recall"],
  },
  {
    n: "02",
    title: "High-Throughput Asynchronous AI Gateway & Task Engine",
    tag: "Distributed Backend Systems",
    targetRole: "Software Engineer (Backend)", status: "In progress",
    problem: "Direct LLM calls block web threads, time out, lack traffic controls, and create provider lock-in.",
    stack: ["FastAPI", "Celery", "Redis", "PostgreSQL", "SQLAlchemy", "LiteLLM", "GitHub Actions"],
    desc: "An asynchronous gateway with distributed tasks, provider fallback, token-bucket limits, deduplication, and auditable usage.",
    metrics: ["Target: 250+ concurrent requests", "Target: sub-50ms queue latency · >80% coverage"],
  },
  {
    n: "03",
    title: "Production MLOps Anomaly Detection & Deployment System",
    tag: "MLOps & Telemetry",
    targetRole: "MLOps Engineer", status: "In progress",
    problem: "Notebook models can silently degrade without drift detection, automated delivery, and container-health visibility.",
    stack: ["XGBoost", "MLflow", "DVC", "Docker", "Kubernetes", "Prometheus", "Grafana"],
    desc: "A versioned anomaly pipeline with experiment tracking, drift monitoring, autoscaling, rollback triggers, and observable serving.",
    metrics: ["Target: automated drift visibility", "Target: safe rolling updates with rollback"],
  },
  {
    n: "04", title: "Multimodal Defect & Threat Inspection System", tag: "Computer Vision & Edge AI",
    targetRole: "AI/ML Engineer", status: "In progress",
    problem: "Visual inspection requires image evidence and operational metadata to be interpreted together.",
    stack: ["PyTorch", "YOLOv8", "OpenCV", "ONNX Runtime", "FastAPI", "PostgreSQL"],
    desc: "A multimodal inspection pipeline combining lightweight vision models, signal metadata, optimized inference, and anomaly records.",
    metrics: ["Target: 42 FPS edge inference", "Target: 94.2% mAP across five categories"],
  },
  {
    n: "05", title: "Self-Healing BI & SQL Analytics Agent", tag: "Applied AI & Analytics",
    targetRole: "GenAI / Agentic AI Engineer", status: "In progress",
    problem: "Standard text-to-SQL prompts fail on complex joins and can send invalid or unsafe queries into reports.",
    stack: ["LangGraph", "PostgreSQL", "Pydantic v2", "Pandas", "Plotly", "FastAPI"],
    desc: "A read-only analytics agent that inspects schemas, generates and validates SQL, self-corrects failures, and creates reviewed insights.",
    metrics: ["Target: self-correction within three retries", "Safety: read-only execution · human review"],
  },
];

export type CareerProofEntry = {
  title: string;
  meta: string;
  body: string;
};

export type CareerProofLink = {
  label: string;
  url: string;
};

export type CareerProofItem = CareerProofEntry & {
  id: string;
  k: string;
  label: string;
  lead?: CareerProofEntry | null;
  links?: CareerProofLink[];
};

export const CAREER_PROOF: CareerProofItem[] = [
  {
    id: "experience",
    k: "I",
    label: "Experience",
    title: "Junior Software Developer Intern",
    meta: "Heagl Technologies Pvt Ltd · Feb–May 2026",
    body: "Shipped five features across two production Django codebases and resolved 15+ bugs through AI-assisted debugging and senior code review. Resume-reported outcomes include approximately 25% faster feature turnaround and 30% less debugging time.",
  },
  {
    id: "education",
    k: "II",
    label: "Education",
    lead: {
      title: "A.I – Technocrat, NSQF Level 5.0",
      meta: "IIT Dharwad · Oct 2026–Oct 2027 · 120-hour mandatory OJT",
      body: "120-hour mandatory OJT: Docker and Kubernetes services, CI/CD with telemetry-triggered rollback, and Prometheus/Grafana dashboards.",
    },
    title: "BCA in Information Technology",
    meta: "IBMR Business School · Sep 2023–Jul 2026 · CGPA 7.66/10",
    body: "Relevant Coursework: Data Structures, Database Management Systems (DBMS), Web Technologies, Software Engineering, and Object-Oriented Programming.",
  },
  {
    id: "credentials",
    k: "III",
    label: "Credentials",
    title: "Industry learning signals",
    meta: "Oracle · IBM · GeeksforGeeks",
    body: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional, IBM SkillsBuild AI Literacy (2025), and Certified Product Manager (CPM) from GeeksforGeeks.",
    links: [
      {
        label: "OCI Data Science",
        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=49DC8CE41692A4C593AF0370F1D381193469FFF790D8B63C4B33B5E3FC7E7F39",
      },
      {
        label: "AI Literacy",
        url: "https://www.credly.com/badges/a78e9b34-62ac-4974-8e3c-7e1c10acb504/public_url",
      },
      {
        label: "Product Manager",
        url: "https://www.geeksforgeeks.org/certificate/cc225bc4e1875b8ad97cd09834ffd50b",
      },
    ],
  },
  {
    id: "recognition",
    k: "IV",
    label: "Recognition",
    title: "Built under competitive pressure",
    meta: "Hackathons · 2025–2026",
    body: "First place at the 2026 CheTech Hackathon at Chetan College, alongside participation in the 2025 Empathy Encryption Hackathon by UnsaidTalks.",
  },
];

export const PROCESS = [
  { step: "01", title: "Data & Contract Modeling", body: "Typed contracts, versioned datasets, relational schemas, and vector or vision inputs." },
  { step: "02", title: "Orchestration & Model Training", body: "State machines, asynchronous workers, retrieval pipelines, and reproducible experiments." },
  { step: "03", title: "Guardrails & Validation", body: "PII redaction, injection checks, read-only SQL, rate limits, and strict output validation." },
  { step: "04", title: "Evaluation & Observability", body: "Ragas, Pytest, MLflow, drift signals, latency metrics, and trace inspection against explicit targets." },
];

export const TESTIMONIALS = [
  { who: "Lead Faculty Advisor", org: "IIT Dharwad Collaboration", quote: "Demonstrated exceptional technical mastery in translating complex mathematical and probabilistic foundations into robust, containerized AI pipelines throughout the 120-hour OJT cycle." },
  { who: "Backend Engineering Collaborator", org: "Gateway Project", quote: "Architected the asynchronous gateway and Redis caching layer flawlessly. His focus on strict schema validation and test coverage significantly reduced integration bugs." },
  { who: "Algorithmic Reviewer", org: "NeetCode 150 Track", quote: "Clean, readable Python 3.13 implementations with consistent Big-O complexity documentation. High discipline in daily problem solving." },
];

export const FAQS = [
  { id: "item-1", question: "Who are you, and what roles are you targeting?", answer: "I'm Mohammad Alhan Bellary, a Software & AI Systems Engineer based in Bengaluru, India, focused on resilient backend architectures and production-grade agentic AI systems. I'm targeting GenAI / Agentic AI Engineer, Software Engineer (Backend), MLOps Engineer, and AI/ML Engineer roles — on-site, hybrid, or remote." },
  { id: "item-2", question: "What real-world production experience do you bring?", answer: "As a Junior Software Developer Intern at Heagl Technologies (Feb–May 2026), I shipped five features across two production Django codebases and resolved 15+ bugs through AI-assisted debugging and senior code review. Resume-reported outcomes include roughly 25% faster feature turnaround and 30% less debugging time." },
  { id: "item-3", question: "How do you approach building AI systems?", answer: "As measurable distributed systems, not API wrappers. Across five in-progress builds I apply typed state machines with LangGraph, hybrid retrieval with Qdrant and BM25, asynchronous execution with Celery and Redis, and automated evaluation with explicit guardrails, retry limits, and human review." },
  { id: "item-4", question: "What is your primary engineering stack?", answer: "Python 3.13 with uv. FastAPI, PostgreSQL, SQLAlchemy, Redis and Celery for services; LangGraph and LiteLLM for AI orchestration; PyTorch, YOLO, XGBoost and ONNX for applied ML; and Docker, Kubernetes, MLflow, Prometheus and Grafana for delivery and telemetry." },
  { id: "item-5", question: "What is your educational background?", answer: "I have completed my graduation — a BCA in Information Technology from IBMR Business School (CGPA 7.66/10) with coursework in Data Structures, DBMS, Web Technologies, Software Engineering, and OOP. I'm now pursuing Artificial Intelligence full-time at IIT Dharwad in the NSQF Level 5.0 \"A.I – Technocrat\" program (2026–2027), including 120 hours of mandatory deployment-focused OJT." },
  { id: "item-6", question: "Are your certifications and achievements verified?", answer: "Yes. Oracle Cloud Infrastructure 2025 Certified Data Science Professional, IBM SkillsBuild AI Literacy (2025), and Certified Product Manager from GeeksforGeeks all have live verification links in the Credentials tab. I also took first place at the 2026 CheTech Hackathon and competed in the 2025 Empathy Encryption Hackathon." },
  { id: "item-7", question: "How do you keep AI safe and observable in production?", answer: "Inputs and outputs pass schema validation, PII is redacted before logging or model calls, prompt-injection patterns are filtered, token-bucket limits and provider fallbacks contain failures, and text-to-SQL runs read-only. Traces and metrics flow into Prometheus, Grafana, and MLflow for drift and latency monitoring." },
  { id: "item-8", question: "How do you keep your problem-solving sharp?", answer: "A daily NeetCode 150 routine in Python 3.13 — trees, graphs, and dynamic programming — with clean code, edge-case coverage, and documented Big-O time and space analysis for every solution." },
];
