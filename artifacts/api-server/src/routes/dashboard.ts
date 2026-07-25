import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, studentsTable, certificatesTable, projectsTable, activityTable, jobsTable, companiesTable } from "@workspace/db";
import {
  GetStudentDashboardParams,
  GetHrDashboardParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/dashboard/student/:studentId", async (req, res): Promise<void> => {
  const params = GetStudentDashboardParams.safeParse({ studentId: Number(req.params.studentId) });
  if (!params.success) { res.status(400).json({ error: "Invalid studentId" }); return; }
  const { studentId } = params.data;
  const [student] = await db.select().from(studentsTable).where(eq(studentsTable.id, studentId));
  if (!student) { res.status(404).json({ error: "Not found" }); return; }
  const activities = await db.select().from(activityTable).where(eq(activityTable.studentId, studentId));
  const recentActivity = activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)
    .map(a => ({
      id: a.id, type: a.type, title: a.title, detail: a.detail ?? null,
      score: a.score ?? null,
      timestamp: a.timestamp instanceof Date ? a.timestamp.toISOString() : a.timestamp,
    }));
  const topicsCompleted = activities.filter(a => a.type === "topic_completed").length;
  const assignmentsPassed = activities.filter(a => a.type === "assignment_passed").length;
  res.json({
    studentId: student.id,
    semesterNumber: student.semesterNumber,
    creditsEarned: student.creditsEarned,
    ppsScore: student.ppsScore,
    topicsCompleted,
    modulesCompleted: Math.floor(topicsCompleted / 4),
    assignmentsPassed,
    streakDays: 7,
    industryReadiness: student.industryReadiness,
    nextTopic: "Introduction to System Design",
    nextDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    recentActivity,
    semesterProgress: {
      semesterId: student.semesterNumber,
      studentId: student.id,
      completedModules: Math.floor(topicsCompleted / 4),
      totalModules: 5,
      completedTopics: topicsCompleted,
      totalTopics: 20,
      overallScore: student.ppsScore,
      status: "in_progress",
      creditsEarned: null,
    },
  });
});

router.get("/dashboard/platform", async (req, res): Promise<void> => {
  const students = await db.select().from(studentsTable);
  const companies = await db.select().from(companiesTable);
  const jobs = await db.select().from(jobsTable);
  const certs = await db.select().from(certificatesTable);
  const avgPps = students.length ? students.reduce((s, st) => s + st.ppsScore, 0) / students.length : 0;
  const semMap: Record<number, number> = {};
  students.forEach(s => { semMap[s.semesterNumber] = (semMap[s.semesterNumber] || 0) + 1; });
  const uniMap: Record<string, number> = {};
  students.forEach(s => { const u = s.university || "Unknown"; uniMap[u] = (uniMap[u] || 0) + 1; });
  res.json({
    totalStudents: students.length,
    totalCompanies: companies.length,
    totalJobsPosted: jobs.length,
    avgPpsScore: Math.round(avgPps * 10) / 10,
    totalCertificatesIssued: certs.length,
    placementRate: 0.73,
    totalCreditsAwarded: students.reduce((s, st) => s + st.creditsEarned, 0),
    studentsPerSemester: Object.entries(semMap).map(([sem, count]) => ({ semester: Number(sem), count })),
    topUniversities: Object.entries(uniMap)
      .sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([university, count]) => ({ university, count })),
  });
});

router.get("/dashboard/hr/:companyId", async (req, res): Promise<void> => {
  const params = GetHrDashboardParams.safeParse({ companyId: Number(req.params.companyId) });
  if (!params.success) { res.status(400).json({ error: "Invalid companyId" }); return; }
  const { companyId } = params.data;
  const jobs = await db.select().from(jobsTable).where(eq(jobsTable.companyId, companyId));
  const students = await db.select().from(studentsTable);
  const activeJobs = jobs.filter(j => j.status === "active").length;
  const totalApplicants = jobs.reduce((s, j) => s + j.applicantsCount, 0);
  const [company] = await db.select().from(companiesTable).where(eq(companiesTable.id, companyId));
  const recentCandidates = students
    .sort((a, b) => b.ppsScore - a.ppsScore)
    .slice(0, 5)
    .map(s => ({
      studentId: s.id, studentName: s.name, avatar: s.avatar ?? null,
      university: s.university ?? "Unknown", matchScore: Math.round(s.ppsScore * 0.85),
      ppsScore: s.ppsScore, creditsEarned: s.creditsEarned, semesterNumber: s.semesterNumber,
      industryReadiness: s.industryReadiness, skills: s.skills ?? [],
      githubUrl: null, portfolioUrl: null, skillsMatchPct: 80,
    }));
  res.json({
    companyId, activeJobs, totalApplicants,
    totalHired: company?.hiredCount ?? 0,
    avgMatchScore: 78.5,
    recentCandidates,
  });
});

export default router;
