import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useWizard } from '../OrderWizard'
import { BinPlacement } from '@/types/wizard'
import { MapPin, AlertTriangle } from 'lucide-react'

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
    <div className="space-y-6">
      <p className="text-gray-600 dark:text-gray-300">
        Choose where you'd like the bin to be placed on your property. Please ensure there's clear access to the chosen area.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {placementOptions.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 ${
                orderDetails.binPlacement === option.value
                  ? 'ring-2 ring-orange-500 dark:ring-orange-400'
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateOrderDetails({ binPlacement: option.value })}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="mr-2 h-5 w-5 text-orange-500 dark:text-orange-400" />
                  <h3 className="font-semibold text-lg">{option.label}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{option.description}</p>
                {option.fee > 0 && (
                  <div className="flex items-center text-orange-600 dark:text-orange-400">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    <p className="text-sm font-semibold">
                      Additional fee: ${option.fee}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
        <AlertTriangle className="mr-2 h-4 w-4" />
        Note: Placing the bin on the lawn incurs an additional fee. Please ensure there's clear access to the chosen placement area.
      </p>
    </div>
  )
}

export default BinPlacementStep

