import { Metadata } from 'next'
import OrderWizard from '@/components/OrderWizard/OrderWizard'

export const metadata: Metadata = {
  title: 'New Order - EcoWaste',
  description: 'Create a new waste disposal order',
}

export default function NewOrderPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New Waste Disposal Order</h1>
      <OrderWizard />
    </div>
  )
}

