import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255}).notNull(),
  role: varchar({ length: 50}).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('created_at').defaultNow(),
});
