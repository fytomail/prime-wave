import { Router } from "express";
import { db, studentsTable } from "@workspace/db";
import { GetLeaderboardQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/leaderboard", async (req, res): Promise<void> => {
  const query = GetLeaderboardQueryParams.safeParse(req.query);
  if (!query.success) { res.status(400).json({ error: "Invalid query" }); return; }
  const { limit = 50, university, semester } = query.data;
  let students = await db.select().from(studentsTable);
  if (university) students = students.filter(s => s.university?.toLowerCase().includes(university.toLowerCase()));
  if (semester) students = students.filter(s => s.semesterNumber === semester);
  const sorted = students.sort((a, b) => b.ppsScore - a.ppsScore).slice(0, limit);
  res.json(sorted.map((s, i) => ({
    rank: i + 1,
    studentId: s.id,
    studentName: s.name,
    avatar: s.avatar ?? null,
    university: s.university ?? "Unknown",
    ppsScore: s.ppsScore,
    creditsEarned: s.creditsEarned,
    semesterNumber: s.semesterNumber,
    industryReadiness: s.industryReadiness,
    badges: s.creditsEarned >= 100 ? ["Top Performer"] : [],
  })));
});

export default router;
