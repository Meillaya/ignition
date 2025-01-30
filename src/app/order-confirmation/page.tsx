"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/_components/ui/button"

function OrderConfirmationContent() {
  const [status, setStatus] = useState<"success" | "failure" | "loading">("loading")
  const searchParams = useSearchParams()

  useEffect(() => {
    const paymentIntentClientSecret = searchParams?.get("payment_intent_client_secret")
    const paymentIntentId = searchParams?.get("payment_intent")

    if (paymentIntentClientSecret && paymentIntentId) {
      fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus("success")
          } else {
            setStatus("failure")
          }
        })
        .catch(() => setStatus("failure"))
    } else {
      setStatus("failure")
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {status === "loading" && "Processing Your Order..."}
            {status === "success" && "Order Confirmed!"}
            {status === "failure" && "Order Processing Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {status === "loading" && (
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
              <p className="text-center mb-4">
                Thank you for your order! We've received your payment and will process your request shortly.
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </>
          )}
          {status === "failure" && (
            <>
              <XCircle className="text-red-500 w-16 h-16 mb-4" />
              <p className="text-center mb-4">
                We're sorry, but there was an issue processing your order. Please try again or contact support.
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/dashboard/client/new-order">Try Again</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Processing Your Order...
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
          </CardContent>
        </Card>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}

