import { Router } from "express";
import { eq, ilike, or } from "drizzle-orm";
import { db, studentsTable, activityTable } from "@workspace/db";
import {
  ListStudentsQueryParams,
  CreateStudentBody,
  GetStudentParams,
  UpdateStudentParams,
  UpdateStudentBody,
  GetStudentStatsParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/students", async (req, res): Promise<void> => {
  const query = ListStudentsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }
  const { page = 1, limit = 20, search } = query.data;
  let dbQuery = db.select().from(studentsTable);
  const rows = await db.select().from(studentsTable);
  let filtered = rows;
  if (search) {
    const s = search.toLowerCase();
    filtered = rows.filter(r => r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s));
  }
  const offset = (page - 1) * limit;
  const paged = filtered.slice(offset, offset + limit);
  res.json(paged.map(formatStudent));
});

router.post("/students", async (req, res): Promise<void> => {
  const body = CreateStudentBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }
  const [student] = await db.insert(studentsTable).values({
    name: body.data.name,
    email: body.data.email,
    phone: body.data.phone,
    university: body.data.university,
    degree: body.data.degree,
    skills: body.data.skills ?? [],
    preferredRole: body.data.preferredRole,
    preferredLang: body.data.preferredLang,
  }).returning();
  res.status(201).json(formatStudent(student));
});

router.get("/students/:id", async (req, res): Promise<void> => {
  const params = GetStudentParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [student] = await db.select().from(studentsTable).where(eq(studentsTable.id, params.data.id));
  if (!student) { res.status(404).json({ error: "Not found" }); return; }
  res.json(formatStudent(student));
});

router.patch("/students/:id", async (req, res): Promise<void> => {
  const params = UpdateStudentParams.safeParse({ id: Number(req.params.id) });
  const body = UpdateStudentBody.safeParse(req.body);
  if (!params.success || !body.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [student] = await db.update(studentsTable).set({
    name: body.data.name,
    phone: body.data.phone,
    university: body.data.university,
    degree: body.data.degree,
    skills: body.data.skills,
    preferredRole: body.data.preferredRole,
    preferredLang: body.data.preferredLang,
  }).where(eq(studentsTable.id, params.data.id)).returning();
  if (!student) { res.status(404).json({ error: "Not found" }); return; }
  res.json(formatStudent(student));
});

router.get("/students/:id/stats", async (req, res): Promise<void> => {
  const params = GetStudentStatsParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const id = params.data.id;
  // Compute stats from activity
  const activities = await db.select().from(activityTable).where(eq(activityTable.studentId, id));
  const topicsCompleted = activities.filter(a => a.type === "topic_completed").length;
  const modulesCompleted = activities.filter(a => a.type === "module_completed").length;
  const passed = activities.filter(a => a.type === "assignment_passed");
  const scores = passed.map(a => a.score ?? 0).filter(s => s > 0);
  const avgScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  res.json({
    studentId: id,
    totalTopicsCompleted: topicsCompleted,
    totalModulesCompleted: modulesCompleted,
    totalAssignmentsPassed: passed.length,
    avgScore: Math.round(avgScore * 10) / 10,
    streakDays: 7,
    quizPassRate: 0.85,
    codeQualityAvg: 78,
    communicationScore: 82,
  });
});

function formatStudent(s: any) {
  return {
    id: s.id,
    name: s.name,
    email: s.email,
    phone: s.phone ?? null,
    avatar: s.avatar ?? null,
    university: s.university ?? null,
    degree: s.degree ?? null,
    skills: s.skills ?? [],
    preferredRole: s.preferredRole ?? null,
    preferredLang: s.preferredLang ?? null,
    role: s.role,
    status: s.status,
    semesterNumber: s.semesterNumber,
    ppsScore: s.ppsScore,
    creditsEarned: s.creditsEarned,
    industryReadiness: s.industryReadiness,
    createdAt: s.createdAt instanceof Date ? s.createdAt.toISOString() : s.createdAt,
  };
}

export default router;
