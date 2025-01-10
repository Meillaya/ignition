import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useWizard } from '../OrderWizard'
import { BinSize } from '@/types/wizard'

const binSizes: { size: BinSize; label: string; capacity: string; price: number }[] = [
  { size: '6', label: '6 Cubic Yards', capacity: 'Ideal for small projects', price: 200 },
  { size: '8', label: '8 Cubic Yards', capacity: 'Suitable for medium-sized jobs', price: 250 },
  { size: '10', label: '10 Cubic Yards', capacity: 'Perfect for larger renovations', price: 300 },
  { size: '14', label: '14 Cubic Yards', capacity: 'Best for major construction', price: 350 },
]

const BinSizeStep: React.FC = () => {
  const { orderDetails, updateOrderDetails } = useWizard()

  const getPrice = (size: BinSize) => {
    const basePrice = binSizes.find((bin) => bin.size === size)?.price || 0
    const wasteTypeMultiplier = orderDetails.wasteType === 'mixed_garbage' ? 1.2 : 1
    return basePrice * wasteTypeMultiplier
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Bin Size</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {binSizes.map((bin) => (
          <motion.div
            key={bin.size}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer transition-colors ${
                orderDetails.binSize === bin.size
                  ? 'border-primary'
                  : 'border-border hover:border-primary'
              }`}
              onClick={() => updateOrderDetails({ binSize: bin.size })}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{bin.label}</h3>
                <p className="text-sm text-muted-foreground mb-2">{bin.capacity}</p>
                <p className="text-lg font-bold">
                  ${getPrice(bin.size).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Note: Prices may vary based on the selected waste type.
      </p>
    </div>
  )
}

export default BinSizeStep

