import { useWizard } from './OrderWizard'
import { Card, CardContent } from '@/components/ui/card'

export function CurrentCost() {
  const { calculateTotalCost } = useWizard()
  const totalCost = calculateTotalCost()

  return (
    <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">Estimated Total</h3>
        <p className="text-3xl font-bold">${totalCost.toFixed(2)}</p>
        <p className="text-xs mt-1 opacity-80">
          *Final price may vary based on additional services or changes.
        </p>
      </CardContent>
    </Card>
  )
}

