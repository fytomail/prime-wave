import { pgTable, serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const studentsTable = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  avatar: text("avatar"),
  university: text("university"),
  degree: text("degree"),
  skills: text("skills").array().notNull().default([]),
  preferredRole: text("preferred_role"),
  preferredLang: text("preferred_lang"),
  role: text("role").notNull().default("student"),
  status: text("status").notNull().default("active"),
  semesterNumber: integer("semester_number").notNull().default(1),
  ppsScore: real("pps_score").notNull().default(0),
  creditsEarned: integer("credits_earned").notNull().default(0),
  industryReadiness: real("industry_readiness").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertStudentSchema = createInsertSchema(studentsTable).omit({ id: true, createdAt: true });
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof studentsTable.$inferSelect;
