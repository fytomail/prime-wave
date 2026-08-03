import { ASSIGNMENTS_DATA, Assignment, SemesterAssignmentsGroup } from './assignments-data';
import { isSemesterUnlocked } from './roadmap-store';

export interface AssignmentSubmission {
  assignmentId: string;
  semesterNumber: number;
  assignmentNumber: number;
  imageUrl?: string;
  urlLink: string;
  notes?: string;
  score: number;
  status: 'passed' | 'submitted' | 'pending';
  feedback: string;
  submittedAt: string;
  creditsEarned: number;
}

const ASSIGNMENTS_STORAGE_KEY = 'primewave_assignments_progress_v2';

interface AssignmentsStorageData {
  completedAssignments: string[]; // array of assignment IDs e.g. ['asg-1-1']
  submissions: Record<string, AssignmentSubmission>; // mapping assignmentId -> submission
}

function loadAssignmentsStorage(): AssignmentsStorageData {
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load assignments storage:', e);
  }
  return {
    completedAssignments: [],
    submissions: {}
  };
}

function saveAssignmentsStorage(data: AssignmentsStorageData) {
  try {
    localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('assignments-progress-updated'));
  } catch (e) {
    console.error('Failed to save assignments storage:', e);
  }
}

// CHECK IF ASSIGNMENT IS COMPLETED
export function isAssignmentCompleted(assignmentId: string): boolean {
  const data = loadAssignmentsStorage();
  return data.completedAssignments.includes(assignmentId);
}

// CHECK IF ASSIGNMENT IS UNLOCKED
export function isAssignmentUnlocked(semesterNum: number, assignmentNum: number, assignmentId: string): boolean {
  // Semester 1 assignments level 1 is unlocked initially for first-time joining students
  if (!isSemesterUnlocked(semesterNum)) {
    return false;
  }

  // Assignment 1 of an unlocked semester is always unlocked
  if (assignmentNum === 1) {
    return true;
  }

  // Assignment N is unlocked if Assignment N-1 in the same semester is completed
  const group = ASSIGNMENTS_DATA.find(g => g.semesterNumber === semesterNum);
  if (!group) return false;

  const prevAsg = group.assignments.find(a => a.assignmentNumber === assignmentNum - 1);
  if (!prevAsg) return false;

  return isAssignmentCompleted(prevAsg.id);
}

// GET SUBMISSION
export function getAssignmentSubmission(assignmentId: string): AssignmentSubmission | null {
  const data = loadAssignmentsStorage();
  return data.submissions[assignmentId] || null;
}

// SUBMIT ASSIGNMENT ACTION
export function submitAssignmentAction(
  assignmentId: string, 
  payload: { imageUrl?: string; urlLink: string; notes?: string }
): AssignmentSubmission {
  const data = loadAssignmentsStorage();

  // Find assignment details
  let foundAsg: Assignment | null = null;
  for (const group of ASSIGNMENTS_DATA) {
    const a = group.assignments.find(asg => asg.id === assignmentId);
    if (a) {
      foundAsg = a;
      break;
    }
  }

  const semesterNum = foundAsg ? foundAsg.semesterNumber : 1;
  const assignmentNum = foundAsg ? foundAsg.assignmentNumber : 1;
  const credits = foundAsg ? foundAsg.creditsAwarded : 50;

  // AI Evaluation Simulation
  const simulatedScore = Math.floor(Math.random() * 11) + 90; // 90 to 100
  const feedback = `Excellent work! Your code architecture and visual design implementation satisfy all ${foundAsg?.requirements.length || 3} assignment requirements. Evaluated score: ${simulatedScore}/100.`;

  const submission: AssignmentSubmission = {
    assignmentId,
    semesterNumber: semesterNum,
    assignmentNumber: assignmentNum,
    imageUrl: payload.imageUrl,
    urlLink: payload.urlLink,
    notes: payload.notes,
    score: simulatedScore,
    status: 'passed',
    feedback,
    submittedAt: new Date().toISOString(),
    creditsEarned: credits
  };

  data.submissions[assignmentId] = submission;
  if (!data.completedAssignments.includes(assignmentId)) {
    data.completedAssignments.push(assignmentId);
  }

  saveAssignmentsStorage(data);
  return submission;
}

// CALCULATE TOTAL EARNED CREDITS FROM ASSIGNMENTS
export function getTotalAssignmentCredits(): number {
  const data = loadAssignmentsStorage();
  let total = 0;
  Object.values(data.submissions).forEach(sub => {
    if (sub.status === 'passed') {
      total += sub.creditsEarned;
    }
  });
  return total;
}
