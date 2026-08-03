export interface StudentFeedbackItem {
  id: string;
  studentName: string;
  universityName: string;
  description: string;
  rating: number; // 1 to 5 stars
  category: string;
  createdAt: string;
  status: 'Received' | 'Reviewed' | 'Approved';
}

const FEEDBACK_STORAGE_KEY = 'primewave_student_feedbacks_v2';

const DEFAULT_FEEDBACKS: StudentFeedbackItem[] = [
  {
    id: 'fb-1',
    studentName: 'Santhosh M',
    universityName: 'Anna University',
    description: 'The AI-assisted vibe coding modules and real-time AI tutor assistant in Semester 1 helped me build my first landing page in hours! Highly recommended platform.',
    rating: 5,
    category: 'Learning Roadmap',
    createdAt: '2026-08-01',
    status: 'Reviewed'
  },
  {
    id: 'fb-2',
    studentName: 'Priya Sharma',
    universityName: 'SRM Institute of Science and Technology',
    description: 'Great platform! The interactive assignments and project evaluation system gave instant feedback on code quality and security standards.',
    rating: 5,
    category: 'Assignments & Projects',
    createdAt: '2026-08-02',
    status: 'Received'
  },
  {
    id: 'fb-3',
    studentName: 'Karthik Raja',
    universityName: 'Vellore Institute of Technology (VIT)',
    description: 'The 8-Semester roadmap structure is well organized. Building enterprise ERP products with role-based access control was very practical.',
    rating: 4,
    category: 'Enterprise Curriculum',
    createdAt: '2026-08-03',
    status: 'Received'
  }
];

function loadFeedbacks(): StudentFeedbackItem[] {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load feedbacks from localStorage:', e);
  }
  return DEFAULT_FEEDBACKS;
}

function saveFeedbacks(items: StudentFeedbackItem[]) {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('student-feedback-updated'));
  } catch (e) {
    console.error('Failed to save feedbacks:', e);
  }
}

export function getStudentFeedbacks(): StudentFeedbackItem[] {
  return loadFeedbacks();
}

export function addStudentFeedback(payload: {
  studentName: string;
  universityName: string;
  description: string;
  rating: number;
  category?: string;
}): StudentFeedbackItem {
  const current = loadFeedbacks();

  const newFeedback: StudentFeedbackItem = {
    id: `fb-${Date.now()}`,
    studentName: payload.studentName,
    universityName: payload.universityName,
    description: payload.description,
    rating: payload.rating,
    category: payload.category || 'General Platform',
    createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    status: 'Received'
  };

  const updated = [newFeedback, ...current];
  saveFeedbacks(updated);
  return newFeedback;
}
