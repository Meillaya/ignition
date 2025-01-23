import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia", // Use the latest API version
})

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const { amount } = await req.json()

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe expects the amount in cents
        currency: "usd",
        // In a production app, you might want to save this to your database
        metadata: { integration_check: "accept_a_payment" },
      })

      return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

