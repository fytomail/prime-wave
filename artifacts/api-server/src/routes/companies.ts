import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, companiesTable } from "@workspace/db";
import {
  CreateCompanyBody,
  GetCompanyParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/companies", async (req, res): Promise<void> => {
  const rows = await db.select().from(companiesTable);
  res.json(rows.map(formatCompany));
});

router.post("/companies", async (req, res): Promise<void> => {
  const body = CreateCompanyBody.safeParse(req.body);
  if (!body.success) { res.status(400).json({ error: body.error.message }); return; }
  const [company] = await db.insert(companiesTable).values({
    name: body.data.name,
    email: body.data.email,
    industry: body.data.industry,
    website: body.data.website,
  }).returning();
  res.status(201).json(formatCompany(company));
});

router.get("/companies/:id", async (req, res): Promise<void> => {
  const params = GetCompanyParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [company] = await db.select().from(companiesTable).where(eq(companiesTable.id, params.data.id));
  if (!company) { res.status(404).json({ error: "Not found" }); return; }
  res.json(formatCompany(company));
});

function formatCompany(c: any) {
  return {
    id: c.id, name: c.name, email: c.email, industry: c.industry,
    website: c.website ?? null, logo: c.logo ?? null, status: c.status,
    jobsPosted: c.jobsPosted, hiredCount: c.hiredCount,
    createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
  };
}

export default router;
