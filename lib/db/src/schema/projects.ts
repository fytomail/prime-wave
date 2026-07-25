import { pgTable, serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  moduleId: integer("module_id"),
  semesterId: integer("semester_id"),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull().default("mini"),
  status: text("status").notNull().default("in_progress"),
  githubUrl: text("github_url"),
  score: real("score"),
  techStack: text("tech_stack").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;
