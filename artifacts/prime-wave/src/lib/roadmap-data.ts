export interface Topic {
  id: string;
  number: number;
  title: string;
  description: string;
  content: {
    overview: string;
    keyTakeaways: string[];
    codeSnippet?: string;
    practicalExample?: string;
  };
  summary: string;
  keyTerms: { term: string; definition: string }[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: Topic[];
}

export interface SemesterProject {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  credits: number;
}

export interface Semester {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  creditsRequired: number;
  modules: Module[];
  project: SemesterProject;
}

export const ROADMAP_DATA: Semester[] = [
  // SEMESTER 1
  {
    id: "sem-1",
    number: 1,
    title: "AI Development Foundations",
    subtitle: "Master vibe coding, AI developer tools, prompt engineering, and product thinking.",
    description: "Start your journey with fundamental AI-assisted development tools, prompt techniques, and building software with modern AI workflows.",
    creditsRequired: 100,
    project: {
      id: "proj-1",
      title: "Build your first landing page with AI",
      description: "Design, generate, and deploy a responsive, high-converting product landing page using AI tools (Cursor, Bolt, or Lovable).",
      requirements: [
        "Interactive hero section with animated CTA buttons",
        "Feature showcase with icons and responsive grid",
        "Fully responsive layout supporting desktop, tablet, and mobile",
        "Deployed live URL with zero manual CSS/JS boilerplate"
      ],
      credits: 100
    },
    modules: [
      {
        id: "sem-1-mod-1",
        number: 1,
        title: "Introduction to AI Development",
        description: "Core concepts of AI-assisted software building and responsible usage.",
        topics: [
          {
            id: "t-1-1-1",
            number: 1,
            title: "What is Vibe Coding?",
            description: "Learn how natural language descriptions can be turned into production code seamlessly.",
            content: {
              overview: "Vibe Coding is a paradigm shift where developers describe intent, architecture, and UI behavior in plain language while AI code engines write, iterate, and refine the source code.",
              keyTakeaways: [
                "Focus on system design and user experience rather than syntax boilerplate.",
                "Iterative feedback loops with AI yield robust applications 10x faster.",
                "Developer role evolves from writer to architect and reviewer."
              ],
              codeSnippet: `// Vibe Coding Prompt Example:
// "Create a responsive React navbar with dark mode toggle and glassmorphism styling."`,
              practicalExample: "Prompting AI to build a full authentication UI in 30 seconds."
            },
            summary: "Vibe coding empowers builders to turn ideas into software directly through natural language.",
            keyTerms: [
              { term: "Vibe Coding", definition: "Developing software through high-level natural language instructions evaluated by LLM code models." },
              { term: "AI Pair Programmer", definition: "An AI model operating in real-time alongside a software engineer." }
            ]
          },
          {
            id: "t-1-1-2",
            number: 2,
            title: "AI-Assisted Software Development",
            description: "Integrating AI assistants into your daily engineering workflow.",
            content: {
              overview: "AI-Assisted Software Development combines modern IDEs with LLM context windows to write, test, and debug code contextually.",
              keyTakeaways: [
                "Context awareness enables precise completions.",
                "Automate repetitive tasks like writing test cases and docstrings.",
                "Maintain code quality through real-time static inspection."
              ],
              practicalExample: "Generating unit tests for a complex TypeScript utility function automatically."
            },
            summary: "Accelerate development velocity by integrating AI directly into code creation loops.",
            keyTerms: [
              { term: "Context Window", definition: "The total token budget an AI model processes to generate code." }
            ]
          },
          {
            id: "t-1-1-3",
            number: 3,
            title: "Modern Software Development Lifecycle",
            description: "How AI reshapes specs, prototyping, coding, testing, and deployment.",
            content: {
              overview: "The Modern SDLC is compressed: requirements turn directly into interactive wireframes, and deployment occurs continuously with automated verification.",
              keyTakeaways: [
                "Rapid prototyping replaces static mockups.",
                "Continuous feedback loops ensure user requirements are met early.",
                "Automated CI/CD pipelines run tests generated during development."
              ]
            },
            summary: "The AI SDLC moves from concept to production in hours instead of months.",
            keyTerms: [
              { term: "Agile AI SDLC", definition: "Software cycle enhanced by instant code generation and verification." }
            ]
          },
          {
            id: "t-1-1-4",
            number: 4,
            title: "Choosing the Right AI Tool",
            description: "Comparing IDE extensions, browser builders, and standalone AI models.",
            content: {
              overview: "Different AI tools excel at different stages: Cursor/Copilot for deep editing, Lovable/Bolt for web apps, and Claude/ChatGPT for system architecture.",
              keyTakeaways: [
                "Match the tool to the task: full-stack creation vs inline editing.",
                "Evaluate privacy, model capabilities, and latency.",
                "Combine multiple specialized tools for optimal productivity."
              ]
            },
            summary: "Pick the optimal AI assistant based on project scope, stack, and context size.",
            keyTerms: [
              { term: "IDE Integration", definition: "Deep integration of AI within code editors like VS Code or Cursor." }
            ]
          },
          {
            id: "t-1-1-5",
            number: 5,
            title: "Responsible AI Usage",
            description: "Security, code licensing, data privacy, and avoiding hallucinated code.",
            content: {
              overview: "Responsible AI usage requires verifying security vulnerabilities, checking open-source license compliance, and keeping credentials out of prompts.",
              keyTakeaways: [
                "Never share API secrets or private tokens in prompt history.",
                "Audit generated dependencies for active maintenance and CVE vulnerabilities.",
                "Verify complex math and logic to eliminate model hallucinations."
              ]
            },
            summary: "Maintain high security, compliance, and code ownership while building with AI.",
            keyTerms: [
              { term: "Hallucination", definition: "When an AI model confidently returns inaccurate or non-existent code APIs." }
            ]
          }
        ]
      },
      {
        id: "sem-1-mod-2",
        number: 2,
        title: "AI Tools",
        description: "Hands-on mastery of premier AI coding environments.",
        topics: [
          { id: "t-1-2-1", number: 1, title: "ChatGPT", description: "Architectural reasoning, system prompts, and custom GPTs.", content: { overview: "ChatGPT provides conversational problem solving, architectural planning, and code explanations.", keyTakeaways: ["Use system instructions for consistent code outputs.", "Upload schema definitions to generate complete API routes."], practicalExample: "Asking ChatGPT to draft database schemas and API endpoints for an e-commerce platform." }, summary: "Master general-purpose AI reasoning for system design and planning.", keyTerms: [{ term: "System Prompt", definition: "High-level guidelines instructing the AI on response format and role." }] },
          { id: "t-1-2-2", number: 2, title: "Claude", description: "Deep context reasoning and complex code refactoring with Claude 3.5 Sonnet.", content: { overview: "Claude 3.5 Sonnet excels at reasoning across multi-file codebases and building interactive visual artifacts.", keyTakeaways: ["Sonnet offers unmatched coding accuracy.", "Utilize Artifacts preview for instant component visualization."], practicalExample: "Refactoring a 500-line legacy JS file into modular TypeScript React components." }, summary: "Leverage Claude's superior reasoning for refactoring and complex logic.", keyTerms: [{ term: "Claude Artifacts", definition: "Interactive preview window for rendering code and markdown in real time." }] },
          { id: "t-1-2-3", number: 3, title: "Cursor", description: "AI-native code editor, @-symbols indexing, and Composer multi-file edits.", content: { overview: "Cursor is an AI-first IDE that indexes your entire repository to provide codebase-aware edits via Composer and inline Cmd+K.", keyTakeaways: ["Index codebase using @Codebase for accurate context.", "Use Composer (Cmd+I) to refactor across multiple files simultaneously."], practicalExample: "Updating a global theme variable across 20 files using Cursor Composer." }, summary: "Supercharge file editing with repository-wide context and Composer.", keyTerms: [{ term: "Composer", definition: "Multi-file editing tool in Cursor for repository-wide changes." }] },
          { id: "t-1-2-4", number: 4, title: "GitHub Copilot", description: "Autocomplete, Copilot Chat, and workspace commands.", content: { overview: "GitHub Copilot integrates directly into VS Code, offering inline ghost text completion and workspace chat commands.", keyTakeaways: ["Ghost text completions speed up repetitive syntax.", "Use /explain and /tests commands for rapid insight."] }, summary: "Utilize Copilot for real-time autocomplete and IDE chat integration.", keyTerms: [{ term: "Ghost Text", definition: "Grayed-out suggested code inline as you type." }] },
          { id: "t-1-2-5", number: 5, title: "Lovable", description: "Full-stack web application builder with instant preview.", content: { overview: "Lovable turns prompt descriptions directly into fully styled Vite/React applications with Supabase integrations.", keyTakeaways: ["Generate UI and database schemas in one step.", "Export code to GitHub for custom enhancements."] }, summary: "Build complete React & Supabase applications from natural language.", keyTerms: [{ term: "Full-stack Prompting", definition: "Generating both UI frontend and database backend from single prompts." }] },
          { id: "t-1-2-6", number: 6, title: "Windsurf", description: "Flows and Cascade AI assistant for full codebase awareness.", content: { overview: "Windsurf by Codeium introduces Cascade Flows that track developer state and automate complex multi-step workflows.", keyTakeaways: ["Flows automatically track project state.", "Cascade resolves terminal and build errors silently."] }, summary: "Automate multi-step code updates using Windsurf's agentic Cascade.", keyTerms: [{ term: "Cascade", definition: "Agentic engine inside Windsurf for automated multi-step development." }] },
          { id: "t-1-2-7", number: 7, title: "Bolt", description: "In-browser WebContainer development with instant npm execution.", content: { overview: "Bolt.new runs WebContainers inside the browser, installing packages and running Vite servers directly from prompts.", keyTakeaways: ["Zero setup required; runs full Node environment in browser.", "Direct deployment to Netlify or Vercel."] }, summary: "Prototype and deploy full-stack Node applications instantly in-browser.", keyTerms: [{ term: "WebContainers", definition: "Browser-based Node.js runtime executing npm commands inside the browser." }] },
          { id: "t-1-2-8", number: 8, title: "Replit AI", description: "Cloud workspace, Agent deployments, and collaborative AI.", content: { overview: "Replit AI combines cloud-hosted dev environments with AI agents that build, test, and host full-stack apps.", keyTakeaways: ["Deploy production web apps with custom domain setup.", "Collaborate with team members while AI builds live."] }, summary: "Cloud-native AI development and instant application hosting.", keyTerms: [{ term: "Replit Agent", definition: "Autonomous cloud agent that plans and implements full web apps." }] }
        ]
      },
      {
        id: "sem-1-mod-3",
        number: 3,
        title: "Prompt Engineering",
        description: "Crafting precise, high-performance instructions for code models.",
        topics: [
          { id: "t-1-3-1", number: 1, title: "Writing Effective Prompts", description: "Role, context, task instructions, and output format constraints.", content: { overview: "Effective prompts define clear persona, state constraints, specify output types (e.g. valid JSON, TSX only), and provide concrete examples.", keyTakeaways: ["Give explicit constraints (e.g. 'Use Tailwind CSS v4').", "Provide exact input/output examples (Few-shot prompting)."] }, summary: "Structure prompts with explicit context, constraints, and formats.", keyTerms: [{ term: "Few-shot Prompting", definition: "Providing concrete input/output examples within the prompt." }] },
          { id: "t-1-3-2", number: 2, title: "Refining Prompts", description: "Iterative feedback loops and correcting generated code.", content: { overview: "Refining is the process of feeding error messages, lint failures, and UI screenshots back into the AI to reach exact specifications.", keyTakeaways: ["Paste stack traces directly without modifying error details.", "Ask AI to explain root cause before applying fix."] }, summary: "Guide the AI to perfect code through clear feedback cycles.", keyTerms: [{ term: "Iterative Refinement", definition: "Progressively sharpening outputs through consecutive feedback prompt turns." }] },
          { id: "t-1-3-3", number: 3, title: "Context Management", description: "Managing file references, dependencies, and token budgets.", content: { overview: "Avoid context bloat by selecting only relevant files and interfaces, maximizing accuracy and preventing model distraction.", keyTakeaways: ["Reference interfaces and types over full component logic.", "Keep context fresh by starting new chat threads for new tasks."] }, summary: "Optimize token budget by supplying concise, high-value file context.", keyTerms: [{ term: "Token Budget", definition: "The limit of words/tokens an LLM can consume effectively." }] },
          { id: "t-1-3-4", number: 4, title: "Multi-step Prompting", description: "Chaining prompts for complex features: schema -> API -> UI.", content: { overview: "Break large features into logical sequential prompts: first define data types, then build API handlers, and finally craft the UI.", keyTakeaways: ["Step 1: Data model & types.", "Step 2: Business logic & state management.", "Step 3: UI presentation layer."] }, summary: "Decompose complex system requests into structured step-by-step prompts.", keyTerms: [{ term: "Prompt Chaining", definition: "Executing sequential prompts where each output feeds the next prompt step." }] },
          { id: "t-1-3-5", number: 5, title: "Debugging with Prompts", description: "Diagnosing runtime exceptions, network bugs, and performance issues.", content: { overview: "Use AI to analyze stack trace tracebacks, identify race conditions, and recommend minimal patch diffs.", keyTakeaways: ["Include expected vs actual behavior.", "Share browser console logs and network payload snippets."] }, summary: "Locate and fix elusive bugs by supplying full empirical logs to AI.", keyTerms: [{ term: "Root Cause Analysis", definition: "AI-driven identification of fundamental software failures." }] }
        ]
      },
      {
        id: "sem-1-mod-4",
        number: 4,
        title: "Product Thinking",
        description: "Translating real-world user problems into software products.",
        topics: [
          { id: "t-1-4-1", number: 1, title: "Understanding User Problems", description: "Problem validation, pain points, and target user discovery.", content: { overview: "Great products solve painful, frequent problems. Identify core user friction before generating code.", keyTakeaways: ["Focus on user outcomes rather than technical features.", "Conduct user interviews to uncover true pain points."] }, summary: "Validate target user friction points before building solutions.", keyTerms: [{ term: "Problem Statement", definition: "Concise description of the user problem to be solved." }] },
          { id: "t-1-4-2", number: 2, title: "User Personas", description: "Defining target audience behaviors, goals, and technical comfort.", content: { overview: "Create realistic user profiles to guide decisions on UI complexity, workflow design, and feature prioritization.", keyTakeaways: ["Define user goals, frustrations, and daily workflows.", "Design features specifically tailored to persona needs."] }, summary: "Build customer empathy through clear persona definitions.", keyTerms: [{ term: "User Persona", definition: "Semi-fictional representation of your ideal user." }] },
          { id: "t-1-4-3", number: 3, title: "Feature Identification", description: "MoSCoW matrix, feature scoping, and prioritization.", content: { overview: "Prioritize Must-have vs Should-have features to deliver value rapidly without scope creep.", keyTakeaways: ["Group features into Must, Should, Could, Won't.", "Eliminate unnecessary complexity from initial releases."] }, summary: "Scope high-impact features quickly to avoid scope creep.", keyTerms: [{ term: "MoSCoW Matrix", definition: "Prioritization framework: Must have, Should have, Could have, Won't have." }] },
          { id: "t-1-4-4", number: 4, title: "MVP Design", description: "Building Minimum Viable Products to test market hypotheses.", content: { overview: "An MVP is the simplest version of a product that delivers core value to real users to collect feedback.", keyTakeaways: ["Focus on one core feature done exceptionally well.", "Launch early to validate user adoption with real metrics."] }, summary: "Ship functional core value fast to test real market adoption.", keyTerms: [{ term: "MVP", definition: "Minimum Viable Product with core value features for early user feedback." }] },
          { id: "t-1-4-5", number: 5, title: "Product Planning", description: "Roadmaps, milestone tracking, and AI-accelerated delivery.", content: { overview: "Create structured execution plans with clear milestones and release cycles.", keyTakeaways: ["Set bi-weekly release goals.", "Track progress through functional user stories."] }, summary: "Organize project development into clear, measurable milestones.", keyTerms: [{ term: "Product Roadmap", definition: "Strategic plan mapping product evolution over time." }] }
        ]
      }
    ]
  },

  // SEMESTER 2
  {
    id: "sem-2",
    number: 2,
    title: "UI & User Experience",
    description: "Build beautiful, accessible, and responsive user interfaces powered by design systems and AI design assistants.",
    subtitle: "Design systems, AI UI generators, animations, accessibility, and modern responsive layouts.",
    creditsRequired: 100,
    project: {
      id: "proj-2",
      title: "Build a responsive SaaS dashboard",
      description: "Create a complete, responsive analytics dashboard featuring dark mode toggle, interactive charts, data tables, filter controls, and mobile navigation drawer.",
      requirements: [
        "Dark & light theme toggle support",
        "Responsive sidebar & header navigation for mobile and desktop",
        "Data visualization cards with interactive charts & metrics",
        "Data table with search filtering, pagination, and status badges"
      ],
      credits: 100
    },
    modules: [
      {
        id: "sem-2-mod-1",
        number: 1,
        title: "AI UI Generation",
        description: "Generating production-ready layouts and component suites.",
        topics: [
          { id: "t-2-1-1", number: 1, title: "Layout Design", description: "Flexbox, CSS Grid, container query layouts, and spatial hierarchy.", content: { overview: "Master modern CSS layout systems including CSS Grid and Flexbox to build fluid, adaptable application layouts.", keyTakeaways: ["Use CSS Grid for two-dimensional page structures.", "Use Flexbox for one-dimensional alignments and toolbars."] }, summary: "Construct flexible, fluid page structures with Grid and Flexbox.", keyTerms: [{ term: "CSS Grid", definition: "Two-dimensional layout system for rows and columns." }] },
          { id: "t-2-1-2", number: 2, title: "Responsive Interfaces", description: "Mobile-first design, breakpoints, and fluid typography.", content: { overview: "Build interfaces that look stunning on screens ranging from smartphones to 4K displays.", keyTakeaways: ["Design mobile views first before scaling up.", "Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)."] }, summary: "Deliver seamless responsive experiences across all device screen sizes.", keyTerms: [{ term: "Mobile-First", definition: "Designing for small screens initially and enhancing for larger displays." }] },
          { id: "t-2-1-3", number: 3, title: "Components", description: "Atomic design principles, buttons, cards, modals, and tabs.", content: { overview: "Build modular, reusable UI components following Shadcn and Radix UI patterns.", keyTakeaways: ["Keep component props explicit and typed.", "Separate presentation components from data fetching logic."] }, summary: "Build reusable, isolated component units for scale and consistency.", keyTerms: [{ term: "Atomic Design", definition: "Methodology breaking UI down into atoms, molecules, and organisms." }] },
          { id: "t-2-1-4", number: 4, title: "Navigation", description: "Headers, sidebars, breadcrumbs, command palettes, and drawer menus.", content: { overview: "Design intuitive navigation structures enabling users to accomplish tasks effortlessly.", keyTakeaways: ["Provide breadcrumbs for deep route hierarchy.", "Implement Cmd+K command palettes for instant keyboard navigation."] }, summary: "Craft frictionless navigation patterns for intuitive user movement.", keyTerms: [{ term: "Command Palette", definition: "Keyboard-driven modal search for fast app navigation." }] },
          { id: "t-2-1-5", number: 5, title: "Forms", description: "Input fields, validation states, React Hook Form, and Zod schemas.", content: { overview: "Construct user-friendly forms with instant client-side validation and clear error state feedback.", keyTakeaways: ["Validate input schemas with Zod.", "Show field errors inline directly beside inputs."] }, summary: "Design validated, accessible forms with immediate feedback.", keyTerms: [{ term: "Zod Schema", definition: "TypeScript-first schema validation library." }] }
        ]
      },
      {
        id: "sem-2-mod-2",
        number: 2,
        title: "Design Systems",
        description: "Establishing visual visual consistency across components.",
        topics: [
          { id: "t-2-2-1", number: 1, title: "Color Systems", description: "HSL color tokens, semantic palettes, and contrast accessibility.", content: { overview: "Build harmonious color palettes using HSL CSS variables for seamless light/dark mode themes.", keyTakeaways: ["Define semantic tokens like --background, --primary, --muted.", "Maintain WCAG AAA contrast ratios."] }, summary: "Establish accessible, tokenized color palettes for dark and light modes.", keyTerms: [{ term: "Semantic Color Token", definition: "Named color variables tied to purpose rather than specific hex values." }] },
          { id: "t-2-2-2", number: 2, title: "Typography", description: "Font pairings, typographic scales, fluid line heights, and legibility.", content: { overview: "Pair display fonts with clean sans-serif body typefaces for clear visual hierarchy.", keyTakeaways: ["Use Outfit or Inter Google Fonts.", "Maintain consistent font size scales."] }, summary: "Create visual hierarchy with intentional font choices and scales.", keyTerms: [{ term: "Type Scale", definition: "Proportional set of font sizes defining text hierarchy." }] },
          { id: "t-2-2-3", number: 3, title: "Icons", description: "Lucide icons, SVG optimization, and icon button consistency.", content: { overview: "Use Lucide React SVG icons to enhance visual clarity and affordance across action controls.", keyTakeaways: ["Maintain consistent icon sizes (w-4 h-4 or w-5 h-5).", "Always include ARIA labels for icon-only buttons."] }, summary: "Enhance visual recognition using consistent Lucide vector icons.", keyTerms: [{ term: "Lucide Icons", definition: "Clean, consistent open-source icon suite for modern web apps." }] },
          { id: "t-2-2-4", number: 4, title: "Spacing", description: "8px grid systems, padding rules, and visual rhythm.", content: { overview: "Enforce consistent spatial relationships between UI elements using 4px/8px grid multipliers.", keyTakeaways: ["Use consistent gap utilities in flex/grid layouts.", "Maintain uniform card padding across views."] }, summary: "Maintain rhythm and visual harmony with strict spacing grids.", keyTerms: [{ term: "Spatial System", definition: "Standardized set of margin and padding distances." }] },
          { id: "t-2-2-5", number: 5, title: "Accessibility", description: "ARIA roles, keyboard focus indicators, screen reader support, and contrast.", content: { overview: "Ensure software is usable by everyone by implementing semantic HTML, focus rings, and screen reader labels.", keyTakeaways: ["Test keyboard navigation using Tab and Enter keys.", "Include explicit aria-label tags on interactive elements."] }, summary: "Build inclusive, accessible interfaces conforming to WCAG standards.", keyTerms: [{ term: "WCAG", definition: "Web Content Accessibility Guidelines for digital inclusion." }] }
        ]
      },
      {
        id: "sem-2-mod-3",
        number: 3,
        title: "User Experience",
        description: "Frictionless user flows, micro-interactions, and visual feedback.",
        topics: [
          { id: "t-2-3-1", number: 1, title: "User Flows", description: "Mapping screen journeys, onboarding flows, and success feedback.", content: { overview: "Design step-by-step user journeys that eliminate decision fatigue and lead to rapid goal completion.", keyTakeaways: ["Minimize required clicks per objective.", "Provide clear confirmation dialogs for destructive actions."] }, summary: "Streamline user tasks with minimal steps and clear confirmation feedback.", keyTerms: [{ term: "User Journey", definition: "Path a user takes to achieve a goal within your application." }] },
          { id: "t-2-3-2", number: 2, title: "Wireframes", description: "Low-fidelity layouts, spatial planning, and rapid UX testing.", content: { overview: "Sketch functional layouts before adding final styling to test structure and information hierarchy.", keyTakeaways: ["Focus on content placement before colors.", "Validate navigation layout early."] }, summary: "Validate spatial organization rapidly with structural wireframes.", keyTerms: [{ term: "Wireframe", definition: "Low-fidelity blueprint representing page structure." }] },
          { id: "t-2-3-3", number: 3, title: "Interaction Design", description: "Framer Motion animations, hover states, and smooth transitions.", content: { overview: "Add micro-interactions with Framer Motion to make UI feel responsive, fast, and tactile.", keyTakeaways: ["Animate state changes subtly (150-300ms durations).", "Use hover and active elevation states."] }, summary: "Delight users with subtle, responsive micro-animations.", keyTerms: [{ term: "Framer Motion", definition: "React animation library for fluid UI transitions." }] },
          { id: "t-2-3-4", number: 4, title: "Dashboard Design", description: "Information density, KPI cards, metric charts, and data layout.", content: { overview: "Organize metrics, graphs, and action tables so users digest key insights immediately at a glance.", keyTakeaways: ["Place top-level KPI summary cards at the top.", "Use visual charts (Recharts) for trend analysis."] }, summary: "Present dense analytical data clearly with structured KPI dashboards.", keyTerms: [{ term: "KPI Card", definition: "Summary component displaying key performance indicators." }] }
        ]
      },
      {
        id: "sem-2-mod-4",
        number: 4,
        title: "AI Design Assistant",
        description: "Generating, reviewing, and perfecting UI designs with AI.",
        topics: [
          { id: "t-2-4-1", number: 1, title: "Generate UI", description: "Prompting AI for full page designs, themes, and layouts.", content: { overview: "Use AI tools to instantly generate multi-section page layouts complete with responsive Tailwind classes.", keyTakeaways: ["Prompt with specific component names (e.g. 'Use Shadcn Card').", "Specify color themes and visual aesthetic preferences."] }, summary: "Produce complete UI pages instantly from descriptive text prompts.", keyTerms: [{ term: "Generative UI", definition: "UI code dynamically authored by generative AI models." }] },
          { id: "t-2-4-2", number: 2, title: "Improve UI", description: "Polishing visual aesthetics, glassmorphism, and color harmony.", content: { overview: "Take basic UI layouts and prompt AI to add modern visual flair like subtle gradients, glassmorphism, and borders.", keyTakeaways: ["Ask AI to audit spacing and visual contrast.", "Incorporate subtle background backdrop blurs."] }, summary: "Refine basic interfaces into modern, premium visual experiences.", keyTerms: [{ term: "Glassmorphism", definition: "Design style utilizing semi-transparent backdrops and subtle borders." }] },
          { id: "t-2-4-3", number: 3, title: "Convert Designs to Applications", description: "Figma to code conversion with AI code models.", content: { overview: "Convert Figma vector mockups or screenshots into working React JSX code using AI vision models.", keyTakeaways: ["Upload design screenshots to Claude or ChatGPT.", "Inspect generated layout code for clean semantic markup."] }, summary: "Translate visual designs into clean production JSX code.", keyTerms: [{ term: "Design-to-Code", definition: "Automated conversion of visual designs into functional frontend code." }] },
          { id: "t-2-4-4", number: 4, title: "UI Review", description: "Automated UI feedback, responsiveness inspection, and audit.", content: { overview: "Use AI to scan your component files for visual inconsistencies, accessibility issues, and missing mobile states.", keyTakeaways: ["Run automated accessibility audits.", "Check layout behavior at responsive mobile breakpoints."] }, summary: "Audit frontend quality automatically with AI design inspection.", keyTerms: [{ term: "UI Audit", definition: "Systematic evaluation of UI consistency and accessibility." }] }
        ]
      }
    ]
  },

  // SEMESTER 3
  {
    id: "sem-3",
    number: 3,
    title: "Application Building",
    description: "Build full-stack applications with authentication, databases, CRUD operations, and AI development workflows.",
    subtitle: "Authentication flows, databases, API routes, business logic, and automated testing.",
    creditsRequired: 100,
    project: {
      id: "proj-3",
      title: "Student Management Platform",
      description: "Build a complete Student Management Platform with user authentication, student profile creation, course enrollment tracking, grades dashboard, and search filter features.",
      requirements: [
        "Role-based authentication (Student vs Admin/Teacher)",
        "Student profile management & course enrollment tracking",
        "CRUD operations for courses, marks, and attendance",
        "Search bar and multi-filter controls for student directory"
      ],
      credits: 100
    },
    modules: [
      {
        id: "sem-3-mod-1",
        number: 1,
        title: "Authentication",
        description: "Implementing secure identity systems.",
        topics: [
          { id: "t-3-1-1", number: 1, title: "Login Flow", description: "JWT tokens, password hashing, session cookies, and login forms.", content: { overview: "Construct secure authentication flows using hashed passwords (bcrypt) and signed JWT tokens or session cookies.", keyTakeaways: ["Never store plaintext passwords.", "Set HttpOnly flags on session cookies for XSS protection."] }, summary: "Implement secure user authentication with password hashing and session tokens.", keyTerms: [{ term: "JWT Token", definition: "JSON Web Token for secure stateless user authentication." }] },
          { id: "t-3-1-2", number: 2, title: "Signup Flow", description: "User registration, email verification, input validation, and password strength.", content: { overview: "Build smooth user registration pipelines with instant password validation and account activation.", keyTakeaways: ["Enforce minimum password security requirements.", "Verify unique email constraint before user creation."] }, summary: "Create validated registration flows with instant password checks.", keyTerms: [{ term: "Registration Pipeline", definition: "Sequence of steps processing new user account creation." }] },
          { id: "t-3-1-3", number: 3, title: "Social Login", description: "OAuth 2.0 integration with Google, GitHub, and Microsoft.", content: { overview: "Enable 1-click social authentication using OAuth 2.0 protocols.", keyTakeaways: ["Store client ID and secret safely in server env variables.", "Handle OAuth callback redirects securely."] }, summary: "Integrate frictionless 1-click social logins with Google & GitHub OAuth.", keyTerms: [{ term: "OAuth 2.0", definition: "Industry-standard protocol for authorization and social logins." }] },
          { id: "t-3-1-4", number: 4, title: "User Profiles", description: "Avatar upload, profile updating, password reset, and settings.", content: { overview: "Provide users with personal profile management controls to update contact details, upload avatars, and manage security.", keyTakeaways: ["Validate image upload file size and type.", "Provide instant toast notifications on profile updates."] }, summary: "Build comprehensive user profile and account setting interfaces.", keyTerms: [{ term: "User Profile State", definition: "Application state holding authenticated user metadata." }] }
        ]
      },
      {
        id: "sem-3-mod-2",
        number: 2,
        title: "Data Management",
        description: "Databases, ORMs, and persistence architecture.",
        topics: [
          { id: "t-3-2-1", number: 1, title: "Databases", description: "PostgreSQL, MongoDB, Drizzle ORM, and schema migrations.", content: { overview: "Model relational and document databases with clean indexing, foreign keys, and automated migration scripts.", keyTakeaways: ["Use Drizzle ORM or Prisma for type-safe database queries.", "Run automated migration files on schema changes."] }, summary: "Design type-safe, relational database schemas with Drizzle ORM.", keyTerms: [{ term: "ORM", definition: "Object-Relational Mapping library translating code objects to database queries." }] },
          { id: "t-3-2-2", number: 2, title: "CRUD Operations", description: "Create, Read, Update, Delete REST APIs and React Query hooks.", content: { overview: "Implement robust API endpoints handling CRUD operations paired with React Query for optimistic client caching.", keyTakeaways: ["Return proper HTTP status codes (200, 201, 400, 404, 500).", "Invalidate React Query cache keys on successful mutations."] }, summary: "Build full-stack CRUD endpoints with server state caching.", keyTerms: [{ term: "React Query", definition: "Data fetching and server state management library for React." }] },
          { id: "t-3-2-3", number: 3, title: "Relationships", description: "One-to-many, many-to-many relationships, joins, and foreign keys.", content: { overview: "Connect database entities cleanly using relational foreign keys and SQL joins.", keyTakeaways: ["Define CASCADE delete behaviors appropriately.", "Index foreign key columns for fast query joins."] }, summary: "Model relational entity connections with foreign key constraints.", keyTerms: [{ term: "Foreign Key", definition: "Column referencing primary key in another database table." }] },
          { id: "t-3-2-4", number: 4, title: "Storage", description: "S3, Cloudinary file uploads, asset storage, and CDN delivery.", content: { overview: "Store user uploaded files (images, documents) securely in cloud storage bucket services.", keyTakeaways: ["Use pre-signed S3 URLs for direct client uploads.", "Serve media assets through CDN edge networks."] }, summary: "Manage media assets securely using cloud object storage.", keyTerms: [{ term: "S3 Bucket", definition: "Scalable cloud storage service for digital media assets." }] }
        ]
      },
      {
        id: "sem-3-mod-3",
        number: 3,
        title: "Business Features",
        description: "Building production-grade data tables, filters, and reports.",
        topics: [
          { id: "t-3-3-1", number: 1, title: "Dashboards", description: "Real-time metrics, activity feeds, and summary widgets.", content: { overview: "Assemble unified operational dashboards aggregating real-time application metrics.", keyTakeaways: ["Display live user activity feeds.", "Summarize metrics into clear KPI cards."] }, summary: "Aggregate operational metrics into clear real-time dashboards.", keyTerms: [{ term: "Operational Dashboard", definition: "Central hub for viewing application metrics and activity." }] },
          { id: "t-3-3-2", number: 2, title: "Tables", description: "TanStack Table, sorting, pagination, multi-select, and row actions.", content: { overview: "Build powerful data tables supporting column sorting, client/server pagination, and batch actions.", keyTakeaways: ["Use TanStack Table (React Table v8).", "Implement server-side pagination for large datasets."] }, summary: "Construct high-performance data tables with sorting and pagination.", keyTerms: [{ term: "TanStack Table", definition: "Headless table building library for React." }] },
          { id: "t-3-3-3", number: 3, title: "Search", description: "Debounced search inputs, full-text index queries, and instant response.", content: { overview: "Enable real-time search functionality with debounced user input to prevent excessive API requests.", keyTakeaways: ["Debounce user input by 300ms.", "Use ILIKE or full-text SQL indexes."] }, summary: "Implement fast debounced search capabilities across datasets.", keyTerms: [{ term: "Debounce", definition: "Delaying function execution until user typing pauses." }] },
          { id: "t-3-3-4", number: 4, title: "Filters", description: "Multi-select faceted filters, date range pickers, and URL query params.", content: { overview: "Allow users to narrow data results through faceted filter controls synchronized with URL params.", keyTakeaways: ["Sync filter state with URL search params for shareable views.", "Provide 'Clear All Filters' shortcut button."] }, summary: "Provide shareable faceted data filtering synchronized with URL state.", keyTerms: [{ term: "Faceted Filter", definition: "Filter controls letting users select values across multiple attributes." }] },
          { id: "t-3-3-5", number: 5, title: "Reports", description: "CSV export, PDF report generation, and data summary charts.", content: { overview: "Generate downloadable CSV spreadsheets and printable PDF summary documents from application data.", keyTakeaways: ["Generate CSV data strings on the client.", "Style printable PDF report templates clean and crisp."] }, summary: "Export analytical summaries into downloadable CSV and PDF formats.", keyTerms: [{ term: "CSV Export", definition: "Formatting data tables into comma-separated values files." }] }
        ]
      },
      {
        id: "sem-3-mod-4",
        number: 4,
        title: "AI Development Workflow",
        description: "Accelerating feature development, debugging, and testing.",
        topics: [
          { id: "t-3-4-1", number: 1, title: "Build Features", description: "Generating end-to-end feature slices with AI.", content: { overview: "Prompt AI to construct complete feature slices from backend API routes down to frontend components.", keyTakeaways: ["Supply existing project patterns as context.", "Verify type safety across API boundaries."] }, summary: "Construct full-stack feature slices rapidly using AI models.", keyTerms: [{ term: "Feature Slice", definition: "Vertical slice of functionality spanning UI, logic, and database." }] },
          { id: "t-3-4-2", number: 2, title: "Debug Features", description: "Troubleshooting network bugs, state bugs, and DB queries.", content: { overview: "Use AI to trace bug reproduction steps, analyze network payloads, and fix state mutation issues.", keyTakeaways: ["Provide exact error tracebacks to the AI.", "Isolate issues before editing code."] }, summary: "Locate and fix full-stack execution bugs with targeted AI prompts.", keyTerms: [{ term: "Traceback Analysis", definition: "Analyzing execution call stacks to pinpoint failure origin." }] },
          { id: "t-3-4-3", number: 3, title: "Improve Features", description: "Refactoring code, optimizing performance, and eliminating duplication.", content: { overview: "Ask AI to refactor code for performance gains, removing duplicate logic and improving readability.", keyTakeaways: ["Extract reusable utility functions.", "Optimize unnecessary React component re-renders."] }, summary: "Optimize code readability and runtime performance using AI refactoring.", keyTerms: [{ term: "Code Refactoring", definition: "Restructuring code without changing its external behavior." }] },
          { id: "t-3-4-4", number: 4, title: "Test Features", description: "Writing automated Vitest unit tests and Playwright E2E tests with AI.", content: { overview: "Generate unit tests and end-to-end integration tests automatically from component files.", keyTakeaways: ["Mock network API requests in tests.", "Assert critical user interaction pathways."] }, summary: "Automate test suite generation for high code coverage.", keyTerms: [{ term: "E2E Testing", definition: "End-to-end testing of complete application flows in real browser runtime." }] }
        ]
      }
    ]
  },

  // SEMESTER 4
  {
    id: "sem-4",
    number: 4,
    title: "SaaS Development",
    description: "Build multi-tenant SaaS products with user organizations, role permissions, billing integrations, and production deployment.",
    subtitle: "Multi-tenant architecture, payment processing, subscription management, and DevOps deployment.",
    creditsRequired: 100,
    project: {
      id: "proj-4",
      title: "SaaS CRM",
      description: "Build a complete multi-tenant SaaS Customer Relationship Management (CRM) application with organization management, deal pipeline stages, team role permissions, and Stripe subscription integration.",
      requirements: [
        "Multi-tenant organization & team member invitation flow",
        "Role-based access control (Admin, Manager, Member)",
        "Kanban deal pipeline board with drag-and-drop or stage movement",
        "Stripe payment gateway integration for monthly subscription tiers"
      ],
      credits: 100
    },
    modules: [
      {
        id: "sem-4-mod-1",
        number: 1,
        title: "SaaS Architecture",
        description: "Multi-tenancy, permissions, and organization isolation.",
        topics: [
          { id: "t-4-1-1", number: 1, title: "Multi-user Systems", description: "Tenant data isolation, workspace scoping, and shared databases.", content: { overview: "Architect multi-tenant backend systems ensuring data belonging to one organization is strictly isolated from others.", keyTakeaways: ["Include tenant_id (org_id) on all database tables.", "Enforce workspace scoping in API middleware."] }, summary: "Isolate tenant data securely using org-scoped database queries.", keyTerms: [{ term: "Multi-Tenancy", definition: "Software architecture serving multiple isolated organization clients from one app instance." }] },
          { id: "t-4-1-2", number: 2, title: "Organizations", description: "Organization creation, team invitations, and workspace switching.", content: { overview: "Build multi-workspace switcher UI allowing users to manage multiple organizations seamlessly.", keyTakeaways: ["Send email invitations with secure token links.", "Store active org ID in context session."] }, summary: "Implement multi-tenant organization creation and invitation workflows.", keyTerms: [{ term: "Workspace Switcher", definition: "UI dropdown letting users change active active organization." }] },
          { id: "t-4-1-3", number: 3, title: "Permissions", description: "Role-Based Access Control (RBAC) and fine-grained authorization.", content: { overview: "Implement RBAC permissions ensuring users perform actions strictly matching their assigned role.", keyTakeaways: ["Check permissions on both backend API and UI buttons.", "Define permission matrices clearly."] }, summary: "Enforce strict Role-Based Access Control across API routes and UI.", keyTerms: [{ term: "RBAC", definition: "Role-Based Access Control restricting actions based on assigned role." }] },
          { id: "t-4-1-4", number: 4, title: "Roles", description: "Admin, Manager, Member, and custom role definitions.", content: { overview: "Configure role hierarchies defining what features each role can view, edit, or delete.", keyTakeaways: ["Owner/Admin: Full access & billing management.", "Member: Read and write workspace content."] }, summary: "Define role hierarchies for granular access control.", keyTerms: [{ term: "Role Hierarchy", definition: "Structured ranking of user roles and permission sets." }] }
        ]
      },
      {
        id: "sem-4-mod-2",
        number: 2,
        title: "Business Applications",
        description: "Core business application patterns (CRM, HRMS, ERP).",
        topics: [
          { id: "t-4-2-1", number: 1, title: "CRM", description: "Customer relationship management, deal pipelines, and contact tracking.", content: { overview: "Build CRM systems tracking customer interactions, sales pipelines, and deal status stages.", keyTakeaways: ["Use Kanban board column views for deal stages.", "Track communication activity history per contact."] }, summary: "Construct sales deal pipelines and customer management boards.", keyTerms: [{ term: "Deal Pipeline", definition: "Visual stages tracking sales leads from contact to closed deals." }] },
          { id: "t-4-2-2", number: 2, title: "HRMS", description: "Employee management, leave requests, and payroll tracking.", content: { overview: "Design HR software managing employee records, attendance, leave approvals, and organizational charts.", keyTakeaways: ["Build leave request approval workflows.", "Maintain employee directory records."] }, summary: "Build HR software managing employee records and leave workflows.", keyTerms: [{ term: "HRMS", definition: "Human Resource Management System." }] },
          { id: "t-4-2-3", number: 3, title: "ERP", description: "Resource planning, inventory tracking, and financial ledgers.", content: { overview: "Integrate business process systems connecting purchasing, inventory levels, and financial records.", keyTakeaways: ["Track real-time stock levels.", "Maintain audit log transactions."] }, summary: "Integrate core business operational processes into unified systems.", keyTerms: [{ term: "ERP", definition: "Enterprise Resource Planning system." }] },
          { id: "t-4-2-4", number: 4, title: "Inventory", description: "Stock management, reorder alerts, SKU tracking, and supplier orders.", content: { overview: "Track product stock movements, generate low stock notifications, and manage supplier purchase orders.", keyTakeaways: ["Automate low-stock alerts.", "Track SKU item locations."] }, summary: "Track product stock movements and automated reorder alerts.", keyTerms: [{ term: "SKU", definition: "Stock Keeping Unit identifier for inventory tracking." }] },
          { id: "t-4-2-5", number: 5, title: "Booking", description: "Calendar scheduling, appointment booking, and availability slots.", content: { overview: "Create scheduling engines enabling clients to select available calendar time slots and book services.", keyTakeaways: ["Prevent double-booking time conflicts.", "Sync calendar events automatically."] }, summary: "Build interactive appointment scheduling engines with instant conflict checks.", keyTerms: [{ term: "Slot Reservation", definition: "Locking a specific time window for a client booking." }] }
        ]
      },
      {
        id: "sem-4-mod-3",
        number: 3,
        title: "Payment Integration",
        description: "Monetizing applications with Stripe subscriptions and webhooks.",
        topics: [
          { id: "t-4-3-1", number: 1, title: "Subscription Models", description: "Freemium, Tiered pricing, usage-based billing, and feature gates.", content: { overview: "Design pricing tiers (Free, Pro, Enterprise) with feature gate flags restricting access based on subscription level.", keyTakeaways: ["Build clear pricing table comparisons.", "Enforce feature gates on the server."] }, summary: "Architect subscription tiers with server-enforced feature gates.", keyTerms: [{ term: "Feature Gating", definition: "Restricting feature access based on active payment tier." }] },
          { id: "t-4-3-2", number: 2, title: "Billing", description: "Stripe Checkout, Customer Portal, and subscription webhooks.", content: { overview: "Integrate Stripe Checkout and Customer Portal for self-serve subscription upgrades, downgrades, and cancellations.", keyTakeaways: ["Listen to Stripe webhooks (invoice.paid, customer.subscription.deleted).", "Verify webhook signatures securely."] }, summary: "Integrate Stripe Checkout and automated webhook event handlers.", keyTerms: [{ term: "Stripe Webhook", definition: "Real-time HTTP event notification sent by Stripe." }] },
          { id: "t-4-3-3", number: 3, title: "Invoices", description: "PDF invoices, payment history, and receipt delivery.", content: { overview: "Provide users with access to historical payment receipts and downloadable PDF invoices.", keyTakeaways: ["Fetch invoice PDFs directly from Stripe API.", "Display clear billing history tables."] }, summary: "Display historical payment logs and downloadable PDF receipts.", keyTerms: [{ term: "Billing History", definition: "Record of past transactions and subscription payments." }] },
          { id: "t-4-3-4", number: 4, title: "Premium Plans", description: "Trial periods, promotional codes, and custom enterprise invoicing.", content: { overview: "Offer 14-day free trials and promo discount codes to boost subscription conversion.", keyTakeaways: ["Handle trial expiration gracefully.", "Validate promo coupon codes."] }, summary: "Implement free trial periods and promo code discount logic.", keyTerms: [{ term: "Trial Period", definition: "Time window allowing users full access before billing commences." }] }
        ]
      },
      {
        id: "sem-4-mod-4",
        number: 4,
        title: "Deployment",
        description: "Deploying production applications to modern cloud infrastructure.",
        topics: [
          { id: "t-4-4-1", number: 1, title: "Hosting", description: "Vercel, Render, Railway, AWS, and Cloudflare Pages.", content: { overview: "Deploy modern full-stack web applications to automated edge hosting platforms.", keyTakeaways: ["Configure production build commands.", "Set environment variables securely on host platform."] }, summary: "Deploy production applications to high-availability cloud platforms.", keyTerms: [{ term: "Edge Hosting", definition: "Distributed global server network serving apps close to users." }] },
          { id: "t-4-4-2", number: 2, title: "Domains", description: "Custom domain DNS setup, SSL certificates, and CNAME records.", content: { overview: "Connect custom brand domains with automated SSL HTTPS encryption setup via DNS records.", keyTakeaways: ["Configure A and CNAME DNS records.", "Enforce HTTPS SSL redirection."] }, summary: "Configure custom domains with automated SSL encryption.", keyTerms: [{ term: "DNS CNAME", definition: "Domain record aliasing one hostname to another." }] },
          { id: "t-4-4-3", number: 3, title: "Production Deployment", description: "CI/CD pipelines, Docker containerization, and zero-downtime releases.", content: { overview: "Automate build, test, and release cycles through GitHub Actions CI/CD pipelines.", keyTakeaways: ["Automate tests on git push.", "Ensure zero-downtime rolling deployments."] }, summary: "Automate continuous integration and deployment pipelines with GitHub Actions.", keyTerms: [{ term: "CI/CD Pipeline", definition: "Automated process testing and deploying code to production." }] },
          { id: "t-4-4-4", number: 4, title: "Monitoring", description: "Sentry error tracking, Uptime monitoring, and performance logs.", content: { overview: "Monitor production application health with real-time error tracking and uptime alerts.", keyTakeaways: ["Integrate Sentry for frontend and backend exception alerts.", "Monitor API latency metrics."] }, summary: "Track production errors and system availability with real-time monitoring.", keyTerms: [{ term: "Error Tracking", definition: "Automated logging and alerting of runtime software exceptions." }] }
        ]
      }
    ]
  },

  // SEMESTER 5
  {
    id: "sem-5",
    number: 5,
    title: "AI Product Development",
    description: "Integrate LLMs, AI agents, document vector processing, and product intelligence features into web applications.",
    subtitle: "AI chat, RAG search, autonomous agents, content generation, and smart analytics.",
    creditsRequired: 100,
    project: {
      id: "proj-5",
      title: "AI Productivity Platform",
      description: "Build an AI Productivity Platform featuring document Q&A via RAG, automated AI summary generators, conversational assistant, and smart workflow automation.",
      requirements: [
        "Document file upload & text extract processing",
        "AI Chat Assistant with streaming responses",
        "RAG-based vector search for instant Q&A over uploaded files",
        "Automated AI summary & task item extractor"
      ],
      credits: 100
    },
    modules: [
      {
        id: "sem-5-mod-1",
        number: 1,
        title: "AI Integration",
        description: "Embedding AI assistants and semantic search into products.",
        topics: [
          { id: "t-5-1-1", number: 1, title: "AI Chat", description: "OpenAI/Anthropic SDKs, SSE response streaming, and chat UI.", content: { overview: "Build responsive conversational AI interfaces with Server-Sent Events (SSE) streaming for real-time typing output.", keyTakeaways: ["Stream responses for instant UI feedback.", "Maintain conversation thread context history."] }, summary: "Build real-time streaming AI chat interfaces with OpenAI and Anthropic SDKs.", keyTerms: [{ term: "Response Streaming", definition: "Sending text chunks to the client continuously as generated." }] },
          { id: "t-5-1-2", number: 2, title: "AI Search", description: "Vector embeddings, RAG (Retrieval-Augmented Generation), and Pinecone/Pgvector.", content: { overview: "Implement semantic search across documents using vector embeddings and Pgvector / Pinecone vector stores.", keyTakeaways: ["Convert text to vector embeddings.", "Query top-K similar document chunks."] }, summary: "Implement semantic vector search using RAG and vector databases.", keyTerms: [{ term: "RAG", definition: "Retrieval-Augmented Generation augmenting AI prompts with relevant database chunks." }] },
          { id: "t-5-1-3", number: 3, title: "AI Assistant", description: "Custom tool calling, function calling, and contextual help widgets.", content: { overview: "Empower AI models to execute actions in your app via function calling (e.g. create task, search user).", keyTakeaways: ["Define strict JSON schemas for tool arguments.", "Handle tool execution results back to the model."] }, summary: "Empower AI assistants to invoke application function calls.", keyTerms: [{ term: "Function Calling", definition: "AI capability to call application APIs based on user intent." }] },
          { id: "t-5-1-4", number: 4, title: "AI Recommendations", description: "Personalized suggestions, content scoring, and user behavior matching.", content: { overview: "Deliver intelligent content recommendations based on user history and affinity embeddings.", keyTakeaways: ["Calculate cosine similarity between user profiles and items.", "Update recommendations dynamically."] }, summary: "Deliver personalized user recommendations using semantic embeddings.", keyTerms: [{ term: "Cosine Similarity", definition: "Mathematical metric measuring similarity between vector embeddings." }] }
        ]
      },
      {
        id: "sem-5-mod-2",
        number: 2,
        title: "AI Workflows",
        description: "Automating background workflows with AI pipelines.",
        topics: [
          { id: "t-5-2-1", number: 1, title: "Automation", description: "Trigger-based AI tasks, background queues, and notification triggers.", content: { overview: "Automate background workflows (e.g. process incoming email, analyze feedback) using async AI job workers.", keyTakeaways: ["Use queue systems (BullMQ) for long-running AI tasks.", "Notify users upon job completion."] }, summary: "Automate background business tasks with asynchronous AI job workers.", keyTerms: [{ term: "Background Job", definition: "Asynchronous task processed independently of HTTP request/response loops." }] },
          { id: "t-5-2-2", number: 2, title: "Document Processing", description: "PDF text extraction, OCR, data structuring, and summarization.", content: { overview: "Extract structured JSON data from raw PDFs, receipts, and images using AI vision and text parsers.", keyTakeaways: ["Parse unstructured PDF text into JSON schemas.", "Validate extracted fields."] }, summary: "Extract structured data from unstructured PDF documents and images.", keyTerms: [{ term: "OCR", definition: "Optical Character Recognition converting text in images to editable digital text." }] },
          { id: "t-5-2-3", number: 3, title: "Content Generation", description: "Automated blog post generation, email drafting, and image creation.", content: { overview: "Build automated content creation studios generating marketing copy, social posts, and images from prompts.", keyTakeaways: ["Provide template structure options.", "Allow human-in-the-loop editing."] }, summary: "Create automated marketing copy and asset generation studios.", keyTerms: [{ term: "Human-in-the-Loop", definition: "Workflow requiring human review before publishing AI outputs." }] },
          { id: "t-5-2-4", number: 4, title: "AI Agents", description: "Autonomous multi-step planning agents with tool access.", content: { overview: "Construct autonomous agents that break goals down into sub-tasks, execute tools, and evaluate output quality.", keyTakeaways: ["Implement reasoning loops (ReAct framework).", "Set maximum iteration limits to prevent infinite loops."] }, summary: "Architect autonomous agent reasoning loops with tool access.", keyTerms: [{ term: "ReAct Framework", definition: "Reasoning and Acting paradigm for autonomous AI agents." }] }
        ]
      },
      {
        id: "sem-5-mod-3",
        number: 3,
        title: "Product Intelligence",
        description: "Smart analytics, reporting, and predictive notifications.",
        topics: [
          { id: "t-5-3-1", number: 1, title: "Analytics", description: "User behavior tracking, feature usage heatmaps, and churn prediction.", content: { overview: "Analyze product usage trends to detect churn risks and popular feature pathways automatically.", keyTakeaways: ["Track core usage events.", "Identify drops in user engagement."] }, summary: "Identify engagement patterns and churn risks with product analytics.", keyTerms: [{ term: "Churn Prediction", definition: "Identifying users likely to cancel service based on activity drop-off." }] },
          { id: "t-5-3-2", number: 2, title: "Recommendations", description: "Next-best-action prompts, smart defaults, and adaptive UX.", content: { overview: "Suggest high-value next steps to users dynamically as they navigate your software.", keyTakeaways: ["Display contextual tip banners.", "Pre-fill smart defaults based on history."] }, summary: "Guide user workflows with smart next-action recommendations.", keyTerms: [{ term: "Next Best Action", definition: "Contextual prompt guiding users to the most beneficial next step." }] },
          { id: "t-5-3-3", number: 3, title: "Reports", description: "AI-generated executive summaries, anomaly detection, and insights.", content: { overview: "Transform raw database records into clear executive summaries written in natural language.", keyTakeaways: ["Flag statistically significant anomalies.", "Generate weekly digest emails automatically."] }, summary: "Convert complex operational metrics into clear AI natural language digests.", keyTerms: [{ term: "Executive Digest", definition: "Natural language summary of key performance data." }] },
          { id: "t-5-3-4", number: 4, title: "Notifications", description: "Smart push notifications, email digests, and alert filtering.", content: { overview: "Deliver timely, personalized notifications without overwhelming user attention.", keyTakeaways: ["Batch notifications into daily digests.", "Allow user notification preference controls."] }, summary: "Deliver intelligent, aggregated notification digests.", keyTerms: [{ term: "Notification Batching", definition: "Combining multiple alerts into single periodic digest emails." }] }
        ]
      },
      {
        id: "sem-5-mod-4",
        number: 4,
        title: "AI Testing",
        description: "Evaluating model accuracy, hallucinations, and regression testing.",
        topics: [
          { id: "t-5-4-1", number: 1, title: "Functional Testing", description: "Prompt evals, benchmark datasets, and semantic similarity scoring.", content: { overview: "Create benchmark evaluation datasets to measure AI output quality across model version updates.", keyTakeaways: ["Run automated eval suites against ground truth samples.", "Calculate semantic similarity scores."] }, summary: "Evaluate AI output accuracy using ground-truth benchmark datasets.", keyTerms: [{ term: "Prompt Evals", definition: "Systematic test benchmarks measuring prompt response quality." }] },
          { id: "t-5-4-2", number: 2, title: "AI-Assisted Debugging", description: "Automated log parsing, bug reproduction, and patch generation.", content: { overview: "Feed production error logs into AI agents to auto-generate patch pull requests.", keyTakeaways: ["Parse log tracebacks automatically.", "Generate targeted regression fix commits."] }, summary: "Auto-generate bug fixes from production error traceback logs.", keyTerms: [{ term: "Auto-Patch", definition: "Automated code fix proposed by AI for verified bugs." }] },
          { id: "t-5-4-3", number: 3, title: "User Acceptance Testing", description: "Beta user feedback loops, thumbs up/down scoring, and RLHF data.", content: { overview: "Collect direct user feedback on AI responses to continuously fine-tune prompt context.", keyTakeaways: ["Include inline thumbs up/down buttons on AI outputs.", "Log negative feedback for prompt improvements."] }, summary: "Improve prompt performance by tracking user rating feedback.", keyTerms: [{ term: "RLHF Feedback", definition: "Reinforcement Learning from Human Feedback." }] }
        ]
      }
    ]
  },

  // SEMESTER 6
  {
    id: "sem-6",
    number: 6,
    title: "Enterprise Systems",
    description: "Design mission-critical enterprise platforms with workflow automation, complex approval flows, team workspaces, and enterprise security.",
    subtitle: "Enterprise product architecture, workflow engines, audit logging, team workspaces, and compliance.",
    creditsRequired: 100,
    project: {
      id: "proj-6",
      title: "Enterprise ERP",
      description: "Build an Enterprise ERP solution with multi-department support (Sales, HR, Inventory, Finance), multi-step approval workflows, detailed audit logs, and role permissions.",
      requirements: [
        "Multi-department navigation (Finance, HR, Inventory, Operations)",
        "Multi-step approval workflow engine (Pending -> Approved / Rejected)",
        "Audit log ledger recording every user action with timestamps",
        "Fine-grained enterprise security permission manager"
      ],
      credits: 100
    },
    modules: [
      {
        id: "sem-6-mod-1",
        number: 1,
        title: "Enterprise Products",
        description: "Vertical enterprise application architectures.",
        topics: [
          { id: "t-6-1-1", number: 1, title: "Hospital Management", description: "Patient records, appointment queues, doctor scheduling, and HIPAA security.", content: { overview: "Architect healthcare platforms managing electronic health records (EHR) with strict HIPAA privacy compliance.", keyTakeaways: ["Encrypt patient data at rest and in transit.", "Enforce strict record access auditing."] }, summary: "Build compliant healthcare systems managing patient electronic records.", keyTerms: [{ term: "HIPAA", definition: "Health Insurance Portability and Accountability Act ensuring medical data privacy." }] },
          { id: "t-6-1-2", number: 2, title: "Banking", description: "Transaction processing, account ledgers, audit trails, and fraud alerts.", content: { overview: "Construct financial ledger systems ensuring ACID transaction guarantees and real-time fraud monitoring.", keyTakeaways: ["Use double-entry accounting ledger tables.", "Enforce atomic database transactions."] }, summary: "Engineer financial ledger systems with ACID transaction safety.", keyTerms: [{ term: "ACID", definition: "Atomicity, Consistency, Isolation, Durability guarantees for database transactions." }] },
          { id: "t-6-1-3", number: 3, title: "Logistics", description: "Fleet tracking, shipment routing, warehouse management, and delivery updates.", content: { overview: "Manage global supply chain logistics tracking package status, warehouse inventory, and carrier routes.", keyTakeaways: ["Display real-time GPS tracking maps.", "Optimize delivery routing."] }, summary: "Manage supply chain logistics with real-time tracking.", keyTerms: [{ term: "Supply Chain Logistics", definition: "Managing goods movement from manufacture to final delivery." }] },
          { id: "t-6-1-4", number: 4, title: "Manufacturing", description: "Production line tracking, bill of materials (BOM), and quality control.", content: { overview: "Track factory production schedules, component inventory lists, and quality assurance inspections.", keyTakeaways: ["Maintain bill of materials records.", "Track equipment maintenance schedules."] }, summary: "Track manufacturing assembly lines and component inventories.", keyTerms: [{ term: "BOM", definition: "Bill of Materials listing raw items required to build a product." }] }
        ]
      },
      {
        id: "sem-6-mod-2",
        number: 2,
        title: "Workflow Automation",
        description: "Business process engines and multi-level approval systems.",
        topics: [
          { id: "t-6-2-1", number: 1, title: "Business Processes", description: "State machines, workflow diagrams, and automated step progression.", content: { overview: "Model complex business processes as explicit state machines with predefined transition rules.", keyTakeaways: ["Use finite state machine libraries (XState).", "Enforce valid state transition rules."] }, summary: "Model business process workflows using explicit state machines.", keyTerms: [{ term: "State Machine", definition: "Behavioral model consisting of finite states and valid transitions." }] },
          { id: "t-6-2-2", number: 2, title: "Approvals", description: "Multi-level sign-off workflows, delegation rules, and escalation paths.", content: { overview: "Build multi-tier approval chains requiring manager and finance sign-offs before purchase execution.", keyTakeaways: ["Handle approval delegation when managers are away.", "Record sign-off timestamps."] }, summary: "Construct multi-tier approval chains with escalation rules.", keyTerms: [{ term: "Approval Chain", definition: "Sequential sign-offs required before an action takes effect." }] },
          { id: "t-6-2-3", number: 3, title: "Notifications", description: "Slack/Teams webhooks, SMS alerts, and email notifications.", content: { overview: "Trigger cross-platform notifications to Slack, Microsoft Teams, and email when key workflow events occur.", keyTakeaways: ["Send webhooks to company Slack channels.", "Format notification payload previews crisp and clear."] }, summary: "Send real-time event webhooks to Slack and Microsoft Teams.", keyTerms: [{ term: "Webhook Integration", definition: "Pushing event payloads to third-party messaging services." }] },
          { id: "t-6-2-4", number: 4, title: "Task Management", description: "Task assignment, SLA deadline tracking, and escalation policies.", content: { overview: "Assign work items with Service Level Agreement (SLA) timers that escalate automatically if overdue.", keyTakeaways: ["Calculate SLA deadline countdowns.", "Escalate unassigned or stale tasks."] }, summary: "Track SLA deadlines and auto-escalate overdue task assignments.", keyTerms: [{ term: "SLA", definition: "Service Level Agreement defining deadline performance metrics." }] }
        ]
      },
      {
        id: "sem-6-mod-3",
        number: 3,
        title: "Collaboration",
        description: "Real-time team workspaces and activity streams.",
        topics: [
          { id: "t-6-3-1", number: 1, title: "Teams", description: "Department groupings, team workspaces, and resource sharing.", content: { overview: "Group organization members into functional departments (Sales, Engineering, Product) with shared resources.", keyTakeaways: ["Scope assets to specific team workspaces.", "Allow cross-team sharing permissions."] }, summary: "Organize users into department workspaces with shared assets.", keyTerms: [{ term: "Team Workspace", definition: "Dedicated workspace for a specific group or department." }] },
          { id: "t-6-3-2", number: 2, title: "Shared Workspaces", description: "Multi-user live editing, presence indicators, and state sync.", content: { overview: "Enable multi-user collaboration with live cursor presence and real-time state synchronization.", keyTakeaways: ["Use WebSockets or Liveblocks for real-time presence.", "Display user avatar badges on active documents."] }, summary: "Enable real-time multi-user document collaboration with live presence.", keyTerms: [{ term: "Live Presence", definition: "Displaying real-time cursor positions and active user avatars." }] },
          { id: "t-6-3-3", number: 3, title: "Comments", description: "Threaded discussion comments, @mentions, and resolution status.", content: { overview: "Add inline threaded comments allowing teammates to discuss documents and tag colleagues with @mentions.", keyTakeaways: ["Support markdown formatting in comment text.", "Notify users when tagged with @mentions."] }, summary: "Implement threaded comments and user @mentions.", keyTerms: [{ term: "Threaded Discussion", definition: "Nested conversation replies linked to a specific item." }] },
          { id: "t-6-3-4", number: 4, title: "Activity Logs", description: "Audit history feeds, user timeline views, and revision diffs.", content: { overview: "Maintain detailed visual activity feeds recording who modified what, when, and from which IP.", keyTakeaways: ["Store immutable activity event records.", "Provide searchable timeline feeds."] }, summary: "Track visual timeline activity feeds of user modifications.", keyTerms: [{ term: "Activity Stream", definition: "Chronological log showing recent team actions." }] }
        ]
      },
      {
        id: "sem-6-mod-4",
        number: 4,
        title: "Enterprise Security",
        description: "Hardening enterprise security, audit logging, and compliance.",
        topics: [
          { id: "t-6-4-1", number: 1, title: "User Roles", description: "Custom permission matrices and enterprise SSO (SAML/Okta).", content: { overview: "Integrate Enterprise Single Sign-On (SSO) using SAML 2.0 and Okta / Azure AD providers.", keyTakeaways: ["Support SAML 2.0 authentication assertions.", "Map Enterprise IDP groups to app roles."] }, summary: "Integrate Enterprise SAML 2.0 Single Sign-On (SSO) with Okta.", keyTerms: [{ term: "SAML 2.0", definition: "Enterprise standard protocol for Single Sign-On authentication." }] },
          { id: "t-6-4-2", number: 2, title: "Permissions", description: "Attribute-Based Access Control (ABAC) and resource-level locks.", content: { overview: "Enforce ABAC policy rules considering environmental factors like IP location and time of day.", keyTakeaways: ["Restrict sensitive operations to corporate IP ranges.", "Implement step-up MFA for critical actions."] }, summary: "Enforce Attribute-Based Access Control policies and step-up MFA.", keyTerms: [{ term: "ABAC", definition: "Attribute-Based Access Control evaluating user, resource, and context attributes." }] },
          { id: "t-6-4-3", number: 3, title: "Data Protection", description: "Field-level encryption, SOC 2 compliance, and backup retention.", content: { overview: "Protect sensitive data with AES-256 field encryption and automated database backup schedules.", keyTakeaways: ["Encrypt PII (Personally Identifiable Information) in DB.", "Test disaster recovery restore scripts."] }, summary: "Implement AES-256 field encryption and SOC 2 data protection.", keyTerms: [{ term: "AES-256", definition: "Symmetric key encryption standard for protecting sensitive data." }] },
          { id: "t-6-4-4", number: 4, title: "Audit Logs", description: "Immutable security event ledgers and SIEM integration.", content: { overview: "Write immutable security audit logs tracking authentication attempts, permission changes, and data exports.", keyTakeaways: ["Export security logs to SIEM systems (Datadog, Splunk).", "Prevent alteration of audit records."] }, summary: "Record immutable security audit logs for compliance auditing.", keyTerms: [{ term: "Immutable Audit Log", definition: "Tamper-proof record of system and security events." }] }
        ]
      }
    ]
  },

  // SEMESTER 7
  {
    id: "sem-7",
    number: 7,
    title: "Industry Projects",
    description: "Work on real-world client requirements using AI pair programming, team vibe coding, rigorous quality assurance, and production delivery.",
    subtitle: "Real client specs, team vibe coding, automated QA testing, and client delivery.",
    creditsRequired: 100,
    project: {
      id: "proj-7",
      title: "Industry Client Project",
      description: "Deliver a full-fledged client project based on real industry requirements, featuring sprint planning, AI pair coding, comprehensive QA test validation, and live production deployment.",
      requirements: [
        "Comprehensive client requirement breakdown & sprint roadmap",
        "Team Vibe Coding repository with clean commit history",
        "Passing QA test suite (Unit, Integration, and E2E)",
        "Live production client deployment with custom domain"
      ],
      credits: 100
    },
    modules: [
      {
        id: "sem-7-mod-1",
        number: 1,
        title: "Real Client Requirements",
        description: "Analyzing, estimating, and planning client deliverables.",
        topics: [
          { id: "t-7-1-1", number: 1, title: "Requirement Analysis", description: "Deconstructing client specs, identifying risks, and scope negotiation.", content: { overview: "Transform ambiguous client briefs into precise technical requirements and feature specifications.", keyTakeaways: ["Clarify implicit assumptions with clients early.", "Document technical constraints explicitly."] }, summary: "Translate client project briefs into actionable technical specifications.", keyTerms: [{ term: "Technical Spec", definition: "Detailed document outlining implementation architecture and scope." }] },
          { id: "t-7-1-2", number: 2, title: "Feature Planning", description: "User story mapping, task breakdown, and technical estimation.", content: { overview: "Decompose requirements into user stories with clear acceptance criteria and effort estimates.", keyTakeaways: ["Define explicit 'Definition of Done'.", "Break large tasks into sub-4-hour work items."] }, summary: "Decompose client requirements into story tasks with acceptance criteria.", keyTerms: [{ term: "Acceptance Criteria", definition: "Conditions that a software solution must meet to be accepted by the client." }] },
          { id: "t-7-1-3", number: 3, title: "Sprint Planning", description: "Agile sprints, milestone goals, and delivery schedules.", content: { overview: "Organize development into 1-week focused sprints to ensure steady progress and visible client demos.", keyTakeaways: ["Commit to realistic sprint velocity.", "Conduct weekly client progress review demos."] }, summary: "Plan weekly agile sprints with regular client demonstration milestones.", keyTerms: [{ term: "Agile Sprint", definition: "Time-boxed period during which specific work is completed." }] }
        ]
      },
      {
        id: "sem-7-mod-2",
        number: 2,
        title: "Team Vibe Coding",
        description: "Collaborative AI-assisted coding across engineering teams.",
        topics: [
          { id: "t-7-2-1", number: 1, title: "AI Pair Programming", description: "Collaborative prompt workflows, driver/navigator roles with AI.", content: { overview: "Practice dual-developer pairing where one engineer prompts AI while the other reviews logic and architecture.", keyTakeaways: ["Alternate driver and reviewer roles.", "Synthesize prompt ideas before execution."] }, summary: "Execute AI pair programming pairing driver prompt engineering with architectural review.", keyTerms: [{ term: "Pair Prompting", definition: "Two engineers collaborating to craft and evaluate AI prompts." }] },
          { id: "t-7-2-2", number: 2, title: "Collaboration", description: "Shared Git branching strategies, pull requests, and conflict resolution.", content: { overview: "Maintain clean Git branch workflows (feature branches, main protection, squash merges).", keyTakeaways: ["Create feature branches named feature/short-name.", "Require PR reviews before merging."] }, summary: "Maintain structured Git feature branch workflows and PR reviews.", keyTerms: [{ term: "Feature Branching", definition: "Isolated Git branch dedicated to developing a single feature." }] },
          { id: "t-7-2-3", number: 3, title: "Version Control", description: "Conventional commits, release tagging, and changelog generation.", content: { overview: "Write standardized commit messages enabling automated semantic versioning and release notes.", keyTakeaways: ["Use conventional commit prefixes (feat:, fix:, docs:).", "Tag release commits (v1.0.0)."] }, summary: "Enforce conventional commit standards for automated changelogs.", keyTerms: [{ term: "Conventional Commits", definition: "Standardized format for commit messages guiding automated versioning." }] },
          { id: "t-7-2-4", number: 4, title: "Reviews", description: "AI-assisted code reviews, security scanning, and style checks.", content: { overview: "Automate code pull request reviews checking for code smells, security bugs, and performance bottlenecks.", keyTakeaways: ["Use automated PR review bots.", "Ensure code formatting consistency."] }, summary: "Automate pull request code reviews for security and quality.", keyTerms: [{ term: "PR Review Bot", definition: "Automated AI bot analyzing pull requests for bugs and style issues." }] }
        ]
      },
      {
        id: "sem-7-mod-3",
        number: 3,
        title: "Quality Assurance",
        description: "Rigorously validating functionality, performance, and accessibility.",
        topics: [
          { id: "t-7-3-1", number: 1, title: "Functional Validation", description: "Comprehensive test cases, regression testing, and bug verification.", content: { overview: "Execute thorough test passes verifying all client acceptance criteria are 100% satisfied.", keyTakeaways: ["Test happy paths and edge failure scenarios.", "Verify data persistence across restarts."] }, summary: "Verify client acceptance criteria across all user workflows.", keyTerms: [{ term: "Regression Testing", definition: "Verifying recent code changes haven't broken existing functionality." }] },
          { id: "t-7-3-2", number: 2, title: "UI Validation", description: "Visual regression testing, responsive view inspection, and cross-browser testing.", content: { overview: "Check application layouts across Safari, Chrome, Firefox, iOS, and Android screens.", keyTakeaways: ["Run automated visual screenshot diff tests.", "Fix layout overflows on small mobile screens."] }, summary: "Ensure flawless layout rendering across all browsers and devices.", keyTerms: [{ term: "Visual Regression", definition: "Detecting unintended visual changes in UI layout rendering." }] },
          { id: "t-7-3-3", number: 3, title: "Accessibility", description: "Lighthouse audits, screen reader testing, and keyboard navigation checks.", content: { overview: "Achieve 95+ Lighthouse accessibility scores by verifying ARIA standards and keyboard focus states.", keyTakeaways: ["Run automated Lighthouse audits.", "Ensure screen readers announce dynamic state changes."] }, summary: "Achieve top Lighthouse accessibility scores with keyboard accessibility.", keyTerms: [{ term: "Lighthouse Score", definition: "Automated Google audit measuring web page quality and performance." }] },
          { id: "t-7-3-4", number: 4, title: "Performance", description: "Core Web Vitals optimization, bundle size reduction, and asset caching.", content: { overview: "Optimize page load times (LCP < 2.5s, FID < 100ms) by code splitting and optimizing images.", keyTakeaways: ["Lazy load non-critical React components.", "Compress and serve WebP images."] }, summary: "Optimize Core Web Vitals for lightning-fast user experience.", keyTerms: [{ term: "Core Web Vitals", definition: "Google metrics measuring page speed, responsiveness, and visual stability." }] }
        ]
      },
      {
        id: "sem-7-mod-4",
        number: 4,
        title: "Product Delivery",
        description: "Handing off production software to clients with full documentation.",
        topics: [
          { id: "t-7-4-1", number: 1, title: "Deployment", description: "Production release, DNS cutover, and client domain activation.", content: { overview: "Execute seamless production cutover launching the live client domain with SSL encryption.", keyTakeaways: ["Perform DNS cutover during low-traffic hours.", "Verify environment configuration variables."] }, summary: "Execute live production domain launch with SSL encryption.", keyTerms: [{ term: "Production Cutover", definition: "Final transition from staging environment to live client domain." }] },
          { id: "t-7-4-2", number: 2, title: "Monitoring", description: "Production telemetry, error alert channels, and uptime SLAs.", content: { overview: "Set up real-time monitoring channels alerting the team immediately if any production errors occur.", keyTakeaways: ["Configure 24/7 uptime ping monitors.", "Route critical alerts directly to team channels."] }, summary: "Establish 24/7 production uptime monitoring and alert channels.", keyTerms: [{ term: "Production Telemetry", definition: "Real-time metrics tracking server health and error rates." }] },
          { id: "t-7-4-3", number: 3, title: "Maintenance", description: "SLA support, patch updates, and dependency maintenance.", content: { overview: "Provide ongoing maintenance plans updating dependencies safely and patching security CVEs.", keyTakeaways: ["Schedule monthly dependency security updates.", "Maintain patch release branches."] }, summary: "Maintain long-term software health through regular dependency updates.", keyTerms: [{ term: "Maintenance Plan", definition: "Structured ongoing support servicing production applications." }] },
          { id: "t-7-4-4", number: 4, title: "User Feedback", description: "Client sign-off, user onboarding feedback, and feature iteration.", content: { overview: "Conduct formal client handoff demos, collect user feedback, and document v2 feature recommendations.", keyTakeaways: ["Obtain formal client sign-off acceptance.", "Deliver comprehensive admin and user guide docs."] }, summary: "Complete client handoff sign-off and deliver user documentation.", keyTerms: [{ term: "Client Handoff", definition: "Formal delivery of final code, documentation, and live access to the client." }] }
        ]
      }
    ]
  },

  // SEMESTER 8
  {
    id: "sem-8",
    number: 8,
    title: "Career & Hiring",
    description: "Complete your production Capstone Project, showcase your verified portfolio, prepare for technical interviews, and match with hiring companies.",
    subtitle: "Capstone product completion, verified project portfolio, career readiness, and direct HR company matching.",
    creditsRequired: 100,
    project: {
      id: "proj-8",
      title: "Production-ready application evaluated by AI and showcased to employers",
      description: "Build, launch, and showcase a flagship production application evaluated end-to-end by AI, featuring live URL demo, public GitHub repo, video walkthrough, and employer showcase listing.",
      requirements: [
        "Live production application hosted with custom domain name",
        "Public GitHub repository with comprehensive README, setup instructions, and architecture diagrams",
        "Interactive video walkthrough demonstrating core user flows and technical features",
        "Verified AI Evaluation Score above 90% for security, performance, and code quality"
      ],
      credits: 100
    },
    modules: [
      {
        id: "sem-8-mod-1",
        number: 1,
        title: "Capstone Project",
        description: "Executing your flagship end-to-end production product.",
        topics: [
          { id: "t-8-1-1", number: 1, title: "End-to-End Product Development", description: "Designing and building a flagship software product from concept to production.", content: { overview: "Synthesize all skills learned across 8 semesters to build a complete, polished flagship application.", keyTakeaways: ["Solve a substantial real-world problem.", "Ensure exceptional visual design, code quality, and security."] }, summary: "Construct a polished flagship application showcasing end-to-end mastery.", keyTerms: [{ term: "Capstone Product", definition: "Flagship project demonstrating cumulative software engineering competence." }] },
          { id: "t-8-1-2", number: 2, title: "AI Validation", description: "Automated AI code evaluation, security scoring, and performance benchmark.", content: { overview: "Submit your capstone codebase to automated AI grading engines evaluating code cleanliness, test coverage, and security.", keyTakeaways: ["Achieve 90%+ AI quality score.", "Address all flagged security vulnerabilities."] }, summary: "Pass comprehensive automated AI code and security evaluation.", keyTerms: [{ term: "AI Evaluation Score", definition: "Automated score measuring codebase security, performance, and architecture." }] },
          { id: "t-8-1-3", number: 3, title: "Industry Review", description: "Expert mentor review, code feedback, and production sign-off.", content: { overview: "Present your capstone project to senior engineering mentors for real-world architectural feedback.", keyTakeaways: ["Incorporate mentor architectural suggestions.", "Prepare a polished presentation deck."] }, summary: "Receive real-world feedback from senior industry engineering mentors.", keyTerms: [{ term: "Industry Review", definition: "Evaluation conducted by experienced industry software architects." }] }
        ]
      },
      {
        id: "sem-8-mod-2",
        number: 2,
        title: "Portfolio",
        description: "Crafting a verified, high-impact developer portfolio.",
        topics: [
          { id: "t-8-2-1", number: 1, title: "Verified Projects", description: "Displaying verified semester projects with proof of completion.", content: { overview: "Showcase your 8 verified semester projects complete with live demo links and verified credit scores.", keyTakeaways: ["Include live clickable project preview links.", "Display earned credit badges."] }, summary: "Display verified semester projects with live links and earned credit badges.", keyTerms: [{ term: "Verified Project", definition: "Project verified by automated AI evaluation and mentor review." }] },
          { id: "t-8-2-2", number: 2, title: "Live Demonstrations", description: "Embedding interactive demos, video walkthroughs, and architecture diagrams.", content: { overview: "Enhance portfolio project cards with interactive video demos and architecture flowcharts.", keyTakeaways: ["Record 2-minute video walkthroughs.", "Include clear system architecture diagrams."] }, summary: "Engage recruiters with video walkthroughs and system diagrams.", keyTerms: [{ term: "Video Walkthrough", definition: "Concise video demonstration explaining application features and tech stack." }] },
          { id: "t-8-2-3", number: 3, title: "Documentation", description: "Writing professional GitHub README files, setup guides, and API docs.", content: { overview: "Craft clean, comprehensive GitHub README files that impress hiring managers immediately.", keyTakeaways: ["Include screenshot GIFs and badges.", "Provide 1-step local setup instructions."] }, summary: "Craft comprehensive GitHub README documentation with setup guides.", keyTerms: [{ term: "GitHub README", definition: "Primary documentation file introducing a codebase on GitHub." }] },
          { id: "t-8-2-4", number: 4, title: "Product Showcase", description: "Listing your product on Prime Wave employer discovery marketplace.", content: { overview: "Publish your verified portfolio to the Prime Wave hiring marketplace visible to vetted company recruiters.", keyTakeaways: ["Highlight core technical skills.", "Display your AI Job Readiness Score."] }, summary: "Publish your verified portfolio to the employer hiring marketplace.", keyTerms: [{ term: "Employer Marketplace", definition: "Platform connecting vetted candidates directly with hiring companies." }] }
        ]
      },
      {
        id: "sem-8-mod-3",
        number: 3,
        title: "Career Readiness",
        description: "Mastering technical interviews, resume building, and communication.",
        topics: [
          { id: "t-8-3-1", number: 1, title: "Resume", description: "AI-optimized resume building, impact bullet points, and ATS keywords.", content: { overview: "Format your resume to pass automated Applicant Tracking Systems (ATS) with quantifiable impact metrics.", keyTakeaways: ["Use action verbs and quantifiable results (e.g. 'Improved speed by 40%').", "Format standard ATS-friendly templates."] }, summary: "Craft an ATS-optimized resume featuring quantifiable project achievements.", keyTerms: [{ term: "ATS Optimization", definition: "Formatting resumes to parse cleanly through recruiter software." }] },
          { id: "t-8-3-2", number: 2, title: "Portfolio", description: "Custom domain portfolio website setup and personal branding.", content: { overview: "Launch your personal portfolio website showcasing your story, stack, projects, and contact links.", keyTakeaways: ["Use custom domain (e.g. alexdev.com).", "Ensure mobile responsiveness and fast page speed."] }, summary: "Launch a personal portfolio website with custom domain branding.", keyTerms: [{ term: "Personal Brand", definition: "Professional online presence highlighting developer identity and work." }] },
          { id: "t-8-3-3", number: 3, title: "Interview Preparation", description: "Mock AI technical interviews, coding challenges, and system design Q&A.", content: { overview: "Practice real-time technical interviews with AI mock interviewers testing data structures and system design.", keyTakeaways: ["Explain architectural decisions out loud clearly.", "Structure answers using the STAR method."] }, summary: "Master technical coding and system design interviews with AI mock sessions.", keyTerms: [{ term: "Mock Interview", definition: "Simulated interview practice session evaluating technical performance." }] },
          { id: "t-8-3-4", number: 4, title: "Communication", description: "Technical articulation, team collaboration, and salary negotiation.", content: { overview: "Master soft skills: communicating complex ideas simply, collaborating effectively, and negotiating job offers.", keyTakeaways: ["Articulate technical trade-offs confidently.", "Understand equity, benefits, and salary components."] }, summary: "Articulate technical concepts clearly and negotiate job offers confidently.", keyTerms: [{ term: "Offer Negotiation", definition: "Discussing compensation terms to secure competitive salary and benefits." }] }
        ]
      },
      {
        id: "sem-8-mod-4",
        number: 4,
        title: "Hiring Platform",
        description: "Direct connection with top companies and hiring managers.",
        topics: [
          { id: "t-8-4-1", number: 1, title: "Job Readiness Score", description: "Calculating your comprehensive readiness score based on project credits.", content: { overview: "Track your overall Job Readiness Score calculated from completed topics, projects, and AI evals.", keyTakeaways: ["Score > 85 unlocks direct HR shortlisting.", "View detailed breakdown across technical dimensions."] }, summary: "Track your overall Job Readiness Score based on verified semester credits.", keyTerms: [{ term: "Job Readiness Score", definition: "Metric reflecting candidate readiness for hiring companies." }] },
          { id: "t-8-4-2", number: 2, title: "AI Evaluation Report", description: "Generating verified skills report for employers.", content: { overview: "Generate an official, shareable AI Evaluation Report certifying your code quality and problem-solving skills.", keyTakeaways: ["Download official PDF skills report.", "Share verified link with hiring managers."] }, summary: "Generate official certified AI Evaluation Reports for employers.", keyTerms: [{ term: "Evaluation Report", definition: "Certified transcript documenting verified technical competencies." }] },
          { id: "t-8-4-3", number: 3, title: "Company Discovery", description: "Browsing hiring partners, salary ranges, and technical stacks.", content: { overview: "Explore actively hiring company profiles, tech stacks, open engineering roles, and compensation packages.", keyTakeaways: ["Filter companies by remote/on-site and technology stack.", "Apply directly with 1-click verified profile."] }, summary: "Discover active hiring companies matching your tech stack preferences.", keyTerms: [{ term: "Company Discovery", definition: "Browsing hiring partner profiles and open engineering positions." }] },
          { id: "t-8-4-4", number: 4, title: "HR Shortlisting", description: "Direct recruiter contact, interview invites, and offer tracking.", content: { overview: "Receive direct interview invitations from top tech company HR managers based on your top readiness score.", keyTakeaways: ["Track incoming recruiter interview requests.", "Accept interview invites directly within Prime Wave."] }, summary: "Receive direct interview requests from HR hiring managers.", keyTerms: [{ term: "HR Shortlisting", definition: "Recruiters directly selecting top candidates for interviews." }] }
        ]
      }
    ]
  }
];
