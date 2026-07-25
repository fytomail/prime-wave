import { pgTable, serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const companiesTable = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  industry: text("industry").notNull(),
  website: text("website"),
  logo: text("logo"),
  status: text("status").notNull().default("verified"),
  jobsPosted: integer("jobs_posted").notNull().default(0),
  hiredCount: integer("hired_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companiesTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requiredSkills: text("required_skills").array().notNull().default([]),
  minPpsScore: real("min_pps_score"),
  minCredits: integer("min_credits"),
  location: text("location"),
  type: text("type").notNull().default("full-time"),
  status: text("status").notNull().default("active"),
  applicantsCount: integer("applicants_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCompanySchema = createInsertSchema(companiesTable).omit({ id: true, createdAt: true });
export const insertJobSchema = createInsertSchema(jobsTable).omit({ id: true, createdAt: true });
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companiesTable.$inferSelect;
export type Job = typeof jobsTable.$inferSelect;
