// ─────────────────────────────────────────────────────────────
// All site content — extracted from Atchayam G.'s CV (July 2026)
// ─────────────────────────────────────────────────────────────

export const identity = {
  name: 'Atchayam G.',
  shortName: 'Atchayam',
  roles: ['Principal Consultant', 'Technical Lead Architect', 'AI-Native Mobile & Web Engineer'],
  headline: 'I architect banking-grade platforms — and now I build them with AI.',
  subheadline:
    '13+ years engineering production mobile banking, UPI payment and enterprise platforms for five Indian banks. Today I lead architecture with Flutter, FlutterFlow and multi-agent AI engineering workflows.',
  location: 'Dindigul, Tamil Nadu, India',
  email: 'atchayamganesh@gmail.com',
  phone: '+91 90947 13923',
  linkedin: 'https://www.linkedin.com/in/atchayam-ganesh',
  github: 'https://github.com/AtchayamG',
  resumeFile: 'Atchayam_G_CV.pdf',
};

// Opens a pre-filled Gmail compose window in a new tab — avoids the OS "choose an app"
// mailto picker that leaves non-default browsers opening a blank window.
export const composeMailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  identity.email
)}&su=${encodeURIComponent("Let's connect — via your portfolio")}`;

export const stats = [
  { value: 13, suffix: '+', label: 'Years of Engineering' },
  { value: 6, suffix: '+', label: 'Live Apps on Stores' },
  { value: 5, suffix: '+', label: 'Banks Served' },
  { value: 10, suffix: '+', label: 'Engineers Led' },
];

export const about = {
  title: 'From power grids to payment grids — to AI-orchestrated engineering.',
  paragraphs: [
    'I started as an Electrical & Electronics engineer, but the pull of software was stronger than any circuit. Since 2012 I have shipped cross-platform web and hybrid mobile products — and found my specialty where failure is not an option: banking.',
    'Over a decade I architected and delivered NPCI-certified UPI apps, mobile wallets, FASTag platforms and core-banking-integrated apps for Karur Vysya Bank, Cosmos Co-operative Bank, Tamil Nadu Mercantile Bank, Equitas and Kotak Mahindra Bank — leading a team of 10 engineers and publishing 6+ apps that real customers trust with real money every day.',
    'Today, as Principal Consultant and Technical Lead Architect, I am modernising mobile architecture with Flutter and FlutterFlow while going all-in on AI-native engineering: multi-agent orchestration, AI-assisted delivery pipelines, and human-governed automation. I built MAAIDO — a platform where four AI coding agents plan, build, review and ship software under human governance — because I believe the next decade of engineering leadership belongs to those who can command both code and agents.',
  ],
};

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  mode: string;
  points: string[];
  tech: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: 'Principal Consultant — Technical Lead Architect',
    company: 'Hyperblitz Technologies',
    period: 'May 2025 – May 2026',
    mode: 'Remote',
    points: [
      'Owning solution architecture and delivery of Quikzy & Quikzy Flyer — a two-sided last-mile logistics platform built with FlutterFlow.',
      'Leading the Ionic → Flutter/FlutterFlow migration strategy; PR reviews, coding standards and technical governance.',
      'Accelerating delivery with AI-assisted coding (Claude Code, Cursor), prompt engineering and automation workflows.',
    ],
    tech: ['FlutterFlow', 'Flutter', 'Claude Code', 'Cursor', 'Architecture'],
  },
  {
    role: 'Principal Consultant — Ionic / Cordova / Capacitor',
    company: 'Ingram Micro',
    period: 'Jul 2024 – Dec 2024',
    mode: 'Hybrid · Chennai',
    points: [
      'Defined technical architecture and solution design for enterprise hybrid mobile solutions.',
      'Led sprint planning and story estimation in global Agile ceremonies; enforced coding standards via PR reviews.',
      'Ran technical feasibility and gap analysis on client requirements in client-facing discussions.',
    ],
    tech: ['Ionic', 'Cordova', 'Capacitor', 'Agile'],
  },
  {
    role: 'Consultant — Fintech Mobile Development',
    company: 'Kiya.ai',
    period: 'Sep 2022 – Jun 2024',
    mode: 'Mumbai / Chennai',
    points: [
      'Architected Svatantra MFI App — single-codebase web + mobile platform (Angular 14 + Capacitor) for rural micro-loan management.',
      'Designed offline-first SQLite architecture so field agents in low-connectivity areas sync seamlessly on reconnection.',
      'Integrated banking-grade REST APIs with token-based auth and encrypted data handling; led client stakeholder engagement.',
    ],
    tech: ['Angular 14', 'Capacitor', 'SQLite', 'Offline-First'],
  },
  {
    role: 'Expert Developer — Hybrid Mobile Applications',
    company: 'Birlasoft',
    period: 'Jul 2021 – Sep 2022',
    mode: 'Remote',
    points: [
      'Delivered Cosmo GenZ — official mobile banking app of Cosmos Co-operative Bank; live on Play Store & App Store.',
      'Implemented biometric login, secure session management, certificate pinning and encrypted core-banking API communication.',
    ],
    tech: ['Ionic 5', 'Capacitor', 'Angular 10', 'Security'],
  },
  {
    role: 'Senior Mobile Application Developer',
    company: 'PayAsia',
    period: 'Jan 2021 – Jul 2021',
    mode: 'Remote',
    points: [
      'Delivered Talentoz NXG — enterprise HRM platform (Ionic 4 + Capacitor + Angular 8) with integrated payment gateway flows.',
    ],
    tech: ['Ionic 4', 'Angular 8', 'Payments'],
  },
  {
    role: 'Technical Team Lead — Mobile Applications',
    company: 'GI Technology',
    period: 'May 2015 – Jan 2021',
    mode: 'Chennai',
    points: [
      'Led 10 engineers to architect and ship 6+ live banking and payment apps: BHIM KVB UPay, TMB MWallet, TMB MPay, Equitas FASTag, Kotak FASTag Agent.',
      'Ensured NPCI security compliance; standardised Scrum, version control, PR reviews and reporting across teams.',
      'Led client-facing technical discussions with KVB, TMB, Equitas and Kotak backend & compliance teams.',
      'Spearheaded hiring drives that doubled team size and product release cadence.',
    ],
    tech: ['UPI / NPCI', 'Ionic', 'Cordova', 'Team Leadership'],
  },
  {
    role: 'Mobile Application Developer',
    company: 'Nua Trans Media',
    period: 'Jul 2013 – May 2015',
    mode: 'Chennai',
    points: ['Built Ionic/Cordova hybrid applications end-to-end, including Play Store and App Store submissions.'],
    tech: ['Ionic', 'Cordova'],
  },
  {
    role: 'Software Developer',
    company: 'Leologica Technologies',
    period: 'Dec 2012 – Jul 2013',
    mode: 'Bengaluru',
    points: ['Early-career contributions to mobile and web software development projects.'],
    tech: ['Web', 'Mobile'],
  },
];

export interface SkillGroup {
  title: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI & Automation',
    icon: 'ai',
    skills: ['Multi-Agent Orchestration', 'n8n Workflow Automation', 'Prompt Engineering', 'Agentic AI Patterns', 'Human-in-the-Loop Governance', 'AI Content Automation', 'Vibe Coding'],
  },
  {
    title: 'AI Tools & Agents',
    icon: 'tools',
    skills: ['Claude / Claude Code', 'Cursor', 'OpenAI APIs (GPT-4/5)', 'Codex CLI', 'Google Gemini & Antigravity', 'CrewAI · LangChain · MCPs', 'ElevenLabs · Higgsfield · ComfyUI'],
  },
  {
    title: 'Mobile Engineering',
    icon: 'mobile',
    skills: ['Flutter (Dart)', 'FlutterFlow', 'Ionic v1–6', 'Capacitor', 'Cordova', 'Play Store & App Store Publishing'],
  },
  {
    title: 'Web / Frontend',
    icon: 'web',
    skills: ['Angular (AngularJS → v14)', 'TypeScript', 'RxJS', 'JavaScript / HTML5 / CSS3', 'Bootstrap', 'jQuery'],
  },
  {
    title: 'Backend & APIs',
    icon: 'backend',
    skills: ['Python (FastAPI)', 'REST API Design', 'WebSockets', 'SQLite / PostgreSQL', 'Docker', 'GitHub Actions CI/CD'],
  },
  {
    title: 'Banking & Payments',
    icon: 'bank',
    skills: ['UPI / NPCI Integration', 'Payment Gateways', 'FASTag / ETC', 'Micro-finance APIs', 'Core Banking REST APIs', 'NPCI Compliance'],
  },
  {
    title: 'Architecture & Security',
    icon: 'shield',
    skills: ['Solution Design', 'Offline-First (SQLite/SQLCipher)', 'Certificate Pinning', 'Secure Storage (Keychain/Keystore)', 'Token-Based Auth', 'Cross-Platform Strategy'],
  },
  {
    title: 'Leadership & Delivery',
    icon: 'lead',
    skills: ['Team Leadership & Mentoring', 'PR Reviews & Code Governance', 'Agile · Scrum · Sprint Planning', 'Story Estimation', 'Technical Feasibility Analysis', 'Client Engagement'],
  },
];

export interface Project {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  link?: string;
  linkLabel?: string;
  badge: string;
}

export const projects: Project[] = [
  {
    name: 'MAAIDO',
    tagline: 'Multi-Agent AI Development Orchestrator',
    description:
      'A human-governed orchestration platform that coordinates four AI coding agents — Claude Code, OpenAI Codex, Google Antigravity and Nous Hermes — to plan, build, review, recover and ship software autonomously.',
    highlights: [
      'Autonomous dispatch loop with risk classification, cost-based model routing (economy → premium) and automatic escalation on failure',
      'Critical actions always gated by human approval with an immutable audit trail',
      'Mission-control UI in Flutter with custom render objects and a glassmorphism design system',
      '365+ automated tests across app and API; recovery engine with checkpoints and semantic memory',
    ],
    tech: ['Flutter', 'Python FastAPI', 'PostgreSQL', 'ChromaDB', 'Docker', 'GitHub Actions'],
    link: 'https://atchayamg.github.io/maaido-website',
    linkLabel: 'Visit MAAIDO',
    badge: 'Personal AI Product',
  },
  {
    name: 'FutureBytes',
    tagline: 'AI Automated Newsroom & Content Console',
    description:
      'An end-to-end automated content production system: research → script → voiceover → AI image/video generation → multi-channel publishing, packaged as a one-click Windows automation console.',
    highlights: [
      'Production V2 runs an OpenAI image-generation pipeline with configurable fallbacks',
      'Channel management, scheduling, logging and test coverage for unattended daily operation',
    ],
    tech: ['Python', 'OpenAI APIs', 'ComfyUI', 'ElevenLabs'],
    badge: 'Personal AI Product',
  },
  {
    name: 'BHIM KVB UPay',
    tagline: 'NPCI-Certified UPI App · Karur Vysya Bank',
    description:
      "Led technical delivery of KVB's NPCI-certified UPI payments app — API contract alignment, NPCI security audit compliance and dual-store release.",
    highlights: [
      'Coordinated native Android & iOS teams as Technical Lead',
      'Certificate pinning and server-side payment verification enforced throughout',
    ],
    tech: ['Native Android & iOS', 'UPI / NPCI', 'Security'],
    badge: 'Banking · Live',
  },
  {
    name: 'Cosmo GenZ',
    tagline: 'Retail Mobile Banking · Cosmos Co-operative Bank',
    description:
      'Full-featured official retail banking app — biometric login, secure session management and encrypted REST integration with the core banking system. Live on Play Store & App Store.',
    highlights: ['Biometric authentication and hardened session lifecycle', 'Encrypted core-banking API channel'],
    tech: ['Ionic 5', 'Capacitor', 'Angular 10'],
    badge: 'Banking · Live',
  },
  {
    name: 'Svatantra MFI',
    tagline: 'Micro-Finance Field Platform · Kiya.ai',
    description:
      'Unified micro-lending platform for rural field agents — one codebase serving web browsers and native iOS/Android simultaneously, engineered offline-first for low-connectivity regions.',
    highlights: ['Offline-first SQLite architecture with sync-on-reconnect', 'Single codebase: web + iOS + Android'],
    tech: ['Angular 14', 'Ionic', 'Capacitor', 'SQLite'],
    badge: 'Fintech · Live',
  },
  {
    name: 'Quikzy & Quikzy Flyer',
    tagline: 'Two-Sided Logistics Platform · Hyperblitz',
    description:
      'Architecting a last-mile logistics ecosystem — Quikzy for customers, Quikzy Flyer for delivery partners — applying banking-grade API and security patterns to logistics.',
    highlights: ['Two-sided platform architecture in FlutterFlow', 'Banking-grade security patterns applied to logistics'],
    tech: ['FlutterFlow', 'Flutter'],
    badge: 'In Development',
  },
  {
    name: 'Banking Portfolio',
    tagline: 'TMB MWallet · TMB MPay · Equitas FASTag · Kotak FASTag Agent',
    description:
      'A fleet of live payment products across banking domains: multi-utility wallet, merchant payment acceptance, FASTag electronic tolling and agent-facing tag management.',
    highlights: ['All apps shipped to production and live on stores', 'Delivered under NPCI and bank compliance regimes'],
    tech: ['Ionic', 'Cordova', 'Payments'],
    badge: 'Banking · Live',
  },
];

export const aiWorkflow = {
  title: 'AI-Native Engineering, Human-Governed',
  intro:
    'I treat AI agents as a force-multiplied engineering team — with the same governance I applied to human teams shipping banking software: reviews, gates, audit trails.',
  pillars: [
    {
      title: 'Multi-Agent Orchestration',
      text: 'Four coding agents planned, routed and escalated by cost and risk — the architecture behind MAAIDO. Critical actions always pass a human approval gate.',
    },
    {
      title: 'AI-Assisted Delivery',
      text: 'Claude Code, Cursor, Codex CLI and Gemini woven into daily architecture, coding and PR-review workflows — compressing delivery cycles without compromising standards.',
    },
    {
      title: 'Workflow Automation',
      text: 'n8n pipelines and automation consoles that research, generate, publish and report autonomously — like FutureBytes running an unattended daily newsroom.',
    },
    {
      title: 'Governance & Trust',
      text: 'Human-in-the-loop patterns, immutable audit trails, risk classification and code governance — banking-grade discipline applied to agentic systems.',
    },
  ],
};

export const achievements = [
  { title: '6+ Apps Live on Stores', text: 'Banking, payments and enterprise apps published to Google Play and the Apple App Store — trusted with real money daily.' },
  { title: 'NPCI Security Compliance', text: 'Led UPI apps through NPCI security audits — certificate pinning, server-side verification, secure storage.' },
  { title: 'Team of 10 Engineers', text: 'Built and led a cross-functional mobile team; hiring drives doubled team size and release cadence.' },
  { title: '365+ Automated Tests', text: 'MAAIDO ships with 365+ automated tests across its Flutter app and FastAPI backend.' },
];

export const certifications = [
  { name: 'Gen-AI Engineering Mastermind', org: 'Outskill', detail: 'LLMs · Agentic AI · CrewAI · LangChain · MCPs · Claude Code · Cursor · OpenAI APIs' },
  { name: 'Generative AI Bootcamp', org: 'Outskill / GrowthSchool', detail: 'Prompt Engineering · Vibe Coding · AI Workflows · n8n · AI Agents · Visual AI' },
  { name: 'Generative AI Mastermind', org: 'Outskill', detail: 'Generative AI · AI-Powered Products · No-Code AI · GPT-4 · Claude · Midjourney' },
  { name: 'Skill India — Generative AI', org: 'Skill India / NSDC', detail: 'Certified Generative AI Practitioner' },
];

export const education = {
  degree: 'B.E. — Electrical & Electronics Engineering',
  college: 'PSNA College of Engineering and Technology',
  period: '2006 – 2010',
};

export const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai-workflow', label: 'AI Workflow' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const;
