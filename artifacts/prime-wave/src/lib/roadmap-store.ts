import { ROADMAP_DATA, Semester, Module, Topic } from './roadmap-data';

export interface ProjectSubmission {
  semesterId: string;
  projectTitle: string;
  repoUrl: string;
  demoUrl?: string;
  notes?: string;
  submittedAt: string;
  creditsAwarded: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const STORAGE_KEY = 'primewave_roadmap_progress_v2';

interface RoadmapStorageData {
  completedTopics: string[];
  completedProjects: string[];
  submittedProjects: Record<string, ProjectSubmission>;
  topicNotes: Record<string, string>;
  chatHistories: Record<string, ChatMessage[]>;
}

function loadStorage(): RoadmapStorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load roadmap progress from localStorage:', e);
  }
  return {
    completedTopics: [],
    completedProjects: [],
    submittedProjects: {},
    topicNotes: {},
    chatHistories: {}
  };
}

function saveStorage(data: RoadmapStorageData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch custom window event so all components re-render immediately
    window.dispatchEvent(new Event('roadmap-progress-updated'));
  } catch (e) {
    console.error('Failed to save roadmap progress:', e);
  }
}

// TOPIC COMPLETION API
export function isTopicCompleted(topicId: string): boolean {
  const data = loadStorage();
  return data.completedTopics.includes(topicId);
}

export function completeTopicAction(topicId: string): { newUnlockedTopic?: Topic; creditsEarned: number } {
  const data = loadStorage();
  let creditsEarned = 0;
  if (!data.completedTopics.includes(topicId)) {
    data.completedTopics.push(topicId);
    creditsEarned = 20;
    saveStorage(data);
  }
  return { creditsEarned };
}

// TOPIC UNLOCKING RULES
export function isTopicUnlocked(semesterNum: number, moduleNum: number, topicNum: number, topicId: string): boolean {
  // Check if module is unlocked first
  if (!isModuleUnlocked(semesterNum, moduleNum)) {
    return false;
  }
  
  // Topic 1 of an unlocked module is always unlocked
  if (topicNum === 1) {
    return true;
  }

  // Otherwise, check if previous topic in same module is completed
  const semester = ROADMAP_DATA.find(s => s.number === semesterNum);
  if (!semester) return false;
  const mod = semester.modules.find(m => m.number === moduleNum);
  if (!mod) return false;

  const prevTopic = mod.topics.find(t => t.number === topicNum - 1);
  if (!prevTopic) return false;

  return isTopicCompleted(prevTopic.id);
}

// MODULE COMPLETION & UNLOCKING RULES
export function isModuleCompleted(semesterNum: number, moduleNum: number): boolean {
  const semester = ROADMAP_DATA.find(s => s.number === semesterNum);
  if (!semester) return false;
  const mod = semester.modules.find(m => m.number === moduleNum);
  if (!mod) return false;

  return mod.topics.every(t => isTopicCompleted(t.id));
}

export function isModuleUnlocked(semesterNum: number, moduleNum: number): boolean {
  // Check if semester is unlocked first
  if (!isSemesterUnlocked(semesterNum)) {
    return false;
  }

  // Module 1 of an unlocked semester is always unlocked
  if (moduleNum === 1) {
    return true;
  }

  // Otherwise, check if previous module in the same semester is completed
  return isModuleCompleted(semesterNum, moduleNum - 1);
}

// SEMESTER COMPLETION & UNLOCKING RULES
export function isSemesterCompleted(semesterNum: number): boolean {
  const data = loadStorage();
  const semId = `sem-${semesterNum}`;
  
  // A semester is completed if project is submitted OR all modules are completed
  const isProjectDone = data.completedProjects.includes(semId);
  const semester = ROADMAP_DATA.find(s => s.number === semesterNum);
  if (!semester) return false;

  const allModulesDone = semester.modules.every(m => isModuleCompleted(semesterNum, m.number));

  return isProjectDone || allModulesDone;
}

export function isSemesterUnlocked(semesterNum: number): boolean {
  // Semester 1 is ALWAYS unlocked for first-time joining students
  if (semesterNum === 1) {
    return true;
  }

  // Semester N is unlocked if Semester N-1 is completed
  return isSemesterCompleted(semesterNum - 1);
}

// SEMESTER PROJECT SUBMISSION
export function submitProjectAction(semesterId: string, payload: { repoUrl: string; demoUrl?: string; notes?: string }): ProjectSubmission {
  const data = loadStorage();
  const semester = ROADMAP_DATA.find(s => s.id === semesterId);
  const projectTitle = semester ? semester.project.title : 'Semester Project';
  const credits = semester ? semester.project.credits : 100;

  const submission: ProjectSubmission = {
    semesterId,
    projectTitle,
    repoUrl: payload.repoUrl,
    demoUrl: payload.demoUrl,
    notes: payload.notes,
    submittedAt: new Date().toISOString(),
    creditsAwarded: credits
  };

  data.submittedProjects[semesterId] = submission;
  if (!data.completedProjects.includes(semesterId)) {
    data.completedProjects.push(semesterId);
  }

  saveStorage(data);
  return submission;
}

