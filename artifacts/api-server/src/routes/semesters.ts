import { Router } from "express";
import { eq, asc } from "drizzle-orm";
import { db, semestersTable, modulesTable, studentSemesterProgressTable } from "@workspace/db";
import {
  GetSemesterParams,
  ListModulesParams,
  GetSemesterProgressParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/semesters", async (req, res): Promise<void> => {
  const rows = await db.select().from(semestersTable).orderBy(asc(semestersTable.number));
  res.json(rows.map(formatSemester));
});

router.get("/semesters/:id", async (req, res): Promise<void> => {
  const params = GetSemesterParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [sem] = await db.select().from(semestersTable).where(eq(semestersTable.id, params.data.id));
  if (!sem) { res.status(404).json({ error: "Not found" }); return; }
  const modules = await db.select().from(modulesTable).where(eq(modulesTable.semesterId, sem.id)).orderBy(asc(modulesTable.order));
  res.json({ ...formatSemester(sem), modules: modules.map(formatModule) });
});

router.get("/semesters/:id/modules", async (req, res): Promise<void> => {
  const params = ListModulesParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const rows = await db.select().from(modulesTable).where(eq(modulesTable.semesterId, params.data.id)).orderBy(asc(modulesTable.order));
  res.json(rows.map(formatModule));
});

router.get("/students/:studentId/semesters/:semesterId/progress", async (req, res): Promise<void> => {
  const params = GetSemesterProgressParams.safeParse({
    studentId: Number(req.params.studentId),
    semesterId: Number(req.params.semesterId),
  });
  if (!params.success) { res.status(400).json({ error: "Invalid params" }); return; }
  const { studentId, semesterId } = params.data;
  let [progress] = await db.select().from(studentSemesterProgressTable)
    .where(eq(studentSemesterProgressTable.studentId, studentId));
  if (!progress) {
    const modules = await db.select().from(modulesTable).where(eq(modulesTable.semesterId, semesterId));
    progress = {
      id: 0, studentId, semesterId,
      completedModules: 0, totalModules: modules.length,
      completedTopics: 0, totalTopics: modules.reduce((a, m) => a + m.topicsCount, 0),
      overallScore: 0, status: "in_progress", creditsEarned: null, updatedAt: new Date(),
    };
  }
  res.json({
    semesterId: progress.semesterId,
    studentId: progress.studentId,
    completedModules: progress.completedModules,
    totalModules: progress.totalModules,
    completedTopics: progress.completedTopics,
    totalTopics: progress.totalTopics,
    overallScore: progress.overallScore,
    status: progress.status,
    creditsEarned: progress.creditsEarned ?? null,
  });
});

function formatSemester(s: any) {
  return {
    id: s.id, number: s.number, title: s.title, description: s.description,
    creditsRequired: s.creditsRequired, status: s.status, modules: [],
  };
}

function formatModule(m: any) {
  return {
    id: m.id, semesterId: m.semesterId, title: m.title, description: m.description,
    order: m.order, status: m.status, topicsCount: m.topicsCount, score: m.score ?? null,
  };
}

export default router;
