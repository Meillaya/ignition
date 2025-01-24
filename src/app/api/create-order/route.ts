import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const orderDetails = await req.json()

      // Here you would typically save the order to your database
      // const order = await db.order.create({ data: orderDetails })

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(orderDetails.totalCost * 100), // Stripe expects the amount in cents
        currency: "usd",
        // In a production app, you would associate this with the order in your database
        metadata: { orderId: "placeholder_id" },
      })

      return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
      console.error("Error creating order:", err)
      return NextResponse.json({ error: (err as Error).message }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

