export interface Assignment {
  id: string;
  semesterNumber: number;
  assignmentNumber: number;
  title: string;
  subtitle: string;
  description: string;
  requirements: string[];
  maxScore: number;
  creditsAwarded: number;
  type: 'code' | 'design' | 'architecture' | 'capstone';
}

export interface SemesterAssignmentsGroup {
  semesterNumber: number;
  semesterTitle: string;
  assignments: Assignment[];
}

export const ASSIGNMENTS_DATA: SemesterAssignmentsGroup[] = [
  // SEMESTER 1
  {
    semesterNumber: 1,
    semesterTitle: "AI Development Foundations",
    assignments: [
      {
        id: "asg-1-1",
        semesterNumber: 1,
        assignmentNumber: 1,
        title: "Assignment 1.1: Vibe Coding & Prompting Foundations",
        subtitle: "Demonstrate natural language code generation.",
        description: "Use vibe coding techniques to generate a responsive landing page component. Capture screenshots of your prompt turns and upload the live link.",
        requirements: [
          "Craft a system prompt defining layout, theme, and component props",
          "Generate a responsive hero component with CTA buttons",
          "Upload screenshot image of prompt history and live URL link"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-1-2",
        semesterNumber: 1,
        assignmentNumber: 2,
        title: "Assignment 1.2: AI Developer Tools Mastery",
        subtitle: "Multi-tool workflow with Cursor, Claude & Bolt.",
        description: "Refactor a multi-file project using Cursor Composer or Bolt.new. Provide repository URL and evidence screenshots of AI refactoring.",
        requirements: [
          "Use Cursor Composer (Cmd+I) or Bolt to update multi-file logic",
          "Refactor legacy JavaScript into modular TypeScript",
          "Submit GitHub URL and screenshot image of editor diff"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-1-3",
        semesterNumber: 1,
        assignmentNumber: 3,
        title: "Assignment 1.3: Advanced Prompt Engineering & Refinement",
        subtitle: "Few-shot prompting and context management.",
        description: "Solve complex code bugs by providing structured traceback logs and few-shot examples to an AI code assistant.",
        requirements: [
          "Write a few-shot prompt with strict JSON schema constraints",
          "Fix a simulated runtime memory leak using AI traceback analysis",
          "Provide solution code URL link and screenshot of passing tests"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      },
      {
        id: "asg-1-4",
        semesterNumber: 1,
        assignmentNumber: 4,
        title: "Assignment 1.4: Product Specification & MVP Planning",
        subtitle: "MVP feature prioritization & user story mapping.",
        description: "Draft a comprehensive technical product spec and MoSCoW feature matrix for your Semester 1 MVP landing page.",
        requirements: [
          "Define target user persona and core problem statement",
          "Construct MoSCoW feature prioritization matrix",
          "Upload product wireframe image and technical spec URL"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'design'
      }
    ]
  },

  // SEMESTER 2
  {
    semesterNumber: 2,
    semesterTitle: "UI & User Experience",
    assignments: [
      {
        id: "asg-2-1",
        semesterNumber: 2,
        assignmentNumber: 1,
        title: "Assignment 2.1: Responsive Layout & Grid Generation",
        subtitle: "Mobile-first CSS Grid and Flexbox dashboard layout.",
        description: "Generate a fluid, responsive SaaS dashboard layout with collapsible mobile navigation drawer and interactive metric cards.",
        requirements: [
          "Implement mobile-first responsive breakpoints using Tailwind",
          "Build CSS Grid analytics layout with card hover effects",
          "Submit live demo URL link and mobile layout screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'design'
      },
      {
        id: "asg-2-2",
        semesterNumber: 2,
        assignmentNumber: 2,
        title: "Assignment 2.2: Semantic Design Tokens & Theme Engine",
        subtitle: "Dark/Light mode color tokens & typography.",
        description: "Establish a complete CSS variable design system supporting seamless light/dark mode toggling and WCAG AAA contrast.",
        requirements: [
          "Define semantic HSL color tokens for background, primary, and borders",
          "Implement theme toggle context in React",
          "Submit GitHub repository link and screenshot image of dark mode"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-2-3",
        semesterNumber: 2,
        assignmentNumber: 3,
        title: "Assignment 2.3: User Flow Wireframing & Micro-animations",
        subtitle: "Framer Motion micro-interactions and modal transitions.",
        description: "Add smooth spring micro-animations and interactive state transitions to your dashboard user flow.",
        requirements: [
          "Animate tab switches and modal dialogs with Framer Motion",
          "Add hover elevation and active button states",
          "Upload live application link and preview video/image screenshot"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'design'
      },
      {
        id: "asg-2-4",
        semesterNumber: 2,
        assignmentNumber: 4,
        title: "Assignment 2.4: AI Design Review & Accessibility Audit",
        subtitle: "Lighthouse accessibility and WCAG compliance audit.",
        description: "Perform an automated accessibility audit on your UI component suite and fix focus indicators and ARIA labels.",
        requirements: [
          "Pass Lighthouse Accessibility audit with 95+ score",
          "Verify keyboard navigation across all interactive inputs",
          "Submit Lighthouse report screenshot image and codebase URL"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      }
    ]
  },

  // SEMESTER 3
  {
    semesterNumber: 3,
    semesterTitle: "Application Building",
    assignments: [
      {
        id: "asg-3-1",
        semesterNumber: 3,
        assignmentNumber: 1,
        title: "Assignment 3.1: Full-Stack Authentication & Profiles",
        subtitle: "Password hashing, JWT sessions, and avatar upload.",
        description: "Build a complete student authentication flow with login, signup validation schemas, and user profile management.",
        requirements: [
          "Hash passwords with bcrypt and issue HttpOnly session tokens",
          "Implement profile settings with avatar image upload",
          "Submit backend API GitHub URL and UI screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-3-2",
        semesterNumber: 3,
        assignmentNumber: 2,
        title: "Assignment 3.2: Relational Schema & Type-Safe CRUD API",
        subtitle: "Drizzle ORM database modeling and REST endpoints.",
        description: "Model relational database tables for courses, students, and marks with foreign keys and automated migration scripts.",
        requirements: [
          "Define Drizzle ORM schema with primary and foreign keys",
          "Expose CRUD REST endpoints with Zod validation",
          "Submit database schema file link and API test screenshot"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-3-3",
        semesterNumber: 3,
        assignmentNumber: 3,
        title: "Assignment 3.3: Interactive Data Tables, Filters & Reports",
        subtitle: "TanStack Table with debounced search & CSV export.",
        description: "Construct a student directory table featuring debounced search inputs, faceted filtering, pagination, and CSV download.",
        requirements: [
          "Build TanStack Table with column sorting and server pagination",
          "Synchronize active filters with URL query parameters",
          "Upload live application URL link and table screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-3-4",
        semesterNumber: 3,
        assignmentNumber: 4,
        title: "Assignment 3.4: AI Development Workflow & Unit Testing",
        subtitle: "Automated Vitest suite & E2E integration tests.",
        description: "Generate unit test coverage for data handlers and write Playwright E2E tests for student registration.",
        requirements: [
          "Achieve 80%+ code coverage on API data handlers",
          "Automate end-to-end test execution with Vitest/Playwright",
          "Submit test output terminal screenshot image and repository link"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      }
    ]
  },

  // SEMESTER 4
  {
    semesterNumber: 4,
    semesterTitle: "SaaS Development",
    assignments: [
      {
        id: "asg-4-1",
        semesterNumber: 4,
        assignmentNumber: 1,
        title: "Assignment 4.1: Multi-Tenant Architecture & RBAC",
        subtitle: "Tenant data isolation & organization switcher.",
        description: "Build multi-tenant workspace isolation ensuring database queries are scoped by org_id and protected by RBAC roles.",
        requirements: [
          "Include org_id scoping across database queries",
          "Build workspace switcher dropdown and member invitation flow",
          "Submit GitHub repository URL and workspace UI screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-4-2",
        semesterNumber: 4,
        assignmentNumber: 2,
        title: "Assignment 4.2: Business Application Workflows (CRM)",
        subtitle: "Kanban deal pipeline & activity tracking.",
        description: "Construct a CRM deal pipeline featuring drag-and-drop status stages, contact activity history, and lead scoring.",
        requirements: [
          "Build Kanban column board for sales lead deal stages",
          "Track activity comment history per customer contact",
          "Upload live application URL link and CRM pipeline screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-4-3",
        semesterNumber: 4,
        assignmentNumber: 3,
        title: "Assignment 4.3: Stripe Subscription Billing & Webhooks",
        subtitle: "Checkout session & webhook event handlers.",
        description: "Integrate Stripe Checkout and self-serve billing portal with webhook handlers for subscription activation and cancellation.",
        requirements: [
          "Handle Stripe webhooks (invoice.paid, customer.subscription.deleted)",
          "Enforce feature gates based on active pricing tier",
          "Submit Stripe test mode webhook screenshot image and repo link"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      },
      {
        id: "asg-4-4",
        semesterNumber: 4,
        assignmentNumber: 4,
        title: "Assignment 4.4: CI/CD Pipeline & Automated Cloud Deployment",
        subtitle: "GitHub Actions CI workflow & production release.",
        description: "Set up an automated GitHub Actions CI/CD pipeline that runs tests and deploys production builds to Vercel/Render.",
        requirements: [
          "Configure GitHub Actions workflow for linting, testing, and building",
          "Deploy live production application with custom domain SSL",
          "Submit live production URL link and GitHub Actions green workflow screenshot"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      }
    ]
  },

  // SEMESTER 5
  {
    semesterNumber: 5,
    semesterTitle: "AI Product Development",
    assignments: [
      {
        id: "asg-5-1",
        semesterNumber: 5,
        assignmentNumber: 1,
        title: "Assignment 5.1: Streaming AI Chat & RAG Vector Search",
        subtitle: "SSE response streaming & Pgvector embeddings.",
        description: "Implement a real-time conversational AI chat interface with Server-Sent Events (SSE) streaming and RAG vector search.",
        requirements: [
          "Stream LLM completions token-by-token using SSE",
          "Perform semantic vector search using Pgvector document embeddings",
          "Submit repository URL and streaming chat screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-5-2",
        semesterNumber: 5,
        assignmentNumber: 2,
        title: "Assignment 5.2: Document OCR & Automated Data Extraction",
        subtitle: "Extracting structured JSON from PDF invoices.",
        description: "Build an automated document processing worker that parses uploaded PDF files and extracts structured JSON schemas.",
        requirements: [
          "Extract text from PDFs/images using OCR vision models",
          "Validate structured output against Zod JSON schema",
          "Upload live application link and PDF extraction screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-5-3",
        semesterNumber: 5,
        assignmentNumber: 3,
        title: "Assignment 5.3: Product Analytics & Predictive Churn Alerts",
        subtitle: "User behavior tracking & predictive insights.",
        description: "Build a product intelligence engine that tracks key user engagement events and flags churn risk accounts automatically.",
        requirements: [
          "Track key action events across user sessions",
          "Generate executive natural language digest reports with AI",
          "Submit analytics dashboard screenshot image and repo link"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      },
      {
        id: "asg-5-4",
        semesterNumber: 5,
        assignmentNumber: 4,
        title: "Assignment 5.4: Automated AI Prompt Evals & Benchmark Suite",
        subtitle: "Evaluation datasets & semantic similarity scoring.",
        description: "Construct a benchmark evaluation test suite measuring AI accuracy, hallucinations, and response quality across prompt iterations.",
        requirements: [
          "Build ground-truth test dataset with 20+ benchmark samples",
          "Calculate semantic similarity scores automatically",
          "Submit benchmark test runner terminal screenshot image and repo link"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      }
    ]
  },

  // SEMESTER 6
  {
    semesterNumber: 6,
    semesterTitle: "Enterprise Systems",
    assignments: [
      {
        id: "asg-6-1",
        semesterNumber: 6,
        assignmentNumber: 1,
        title: "Assignment 6.1: Vertical Enterprise System Design",
        subtitle: "Healthcare / Banking enterprise architecture.",
        description: "Design and implement a vertical enterprise module (Healthcare EHR or Banking Ledger) with strict transaction guarantees.",
        requirements: [
          "Ensure ACID database transaction safety for ledger records",
          "Implement encrypted data fields for sensitive PII records",
          "Submit GitHub repository URL and enterprise UI screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      },
      {
        id: "asg-6-2",
        semesterNumber: 6,
        assignmentNumber: 2,
        title: "Assignment 6.2: Multi-Step Approval Engine",
        subtitle: "Finite state machine & approval delegation.",
        description: "Build a multi-tiered approval engine supporting sequential manager sign-offs, delegation rules, and automated Slack webhooks.",
        requirements: [
          "Model business processes using finite state machines (XState)",
          "Trigger real-time Slack/Teams webhook notifications on sign-offs",
          "Upload live application link and approval workflow screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-6-3",
        semesterNumber: 6,
        assignmentNumber: 3,
        title: "Assignment 6.3: Real-Time Team Workspaces & Comments",
        subtitle: "Threaded discussions, @mentions & live presence.",
        description: "Add real-time team collaboration features including live avatar presence indicators, threaded comments, and user @mentions.",
        requirements: [
          "Build inline threaded comments with markdown formatting",
          "Implement @mention notifications for team members",
          "Submit live URL link and collaborative comment screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-6-4",
        semesterNumber: 6,
        assignmentNumber: 4,
        title: "Assignment 6.4: Enterprise SAML SSO & Immutable Audit Logs",
        subtitle: "Okta SAML 2.0 & tamper-proof audit trail.",
        description: "Integrate Enterprise SAML 2.0 Single Sign-On and implement an immutable audit log ledger tracking all system security events.",
        requirements: [
          "Support SAML 2.0 identity provider assertions",
          "Record tamper-proof audit logs for security compliance",
          "Submit audit log dashboard screenshot image and codebase link"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      }
    ]
  },

  // SEMESTER 7
  {
    semesterNumber: 7,
    semesterTitle: "Industry Projects",
    assignments: [
      {
        id: "asg-7-1",
        semesterNumber: 7,
        assignmentNumber: 1,
        title: "Assignment 7.1: Client Spec Analysis & Sprint Planning",
        subtitle: "Requirement breakdown & 1-week sprint roadmap.",
        description: "Deconstruct a real client project brief into technical acceptance criteria, user stories, and a 1-week agile sprint backlog.",
        requirements: [
          "Draft technical specification document with architectural diagrams",
          "Create sprint backlog with task estimations and acceptance criteria",
          "Submit specification document URL and backlog screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      },
      {
        id: "asg-7-2",
        semesterNumber: 7,
        assignmentNumber: 2,
        title: "Assignment 7.2: Team Vibe Coding & Branch Collaboration",
        subtitle: "Feature branching, pair prompting & PR reviews.",
        description: "Execute a collaborative feature sprint using feature branching, AI pair programming, and automated pull request reviews.",
        requirements: [
          "Follow conventional commit guidelines (feat:, fix:, docs:)",
          "Conduct AI-assisted pull request code reviews before merging",
          "Submit GitHub pull request link and merged branch screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'code'
      },
      {
        id: "asg-7-3",
        semesterNumber: 7,
        assignmentNumber: 3,
        title: "Assignment 7.3: Comprehensive E2E QA & Performance Audit",
        subtitle: "Playwright test suite & Core Web Vitals optimization.",
        description: "Perform full quality assurance testing across browsers and optimize page performance for Core Web Vitals (LCP < 2.5s).",
        requirements: [
          "Pass Playwright E2E test suite covering all client workflows",
          "Optimize Core Web Vitals (Lighthouse Performance > 90)",
          "Submit Playwright test output screenshot image and live URL link"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      },
      {
        id: "asg-7-4",
        semesterNumber: 7,
        assignmentNumber: 4,
        title: "Assignment 7.4: Production Delivery & Client Handoff",
        subtitle: "Production cutover, monitoring & documentation.",
        description: "Execute production domain cutover with SSL encryption, 24/7 uptime monitoring setup, and complete client handoff documentation.",
        requirements: [
          "Deploy live client production domain with HTTPS SSL",
          "Deliver user documentation and admin setup guide",
          "Submit live client domain URL link and production dashboard screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'capstone'
      }
    ]
  },

  // SEMESTER 8
  {
    semesterNumber: 8,
    semesterTitle: "Capstone, Portfolio & Hiring",
    assignments: [
      {
        id: "asg-8-1",
        semesterNumber: 8,
        assignmentNumber: 1,
        title: "Assignment 8.1: Capstone Full-Stack Architecture",
        subtitle: "Flagship application system design & AI eval.",
        description: "Architect your flagship Capstone application end-to-end and submit your codebase for automated AI quality & security evaluation.",
        requirements: [
          "Build full-stack Capstone app with visual polish and security",
          "Achieve 90%+ AI evaluation score across performance & security",
          "Submit GitHub repository URL and AI evaluation report screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'capstone'
      },
      {
        id: "asg-8-2",
        semesterNumber: 8,
        assignmentNumber: 2,
        title: "Assignment 8.2: Verified Portfolio & Video Demonstration",
        subtitle: "Interactive portfolio & 2-minute video walkthrough.",
        description: "Build and launch your verified developer portfolio website featuring clickable live project links and a video walkthrough.",
        requirements: [
          "Launch personal portfolio website with custom domain branding",
          "Record a 2-minute video walkthrough demonstrating key app features",
          "Submit live portfolio URL link and video demo link/image screenshot"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'capstone'
      },
      {
        id: "asg-8-3",
        semesterNumber: 8,
        assignmentNumber: 3,
        title: "Assignment 8.3: Technical Interview Preparation & Resume",
        subtitle: "ATS-optimized resume & AI mock interview pass.",
        description: "Prepare an ATS-optimized resume with quantifiable metrics and complete an AI mock technical coding interview session.",
        requirements: [
          "Craft ATS-friendly resume highlighting verified project credits",
          "Pass AI mock technical interview on system design and coding",
          "Submit resume PDF/URL link and mock interview scorecard screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'architecture'
      },
      {
        id: "asg-8-4",
        semesterNumber: 8,
        assignmentNumber: 4,
        title: "Assignment 8.4: Employer Marketplace & HR Shortlist Profile",
        subtitle: "Job Readiness Score & direct recruiter profile.",
        description: "Publish your certified candidate profile to the Prime Wave employer marketplace to match directly with hiring companies.",
        requirements: [
          "Achieve Job Readiness Score > 85 based on completed assignments",
          "Publish profile to verified company hiring manager marketplace",
          "Submit Prime Wave employer profile URL link and verified score screenshot image"
        ],
        maxScore: 100,
        creditsAwarded: 50,
        type: 'capstone'
      }
    ]
  }
];
