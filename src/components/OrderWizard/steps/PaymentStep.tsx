import React from 'react'
import { useWizard } from '../OrderWizard'
import { Card, CardContent } from '@/components/ui/card'

const PaymentStep: React.FC = () => {
  const { orderDetails } = useWizard()

  // TODO: Implement actual payment integration

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Waste Type:</span> {orderDetails.wasteType}
            </li>
            <li>
              <span className="font-medium">Bin Size:</span> {orderDetails.binSize} cubic yards
            </li>
            <li>
              <span className="font-medium">Bin Placement:</span> {orderDetails.binPlacement}
            </li>
            <li>
              <span className="font-medium">Delivery Address:</span> {orderDetails.address}
            </li>
            <li>
              <span className="font-medium">Delivery Date:</span> {orderDetails.deliveryDate}
            </li>
          </ul>
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Total Cost</h4>
            <p className="text-2xl font-bold">$XXX.XX</p>
            <p className="text-sm text-muted-foreground mt-1">
              (Actual price calculation to be implemented)
            </p>
          </div>
          <div className="mt-6">
            <p className="text-destructive font-semibold">
              TODO: Implement secure payment processing
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentStep

