import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, jobsTable, companiesTable, studentsTable } from "@workspace/db";
import {
  ListJobsQueryParams,
  CreateJobBody,
  GetJobParams,
  GetJobCandidatesParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/jobs", async (req, res): Promise<void> => {
  const query = ListJobsQueryParams.safeParse(req.query);
  if (!query.success) { res.status(400).json({ error: "Invalid query" }); return; }
  let rows = await db.select().from(jobsTable);
  const companies = await db.select().from(companiesTable);
  const companyMap = Object.fromEntries(companies.map(c => [c.id, c]));
  if (query.data.companyId) rows = rows.filter(r => r.companyId === query.data.companyId);
  if (query.data.status) rows = rows.filter(r => r.status === query.data.status);
  if (query.data.search) {
    const s = query.data.search.toLowerCase();
    rows = rows.filter(r => r.title.toLowerCase().includes(s) || r.description.toLowerCase().includes(s));
  }
  res.json(rows.map(j => formatJob(j, companyMap[j.companyId]?.name ?? "")));
});

router.post("/jobs", async (req, res): Promise<void> => {
  const body = CreateJobBody.safeParse(req.body);
  if (!body.success) { res.status(400).json({ error: body.error.message }); return; }
  const [company] = await db.select().from(companiesTable).where(eq(companiesTable.id, body.data.companyId));
  const [job] = await db.insert(jobsTable).values({
    companyId: body.data.companyId,
    title: body.data.title,
    description: body.data.description,
    requiredSkills: body.data.requiredSkills ?? [],
    minPpsScore: body.data.minPpsScore,
    minCredits: body.data.minCredits,
    location: body.data.location,
    type: body.data.type ?? "full-time",
  }).returning();
  res.status(201).json(formatJob(job, company?.name ?? ""));
});

router.get("/jobs/:id", async (req, res): Promise<void> => {
  const params = GetJobParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, params.data.id));
  if (!job) { res.status(404).json({ error: "Not found" }); return; }
  const [company] = await db.select().from(companiesTable).where(eq(companiesTable.id, job.companyId));
  res.json(formatJob(job, company?.name ?? ""));
});

router.get("/jobs/:id/candidates", async (req, res): Promise<void> => {
  const params = GetJobCandidatesParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, params.data.id));
  if (!job) { res.status(404).json({ error: "Not found" }); return; }
  const students = await db.select().from(studentsTable);
  const candidates = students
    .filter(s => s.status === "active")
    .map(s => {
      const skillMatch = job.requiredSkills.filter(sk => (s.skills ?? []).includes(sk)).length;
      const skillMatchPct = job.requiredSkills.length > 0 ? (skillMatch / job.requiredSkills.length) * 100 : 60;
      const matchScore = (s.ppsScore * 0.4) + (skillMatchPct * 0.3) + (s.industryReadiness * 0.3);
      return {
        studentId: s.id, studentName: s.name, avatar: s.avatar ?? null,
        university: s.university ?? "Unknown", matchScore: Math.round(matchScore * 10) / 10,
        ppsScore: s.ppsScore, creditsEarned: s.creditsEarned, semesterNumber: s.semesterNumber,
        industryReadiness: s.industryReadiness, skills: s.skills ?? [],
        githubUrl: null, portfolioUrl: null, skillsMatchPct: Math.round(skillMatchPct),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 20);
  res.json(candidates);
});

function formatJob(j: any, companyName: string) {
  return {
    id: j.id, companyId: j.companyId, companyName, title: j.title, description: j.description,
    requiredSkills: j.requiredSkills ?? [], minPpsScore: j.minPpsScore ?? null,
    minCredits: j.minCredits ?? null, location: j.location ?? null, type: j.type,
    status: j.status, applicantsCount: j.applicantsCount,
    createdAt: j.createdAt instanceof Date ? j.createdAt.toISOString() : j.createdAt,
  };
}

export default router;
