import { useWizard } from './OrderWizard'
import { Card, CardContent } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'

export function CurrentCost() {
  const { calculateTotalCost, orderDetails } = useWizard()
  const totalCost = calculateTotalCost()

  const hasSelection = orderDetails.binSize || orderDetails.wasteType || orderDetails.binPlacement

  return (
    <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
      <CardContent className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={totalCost}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-1">Estimated Total</h3>
            <p className="text-3xl font-bold">
              ${hasSelection ? totalCost.toFixed(2) : '0.00'}
            </p>
            <p className="text-xs mt-1 opacity-80">
              {hasSelection ? (
                '*Final price may vary based on additional services or changes.'
              ) : (
                'Select options to see pricing'
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

