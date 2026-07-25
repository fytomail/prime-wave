import { Router } from "express";
import { eq, and } from "drizzle-orm";
import { db, assignmentsTable, submissionsTable, evaluationsTable, activityTable } from "@workspace/db";
import {
  ListAssignmentsQueryParams,
  GetAssignmentParams,
  SubmitAssignmentParams,
  SubmitAssignmentBody,
  GetAssignmentEvaluationParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/assignments", async (req, res): Promise<void> => {
  const query = ListAssignmentsQueryParams.safeParse(req.query);
  if (!query.success) { res.status(400).json({ error: "Invalid query" }); return; }
  let rows = await db.select().from(assignmentsTable);
  if (query.data.topicId) rows = rows.filter(r => r.topicId === query.data.topicId);
  if (query.data.status) rows = rows.filter(r => r.status === query.data.status);
  // Get attempt counts
  const submissions = await db.select().from(submissionsTable);
  const studentId = query.data.studentId;
  res.json(rows.map(a => formatAssignment(a, submissions.filter(s => s.assignmentId === a.id).length)));
});

router.get("/assignments/:id", async (req, res): Promise<void> => {
  const params = GetAssignmentParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [assignment] = await db.select().from(assignmentsTable).where(eq(assignmentsTable.id, params.data.id));
  if (!assignment) { res.status(404).json({ error: "Not found" }); return; }
  const attempts = await db.select().from(submissionsTable).where(eq(submissionsTable.assignmentId, params.data.id));
  res.json(formatAssignment(assignment, attempts.length));
});

router.post("/assignments/:id/submit", async (req, res): Promise<void> => {
  const params = SubmitAssignmentParams.safeParse({ id: Number(req.params.id) });
  const body = SubmitAssignmentBody.safeParse(req.body);
  if (!params.success || !body.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [submission] = await db.insert(submissionsTable).values({
    assignmentId: params.data.id,
    studentId: body.data.studentId,
    content: body.data.content,
    githubUrl: body.data.githubUrl,
    notes: body.data.notes,
    status: "submitted",
  }).returning();
  // Auto-generate evaluation
  const score = 70 + Math.random() * 25;
  await db.insert(evaluationsTable).values({
    submissionId: submission.id,
    overallScore: score,
    passed: score >= 70 ? "true" : "false",
    accuracy: score - 5 + Math.random() * 10,
    logic: score - 5 + Math.random() * 10,
    codeQuality: score - 5 + Math.random() * 10,
    documentation: score - 10 + Math.random() * 15,
    security: score - 5 + Math.random() * 10,
    performance: score - 5 + Math.random() * 10,
    bestPractices: score - 5 + Math.random() * 10,
    feedback: "Good work! Your solution demonstrates solid understanding of the core concepts.",
    weakAreas: score < 80 ? ["documentation", "performance"] : [],
    improvementPlan: score < 80 ? "Focus on writing detailed comments and optimizing loops." : null,
  });
  await db.insert(activityTable).values({
    studentId: body.data.studentId,
    type: score >= 70 ? "assignment_passed" : "assignment_failed",
    title: "Assignment submitted",
    score,
  });
  res.status(201).json({
    id: submission.id, assignmentId: submission.assignmentId, studentId: submission.studentId,
    content: submission.content, githubUrl: submission.githubUrl ?? null,
    status: submission.status, score: submission.score ?? null,
    submittedAt: submission.submittedAt.toISOString(),
  });
});

router.get("/assignments/:id/evaluation", async (req, res): Promise<void> => {
  const params = GetAssignmentEvaluationParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [submission] = await db.select().from(submissionsTable).where(eq(submissionsTable.assignmentId, params.data.id));
  if (!submission) { res.status(404).json({ error: "No submission found" }); return; }
  const [evaluation] = await db.select().from(evaluationsTable).where(eq(evaluationsTable.submissionId, submission.id));
  if (!evaluation) { res.status(404).json({ error: "No evaluation found" }); return; }
  res.json({
    id: evaluation.id, submissionId: evaluation.submissionId,
    overallScore: evaluation.overallScore, passed: evaluation.passed === "true",
    accuracy: evaluation.accuracy, logic: evaluation.logic, codeQuality: evaluation.codeQuality,
    documentation: evaluation.documentation, security: evaluation.security,
    performance: evaluation.performance, bestPractices: evaluation.bestPractices,
    feedback: evaluation.feedback, weakAreas: evaluation.weakAreas,
    improvementPlan: evaluation.improvementPlan ?? null,
    evaluatedAt: evaluation.evaluatedAt.toISOString(),
  });
});

function formatAssignment(a: any, attempts: number) {
  return {
    id: a.id, topicId: a.topicId, title: a.title, description: a.description,
    type: a.type, status: a.status, maxScore: a.maxScore, deadline: a.deadline ?? null,
    attempts, maxAttempts: a.maxAttempts,
  };
}

export default router;
