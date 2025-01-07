import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/src/components/ui/card'
import { useWizard } from '../OrderWizard'
import { BinPlacement } from '@/src/types/wizard'

const placementOptions: { value: BinPlacement; label: string; description: string; fee: number }[] = [
  {
    value: 'right_side',
    label: 'Right Side',
    description: 'Place the bin on the right side of your property.',
    fee: 0,
  },
  {
    value: 'left_side',
    label: 'Left Side',
    description: 'Place the bin on the left side of your property.',
    fee: 0,
  },
  {
    value: 'on_lawn',
    label: 'On the Lawn',
    description: 'Place the bin on your lawn. Additional fee applies.',
    fee: 50,
  },
]

const BinPlacementStep: React.FC = () => {
  const { orderDetails, updateOrderDetails } = useWizard()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Bin Placement</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {placementOptions.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer transition-colors ${
                orderDetails.binPlacement === option.value
                  ? 'border-primary'
                  : 'border-border hover:border-primary'
              }`}
              onClick={() => updateOrderDetails({ binPlacement: option.value })}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{option.label}</h3>
                <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                {option.fee > 0 && (
                  <p className="text-sm font-bold text-red-500">
                    Additional fee: ${option.fee}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Note: Placing the bin on the lawn incurs an additional fee. Please ensure
        there's clear access to the chosen placement area.
      </p>
    </div>
  )
}

export default BinPlacementStep

