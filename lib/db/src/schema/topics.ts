import { pgTable, serial, text, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { modulesTable } from "./semesters";

export const topicsTable = pgTable("topics", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull().references(() => modulesTable.id),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
  status: text("status").notNull().default("active"),
  contentType: text("content_type").notNull().default("lesson"),
  duration: integer("duration"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const topicCompletionsTable = pgTable("topic_completions", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").notNull().references(() => topicsTable.id),
  studentId: integer("student_id").notNull(),
  quizScore: real("quiz_score").notNull().default(0),
  timeSpent: integer("time_spent").notNull().default(0),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTopicSchema = createInsertSchema(topicsTable).omit({ id: true, createdAt: true });
export type InsertTopic = z.infer<typeof insertTopicSchema>;
export type Topic = typeof topicsTable.$inferSelect;
export type TopicCompletion = typeof topicCompletionsTable.$inferSelect;
