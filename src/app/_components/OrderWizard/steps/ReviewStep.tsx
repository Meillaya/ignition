import React, { useState } from "react"
import { useWizard } from "../OrderWizard"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, MapPin, Truck, Package, DollarSign, User, Building, FileText } from "lucide-react"
import { format } from "date-fns"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Make sure to replace with your actual publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const ReviewStep: React.FC = () => {
  const { orderDetails, calculateTotalCost } = useWizard()
  const [clientSecret, setClientSecret] = useState("")

  const totalCost = calculateTotalCost()

  React.useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...orderDetails, totalCost }),
        })
        const data = await response.json()
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          console.error("Failed to create order")
        }
      } catch (error) {
        console.error("Error creating order:", error)
      }
    }

    createOrder()
  }, [orderDetails, totalCost])

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy")
  }

  const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-orange-500 p-6">
          <h3 className="text-2xl font-bold text-white">Order Summary</h3>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InfoItem
                icon={<Package className="w-5 h-5 text-orange-500" />}
                label="Waste Type"
                value={orderDetails.wasteType?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || ""}
              />
              <InfoItem
                icon={<Truck className="w-5 h-5 text-orange-500" />}
                label="Bin Size"
                value={`${orderDetails.binSize} cubic yards`}
              />
              <InfoItem
                icon={<MapPin className="w-5 h-5 text-orange-500" />}
                label="Bin Placement"
                value={orderDetails.placementType?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || ""}
              />
              <InfoItem
                icon={<Calendar className="w-5 h-5 text-orange-500" />}
                label="Scheduled Date"
                value={formatDate(orderDetails.scheduledDate || "")}
              />
            </div>
            <div className="space-y-4">
              <InfoItem
                icon={<User className="w-5 h-5 text-orange-500" />}
                label="Contact"
                value={`${orderDetails.firstName} ${orderDetails.lastName}`}
              />
              <InfoItem
                icon={<Building className="w-5 h-5 text-orange-500" />}
                label="Company"
                value={orderDetails.companyName || "N/A"}
              />
              <InfoItem
                icon={<MapPin className="w-5 h-5 text-orange-500" />}
                label="Delivery Address"
                value={`${orderDetails.address}, ${orderDetails.city}, ${orderDetails.state} ${orderDetails.zipCode}`}
              />
              <InfoItem
                icon={<FileText className="w-5 h-5 text-orange-500" />}
                label="Special Instructions"
                value={orderDetails.specialInstructions || "None"}
              />
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-semibold">Total Cost</h4>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-6 h-6 text-orange-500" />
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalCost.toFixed(2)}</p>
              </div>
            </div>

            {clientSecret && (
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-4">Payment</h4>
                  <Elements options={{ clientSecret }} stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-semibold mb-2">Important Information</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Ensure the delivery area is accessible for our trucks.</li>
                <li>Remove any obstacles that may impede bin placement.</li>
                <li>Be available or have someone present during the scheduled delivery time.</li>
                <li>Final charges may vary based on actual waste volume and type.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        {/*<Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">Confirm Order</Button>*/}
      </div>
    </div>
  )
}

const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    })

    if (result.error) {
      setError(result.error.message || "An error occurred during payment.")
      setProcessing(false)
    }
    // The payment is handled by the redirect, so we don't need to do anything else here
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg w-full"
      >
        {processing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  )
}

export default ReviewStep

