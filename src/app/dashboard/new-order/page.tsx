import OrderWizard from '@/app/_components/OrderWizard/OrderWizard'

export default function NewOrderPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Place a New Order</h1>
      <div className="bg-background p-6 rounded-lg shadow-lg">
        <OrderWizard />
      </div>
    </div>
  )
}

