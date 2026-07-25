import { Router } from "express";
import { eq, asc, and } from "drizzle-orm";
import { db, topicsTable, topicCompletionsTable } from "@workspace/db";
import {
  ListTopicsParams,
  GetTopicParams,
  CompleteTopicParams,
  CompleteTopicBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/modules/:moduleId/topics", async (req, res): Promise<void> => {
  const params = ListTopicsParams.safeParse({ moduleId: Number(req.params.moduleId) });
  if (!params.success) { res.status(400).json({ error: "Invalid moduleId" }); return; }
  const rows = await db.select().from(topicsTable)
    .where(eq(topicsTable.moduleId, params.data.moduleId))
    .orderBy(asc(topicsTable.order));
  res.json(rows.map(t => formatTopic(t, false)));
});

router.get("/topics/:id", async (req, res): Promise<void> => {
  const params = GetTopicParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [topic] = await db.select().from(topicsTable).where(eq(topicsTable.id, params.data.id));
  if (!topic) { res.status(404).json({ error: "Not found" }); return; }
  res.json(formatTopic(topic, false));
});

router.post("/topics/:id/complete", async (req, res): Promise<void> => {
  const params = CompleteTopicParams.safeParse({ id: Number(req.params.id) });
  const body = CompleteTopicBody.safeParse(req.body);
  if (!params.success || !body.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [completion] = await db.insert(topicCompletionsTable).values({
    topicId: params.data.id,
    studentId: body.data.studentId,
    quizScore: body.data.quizScore ?? 0,
    timeSpent: body.data.timeSpent ?? 0,
  }).returning();
  res.json({
    id: completion.id,
    topicId: completion.topicId,
    studentId: completion.studentId,
    completedAt: completion.completedAt.toISOString(),
    quizScore: completion.quizScore,
  });
});

function formatTopic(t: any, isCompleted: boolean) {
  return {
    id: t.id, moduleId: t.moduleId, title: t.title, description: t.description ?? null,
    order: t.order, status: t.status, contentType: t.contentType, duration: t.duration ?? null,
    isCompleted,
  };
}

export default router;
