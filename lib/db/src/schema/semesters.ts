import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const semestersTable = pgTable("semesters", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  creditsRequired: integer("credits_required").notNull().default(25),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const modulesTable = pgTable("modules", {
  id: serial("id").primaryKey(),
  semesterId: integer("semester_id").notNull().references(() => semestersTable.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  status: text("status").notNull().default("active"),
  topicsCount: integer("topics_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const studentSemesterProgressTable = pgTable("student_semester_progress", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  semesterId: integer("semester_id").notNull().references(() => semestersTable.id),
  completedModules: integer("completed_modules").notNull().default(0),
  totalModules: integer("total_modules").notNull().default(0),
  completedTopics: integer("completed_topics").notNull().default(0),
  totalTopics: integer("total_topics").notNull().default(0),
  overallScore: integer("overall_score").notNull().default(0),
  status: text("status").notNull().default("in_progress"),
  creditsEarned: integer("credits_earned"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSemesterSchema = createInsertSchema(semestersTable).omit({ id: true, createdAt: true });
export const insertModuleSchema = createInsertSchema(modulesTable).omit({ id: true, createdAt: true });
export type InsertSemester = z.infer<typeof insertSemesterSchema>;
export type Semester = typeof semestersTable.$inferSelect;
export type Module = typeof modulesTable.$inferSelect;
export type StudentSemesterProgress = typeof studentSemesterProgressTable.$inferSelect;
