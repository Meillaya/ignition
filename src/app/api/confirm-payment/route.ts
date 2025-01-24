import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const { paymentIntentId } = await req.json()

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

      if (paymentIntent.status === "succeeded") {
        // Here you would typically update your database to mark the order as paid
        // For example: await db.order.update({ where: { id: orderId }, data: { status: 'paid' } })

        return NextResponse.json({ success: true })
      } else {
        return NextResponse.json({ success: false, error: "Payment not successful" }, { status: 400 })
      }
    } catch (err) {
      console.error("Error confirming payment:", err)
      return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

