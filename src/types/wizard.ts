import { z } from "zod"

export type WasteType =
  | "mixed_garbage"
  | "asphalt"
  | "dirt"
  | "mixed_dirt"
  | "brick_and_block"
  | "concrete"
  | "brick_block_concrete"

export type BinSize = "6" | "8" | "10" | "14"

export type BinPlacement = "right_side" | "left_side" | "on_lawn"

export type OrderStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"

export const userProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  companyName: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
})

export const orderSchema = z.object({
  wasteType: z.enum([
    "mixed_garbage",
    "asphalt",
    "dirt",
    "mixed_dirt",
    "brick_and_block",
    "concrete",
    "brick_block_concrete",
  ]),
  binSize: z.enum(["6", "8", "10", "14"]),
  quantity: z.number().int().positive(),
  placementType: z.enum(["right_side", "left_side", "on_lawn"]),
  specialInstructions: z.string().optional(),
  scheduledDate: z.date(),
})

export type UserProfile = z.infer<typeof userProfileSchema>
export type Order = z.infer<typeof orderSchema>

export interface OrderDetails extends UserProfile, Order {}

export interface WizardContextType {
  currentStep: number
  orderDetails: Partial<OrderDetails>
  updateOrderDetails: (details: Partial<OrderDetails>) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  calculateTotalCost: () => number
  pricingInfo: PricingInfo
}

export interface PricingInfo {
  basePrices: Record<BinSize, number>
  wasteTypeMultipliers: Record<WasteType, number>
  placementFees: Record<BinPlacement, number>
}

