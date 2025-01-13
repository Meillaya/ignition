import { integer, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const rolesEnum = pgEnum("role", ["client", "contractor"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: rolesEnum("role").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});



// export const usersTable = pgTable("users", {
//   id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   password: varchar("password", { length: 255 }).notNull(),
//   role: rolesEnum("role").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });

export const usersRelations = relations(usersTable, ({ many }) => ({}));


function generateUniqueString(length: number = 12): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }

  return uniqueString;
}
