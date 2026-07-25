import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { db, projectsTable } from "@workspace/db";
import {
  ListProjectsQueryParams,
  CreateProjectBody,
  GetProjectParams,
  UpdateProjectParams,
  UpdateProjectBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/projects", async (req, res): Promise<void> => {
  const query = ListProjectsQueryParams.safeParse(req.query);
  if (!query.success) { res.status(400).json({ error: "Invalid query" }); return; }
  let rows = await db.select().from(projectsTable);
  if (query.data.studentId) rows = rows.filter(r => r.studentId === query.data.studentId);
  if (query.data.type) rows = rows.filter(r => r.type === query.data.type);
  if (query.data.status) rows = rows.filter(r => r.status === query.data.status);
  res.json(rows.map(formatProject));
});

router.post("/projects", async (req, res): Promise<void> => {
  const body = CreateProjectBody.safeParse(req.body);
  if (!body.success) { res.status(400).json({ error: body.error.message }); return; }
  const [project] = await db.insert(projectsTable).values({
    studentId: body.data.studentId,
    moduleId: body.data.moduleId,
    semesterId: body.data.semesterId,
    title: body.data.title,
    description: body.data.description,
    type: body.data.type,
    techStack: body.data.techStack ?? [],
  }).returning();
  res.status(201).json(formatProject(project));
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const params = GetProjectParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, params.data.id));
  if (!project) { res.status(404).json({ error: "Not found" }); return; }
  res.json(formatProject(project));
});

router.patch("/projects/:id", async (req, res): Promise<void> => {
  const params = UpdateProjectParams.safeParse({ id: Number(req.params.id) });
  const body = UpdateProjectBody.safeParse(req.body);
  if (!params.success || !body.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const updateData: any = {};
  if (body.data.title !== undefined) updateData.title = body.data.title;
  if (body.data.description !== undefined) updateData.description = body.data.description;
  if (body.data.githubUrl !== undefined) updateData.githubUrl = body.data.githubUrl;
  if (body.data.status !== undefined) updateData.status = body.data.status;
  if (body.data.techStack !== undefined) updateData.techStack = body.data.techStack;
  const [project] = await db.update(projectsTable).set(updateData).where(eq(projectsTable.id, params.data.id)).returning();
  if (!project) { res.status(404).json({ error: "Not found" }); return; }
  res.json(formatProject(project));
});

function formatProject(p: any) {
  return {
    id: p.id, studentId: p.studentId, moduleId: p.moduleId ?? null, semesterId: p.semesterId ?? null,
    title: p.title, description: p.description ?? null, type: p.type, status: p.status,
    githubUrl: p.githubUrl ?? null, score: p.score ?? null, techStack: p.techStack ?? [],
    createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
    submittedAt: p.submittedAt instanceof Date ? p.submittedAt.toISOString() : (p.submittedAt ?? null),
  };
}

export default router;
