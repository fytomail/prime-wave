import { pgTable, serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const certificatesTable = pgTable("certificates", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  type: text("type").notNull().default("semester"),
  title: text("title").notNull(),
  semesterNumber: integer("semester_number"),
  issuedAt: timestamp("issued_at", { withTimezone: true }).notNull().defaultNow(),
  creditsAwarded: integer("credits_awarded").notNull().default(0),
  score: real("score"),
  verificationCode: text("verification_code").notNull(),
  qrCodeUrl: text("qr_code_url"),
});

export const insertCertificateSchema = createInsertSchema(certificatesTable).omit({ id: true, issuedAt: true });
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificatesTable.$inferSelect;
