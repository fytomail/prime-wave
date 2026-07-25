import { pgTable, serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { topicsTable } from "./topics";

export const assignmentsTable = pgTable("assignments", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").notNull().references(() => topicsTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull().default("practical"),
  status: text("status").notNull().default("active"),
  maxScore: real("max_score").notNull().default(100),
  deadline: text("deadline"),
  maxAttempts: integer("max_attempts").notNull().default(3),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const submissionsTable = pgTable("submissions", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id").notNull().references(() => assignmentsTable.id),
  studentId: integer("student_id").notNull(),
  content: text("content").notNull(),
  githubUrl: text("github_url"),
  notes: text("notes"),
  status: text("status").notNull().default("submitted"),
  score: real("score"),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
});

export const evaluationsTable = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").notNull().references(() => submissionsTable.id),
  overallScore: real("overall_score").notNull(),
  passed: text("passed").notNull().default("false"),
  accuracy: real("accuracy").notNull().default(0),
  logic: real("logic").notNull().default(0),
  codeQuality: real("code_quality").notNull().default(0),
  documentation: real("documentation").notNull().default(0),
  security: real("security").notNull().default(0),
  performance: real("performance").notNull().default(0),
  bestPractices: real("best_practices").notNull().default(0),
  feedback: text("feedback").notNull().default(""),
  weakAreas: text("weak_areas").array().notNull().default([]),
  improvementPlan: text("improvement_plan"),
  evaluatedAt: timestamp("evaluated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAssignmentSchema = createInsertSchema(assignmentsTable).omit({ id: true, createdAt: true });
export const insertSubmissionSchema = createInsertSchema(submissionsTable).omit({ id: true, submittedAt: true });
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type Assignment = typeof assignmentsTable.$inferSelect;
export type Submission = typeof submissionsTable.$inferSelect;
export type Evaluation = typeof evaluationsTable.$inferSelect;