export function getProjectSubmission(semesterId: string): ProjectSubmission | null {
  const data = loadStorage();
  return data.submittedProjects[semesterId] || null;
}

export function getAllProjectSubmissions(): Record<string, ProjectSubmission> {
  const data = loadStorage();
  return data.submittedProjects || {};
}

// TOPIC NOTES MANAGEMENT
export function getTopicNotes(topicId: string): string {
  const data = loadStorage();
  return data.topicNotes[topicId] || '';
}

export function saveTopicNotes(topicId: string, notes: string): void {
  const data = loadStorage();
  data.topicNotes[topicId] = notes;
  saveStorage(data);
}

// AI CHATBOT MESSAGES PER TOPIC
export function getChatHistory(topicId: string): ChatMessage[] {
  const data = loadStorage();
  if (data.chatHistories[topicId]) {
    return data.chatHistories[topicId];
  }
  
  // Find topic to give personalized welcome message
  let topicTitle = 'this topic';
  for (const s of ROADMAP_DATA) {
    for (const m of s.modules) {
      const t = m.topics.find(top => top.id === topicId);
      if (t) {
        topicTitle = `"${t.title}"`;
        break;
      }
    }
  }

  return [
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `Hello! I am your AI Learning Assistant for ${topicTitle}. Ask me any questions, and I will clarify concepts, provide code examples, or help you debug!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];
}

export function sendChatMessage(topicId: string, userText: string): ChatMessage[] {
  const data = loadStorage();
  const current = data.chatHistories[topicId] || getChatHistory(topicId);

  const userMsg: ChatMessage = {
    id: `msg-user-${Date.now()}`,
    sender: 'user',
    text: userText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  // Find topic context
  let currentTopic: Topic | null = null;
  for (const s of ROADMAP_DATA) {
    for (const m of s.modules) {
      const t = m.topics.find(top => top.id === topicId);
      if (t) {
        currentTopic = t;
        break;
      }
    }
  }

  const responseText = generateSmartAiResponse(userText, currentTopic);

  const aiMsg: ChatMessage = {
    id: `msg-ai-${Date.now()}`,
    sender: 'ai',
    text: responseText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const updated = [...current, userMsg, aiMsg];
  data.chatHistories[topicId] = updated;
  saveStorage(data);
  return updated;
}

function generateSmartAiResponse(query: string, topic: Topic | null): string {
  const q = query.toLowerCase();
  
  if (q.includes('what is') || q.includes('explain') || q.includes('define')) {
    if (topic && topic.content.overview) {
      return `Great question! In ${topic.title}: ${topic.content.overview}\n\nKey Takeaways:\n• ${topic.content.keyTakeaways.join('\n• ')}`;
    }
  }

  if (q.includes('code') || q.includes('example') || q.includes('how to')) {
    if (topic && topic.content.codeSnippet) {
      return `Here is a practical code example for ${topic.title}:\n\n${topic.content.codeSnippet}\n\nThis pattern ensures scalable and clean architecture.`;
    }
  }

  if (q.includes('summary') || q.includes('key takeaway')) {
    if (topic) {
      return `Summary of ${topic.title}:\n${topic.summary}\n\nKey Terms:\n${topic.keyTerms.map(k => `• **${k.term}**: ${k.definition}`).join('\n')}`;
    }
  }

  if (q.includes('unlock') || q.includes('next') || q.includes('complete')) {
    return `To unlock the next topic, click the **Mark as Complete** button at the top right of the page. Once all topics in this module are complete, the next module unlocks automatically!`;
  }

  return `Regarding your question about **${topic ? topic.title : 'this concept'}**: 

${topic?.content.overview || 'AI-assisted development accelerates feature creation through clear context management.'} 

**Pro Tip:** Remember to test your implementations, write type-safe code interfaces, and leverage AI pair programming tools effectively! Feel free to ask if you need further code examples or debugging tips.`;
}

// CALCULATE TOTAL CREDITS EARNED
export function getTotalEarnedCredits(): number {
  const data = loadStorage();
  const topicCredits = data.completedTopics.length * 20;
  
  let projectCredits = 0;
  Object.values(data.submittedProjects).forEach(proj => {
    projectCredits += proj.creditsAwarded;
  });

  return topicCredits + projectCredits;
}

export function resetRoadmapProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('roadmap-progress-updated'));
}
