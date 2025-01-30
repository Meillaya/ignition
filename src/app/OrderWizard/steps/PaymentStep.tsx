import React from 'react'
import { useWizard } from '../OrderWizard'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Button } from '@/app/_components/ui/button'
import { Check, AlertTriangle } from 'lucide-react'

const PaymentStep: React.FC = () => {
  const { orderDetails, calculateTotalCost } = useWizard()

  const totalCost = calculateTotalCost()

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Waste Type</p>
                <p className="font-medium">{orderDetails.wasteType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bin Size</p>
                <p className="font-medium">{orderDetails.binSize} cubic yards</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bin Placement</p>
                <p className="font-medium">{orderDetails.binPlacement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Date</p>
                <p className="font-medium">{orderDetails.deliveryDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Address</p>
              <p className="font-medium">{orderDetails.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contact Information</p>
              <p className="font-medium">{orderDetails.contactName}</p>
              <p className="font-medium">{orderDetails.contactPhone}</p>
              <p className="font-medium">{orderDetails.contactEmail}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Total Cost</h4>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">${totalCost.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-orange-50 dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start">
            <AlertTriangle className="mr-4 h-6 w-6 text-orange-500 dark:text-orange-400 flex-shrink-0" />
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
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
          Proceed to Payment
        </Button>
      </div>
    </div>
  )
}

export default PaymentStep

