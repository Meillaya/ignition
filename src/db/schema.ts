import { integer, pgTable, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const rolesEnum = pgEnum("role", ["client", "contractor"]);

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
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

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  profile: one(userProfilesTable, {
    fields: [usersTable.id],
    references: [userProfilesTable.userId],
  }),
  orders: many(ordersTable),
}));

export const userProfilesTable = pgTable("user_profiles", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 }).notNull().unique().references(() => usersTable.id),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  companyName: varchar("company_name", { length: 255 }),
  address: varchar("address", { length: 500 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  zipCode: varchar("zip_code", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const ordersTable = pgTable("orders", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => usersTable.id),
  wasteTypeId: varchar("waste_type_id", { length: 255 }).notNull().references(() => wasteTypesTable.id),
  binSizeId: varchar("bin_size_id", { length: 255 }).notNull().references(() => binSizesTable.id),
  quantity: integer("quantity").notNull(),
  placementType: varchar("placement_type", { length: 255 }).notNull(),
  specialInstructions: text("special_instructions"),
  status: orderStatusEnum("status").default("pending"),
  scheduledDate: timestamp("scheduled_date"),
  completedDate: timestamp("completed_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const wasteTypesTable = pgTable("waste_types", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  priceMultiplier: decimal("price_multiplier", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const binSizesTable = pgTable("bin_sizes", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  size: varchar("size", { length: 255 }).notNull(),
  description: text("description"),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  capacity: integer("capacity").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const jobAssignmentsTable = pgTable("job_assignments", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  orderId: varchar("order_id", { length: 255 }).notNull().references(() => ordersTable.id),
  contractorId: varchar("contractor_id", { length: 255 }).notNull().references(() => usersTable.id),
  assignedDate: timestamp("assigned_date").defaultNow(),
  status: jobStatusEnum("status").default("assigned"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const paymentsTable = pgTable("payments", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  orderId: varchar("order_id", { length: 255 }).notNull().references(() => ordersTable.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 255 }).notNull(),
  transactionId: varchar("transaction_id", { length: 255 }).notNull(),
  status: paymentStatusEnum("status").default("pending"),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enums for status fields
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "scheduled",
  "in_progress",
  "completed",
  "cancelled"
]);

export const jobStatusEnum = pgEnum("job_status", [
  "assigned",
  "in_progress",
  "completed",
  "cancelled"
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded"
]);

// Relations
export const ordersRelations = relations(ordersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [ordersTable.userId],
    references: [usersTable.id],
  }),
  wasteType: one(wasteTypesTable, {
    fields: [ordersTable.wasteTypeId],
    references: [wasteTypesTable.id],
  }),
  binSize: one(binSizesTable, {
    fields: [ordersTable.binSizeId],
    references: [binSizesTable.id],
  }),
  jobAssignments: many(jobAssignmentsTable),
  payments: many(paymentsTable),
}));

export const jobAssignmentsRelations = relations(jobAssignmentsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [jobAssignmentsTable.orderId],
    references: [ordersTable.id],
  }),
  contractor: one(usersTable, {
    fields: [jobAssignmentsTable.contractorId],
    references: [usersTable.id],
  }),
}));

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [paymentsTable.orderId],
    references: [ordersTable.id],
  }),
}));

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
