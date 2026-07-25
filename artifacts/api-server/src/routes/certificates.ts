import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, certificatesTable } from "@workspace/db";
import {
  ListCertificatesQueryParams,
  GetCertificateParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/certificates", async (req, res): Promise<void> => {
  const query = ListCertificatesQueryParams.safeParse(req.query);
  if (!query.success) { res.status(400).json({ error: "Invalid query" }); return; }
  let rows = await db.select().from(certificatesTable);
  if (query.data.studentId) rows = rows.filter(r => r.studentId === query.data.studentId);
  res.json(rows.map(formatCert));
});

router.get("/certificates/:id", async (req, res): Promise<void> => {
  const params = GetCertificateParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [cert] = await db.select().from(certificatesTable).where(eq(certificatesTable.id, params.data.id));
  if (!cert) { res.status(404).json({ error: "Not found" }); return; }
  res.json(formatCert(cert));
});

function formatCert(c: any) {
  return {
    id: c.id, studentId: c.studentId, type: c.type, title: c.title,
    semesterNumber: c.semesterNumber ?? null,
    issuedAt: c.issuedAt instanceof Date ? c.issuedAt.toISOString() : c.issuedAt,
    creditsAwarded: c.creditsAwarded, score: c.score ?? null,
    verificationCode: c.verificationCode, qrCodeUrl: c.qrCodeUrl ?? null,
  };
}

export default router;
