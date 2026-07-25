import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, studentsTable, certificatesTable, projectsTable } from "@workspace/db";
import { GetPortfolioParams } from "@workspace/api-zod";

const router = Router();

router.get("/portfolio/:studentId", async (req, res): Promise<void> => {
  const params = GetPortfolioParams.safeParse({ studentId: Number(req.params.studentId) });
  if (!params.success) { res.status(400).json({ error: "Invalid studentId" }); return; }
  const { studentId } = params.data;
  const [student] = await db.select().from(studentsTable).where(eq(studentsTable.id, studentId));
  if (!student) { res.status(404).json({ error: "Not found" }); return; }
  const certs = await db.select().from(certificatesTable).where(eq(certificatesTable.studentId, studentId));
  const projects = await db.select().from(projectsTable).where(eq(projectsTable.studentId, studentId));
  res.json({
    studentId: student.id,
    studentName: student.name,
    university: student.university ?? "",
    ppsScore: student.ppsScore,
    creditsEarned: student.creditsEarned,
    industryReadiness: student.industryReadiness,
    semestersCompleted: Math.max(0, student.semesterNumber - 1),
    certificates: certs.map(c => ({
      id: c.id, studentId: c.studentId, type: c.type, title: c.title,
      semesterNumber: c.semesterNumber ?? null,
      issuedAt: c.issuedAt instanceof Date ? c.issuedAt.toISOString() : c.issuedAt,
      creditsAwarded: c.creditsAwarded, score: c.score ?? null,
      verificationCode: c.verificationCode, qrCodeUrl: c.qrCodeUrl ?? null,
    })),
    projects: projects.map(p => ({
      id: p.id, studentId: p.studentId, moduleId: p.moduleId ?? null, semesterId: p.semesterId ?? null,
      title: p.title, description: p.description ?? null, type: p.type, status: p.status,
      githubUrl: p.githubUrl ?? null, score: p.score ?? null, techStack: p.techStack ?? [],
      createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
      submittedAt: p.submittedAt instanceof Date ? p.submittedAt.toISOString() : (p.submittedAt ?? null),
    })),
    skills: student.skills ?? [],
    githubUrl: null,
    linkedinUrl: null,
  });
});

export default router;
