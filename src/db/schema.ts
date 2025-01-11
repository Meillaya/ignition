import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { rolesEnum } from "./enums";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: rolesEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const posts = table(
  "posts",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: t.varchar().$default(() => generateUniqueString(16)),
    title: t.varchar({ length: 256 }),
    ownerId: t.integer("owner_id").references(() => users.id),
  },
  (table) => {
    return {
      slugIndex: t.uniqueIndex("slug_idx").on(table.slug),
      titleIndex: t.index("title_idx").on(table.title),
    };
  }
);

// export const comments = table("comments", {
//   id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
//   text: t.varchar({ length: 256 }),
//   postId: t.integer("post_id").references(() => posts.id),
//   ownerId: t.integer("owner_id").references(() => users.id),
// });

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
