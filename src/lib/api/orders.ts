import { db } from '@/lib/db'
import { ordersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const createOrder = async (orderData: any) => {
  const [order] = await db
    .insert(ordersTable)
    .values({
      ...orderData,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .returning()
    
  return order
}

export const getAvailableJobs = async () => {
  return await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.status, 'pending'))
    .orderBy(ordersTable.createdAt)
}

export const claimJob = async (orderId: string, contractorId: string) => {
  await db
    .update(ordersTable)
    .set({
      status: 'assigned',
      contractorId,
      updatedAt: new Date()
    })
    .where(eq(ordersTable.id, orderId))
}
