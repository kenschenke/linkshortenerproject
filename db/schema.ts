import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  shortCode: varchar('short_code', { length: 20 }).notNull().unique(),
  originalUrl: text('original_url').notNull(),
  userId: text('user_id').notNull(), // Clerk user id; no DB FK, Clerk users aren't in Postgres
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
