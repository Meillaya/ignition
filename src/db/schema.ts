import { integer, pgTable, varchar, timestamp, pgEnum, decimal, text, index, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const rolesEnum = pgEnum("role", ["client", "contractor"]);

// Specific waste types
export const wasteTypeEnum = pgEnum("waste_type", [
  "mixed_garbage",
  "asphalt", 
  "dirt",
  "mixed_dirt",
  "brick_and_block",
  "concrete",
  "brick_block_concrete"
]);

// Bin sizes with specific options
export const binSizeEnum = pgEnum("bin_size", [
  "6_cubic_yards",
  "8_cubic_yards", 
  "10_cubic_yards",
  "14_cubic_yards"
]);

// Bin placement options
export const binPlacementEnum = pgEnum("bin_placement", [
  "right",
  "left",
  "lawn"
]);

// Contractor status
export const contractorStatusEnum = pgEnum("contractor_status", [
  "available",
  "on_job",
  "unavailable"
]);
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
// Reference Supabase's built-in auth.users table
export const usersTable = pgTable("auth.users", {
  id: uuid("id").primaryKey().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).default('client'),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});



export const usersRelations = relations(usersTable, ({ one, many }) => ({
  profile: one(userProfilesTable, {
    fields: [usersTable.id],
    references: [userProfilesTable.userId],
  }),
  orders: many(ordersTable),
}));

export const userProfilesTable = pgTable("user_profiles", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").notNull().unique().references(() => usersTable.id),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  companyName: varchar("company_name", { length: 255 }),
  address: varchar("address", { length: 500 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  zipCode: varchar("zip_code", { length: 20 }),
  // Contractor specific fields
  contractorStatus: contractorStatusEnum("contractor_status"),
  vehicleType: varchar("vehicle_type", { length: 255 }),
  licensePlate: varchar("license_plate", { length: 20 }),
  insuranceInfo: text("insurance_info"),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }),
  rating: decimal("rating", { precision: 3, scale: 2 }).default(0.0),
  totalJobsCompleted: integer("total_jobs_completed").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  statusIdx: index("status_idx").on(table.status),
  scheduledDateIdx: index("scheduled_date_idx").on(table.scheduledDate),
  paymentStatusIdx: index("payment_status_idx").on(table.paymentStatus),
  userIdIdx: index("user_id_idx").on(table.userId),
}));

export const ordersTable = pgTable("orders", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").notNull().references(() => usersTable.id),
  wasteType: wasteTypeEnum("waste_type").notNull(),
  binSize: binSizeEnum("bin_size").notNull(),
  binPlacement: binPlacementEnum("bin_placement").notNull(),
  quantity: integer("quantity").notNull(),
  specialInstructions: text("special_instructions"),
  status: orderStatusEnum("status").default("pending"),
  scheduledDate: timestamp("scheduled_date"),
  completedDate: timestamp("completed_date"),
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }).notNull(),
  contractorId: uuid("contractor_id").references(() => usersTable.id),
  // Payment processor details
  paymentIntentId: varchar("payment_intent_id", { length: 255 }),
  paymentStatus: paymentStatusEnum("payment_status").default("pending"),
  // Real-time tracking
  currentLocation: varchar("current_location", { length: 500 }),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  statusIdx: index("status_idx").on(table.status),
  scheduledDateIdx: index("scheduled_date_idx").on(table.scheduledDate),
  paymentStatusIdx: index("payment_status_idx").on(table.paymentStatus),
  userIdIdx: index("user_id_idx").on(table.userId),
  contractorIdIdx: index("contractor_id_idx").on(table.contractorId),
}));

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
  id: uuid("id").primaryKey().notNull(),
  orderId: uuid("order_id").notNull().references(() => ordersTable.id),
  contractorId: uuid("contractor_id").notNull().references(() => usersTable.id),
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
