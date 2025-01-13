import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useWizard } from '../OrderWizard'
import { BinSize } from '@/types/wizard'
import { Truck } from 'lucide-react'

const binSizes: { size: BinSize; label: string; capacity: string }[] = [
  { size: '6', label: '6 Cubic Yards', capacity: 'Ideal for small projects' },
  { size: '8', label: '8 Cubic Yards', capacity: 'Suitable for medium-sized jobs' },
  { size: '10', label: '10 Cubic Yards', capacity: 'Perfect for larger renovations' },
  { size: '14', label: '14 Cubic Yards', capacity: 'Best for major construction' },
]

const BinSizeStep: React.FC = () => {
  const { orderDetails, updateOrderDetails, calculateTotalCost } = useWizard()

  return (
    <div className="space-y-6">
      <p className="text-gray-600 dark:text-gray-300">
        Choose the appropriate bin size for your project. If you're unsure, it's better to go with a larger size to avoid overflow.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {binSizes.map((bin) => (
          <motion.div
            key={bin.size}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 ${
                orderDetails.binSize === bin.size
                  ? 'ring-2 ring-orange-500 dark:ring-orange-400'
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateOrderDetails({ binSize: bin.size })}
            >
              <CardContent className="p-6 flex items-center">
                <div className="mr-4">
                  <Truck size={48} className="text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{bin.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{bin.capacity}</p>
                  <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    ${calculateTotalCost().toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Note: Prices may vary based on the selected waste type and placement options.
      </p>
    </div>
  )
}

export default BinSizeStep

