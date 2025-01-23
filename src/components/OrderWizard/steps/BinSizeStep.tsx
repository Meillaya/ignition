import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useWizard } from "../OrderWizard"
import type { BinSize } from "@/types/wizard"
import { Truck } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

const binSizeSchema = z.object({
  binSize: z.enum(["6", "8", "10", "14"]),
  quantity: z.number().int().positive(),
})

const binSizes: { size: BinSize; label: string; capacity: string }[] = [
  { size: "6", label: "6 Cubic Yards", capacity: "Ideal for small projects" },
  { size: "8", label: "8 Cubic Yards", capacity: "Suitable for medium-sized jobs" },
  { size: "10", label: "10 Cubic Yards", capacity: "Perfect for larger renovations" },
  { size: "14", label: "14 Cubic Yards", capacity: "Best for major construction" },
]

const BinSizeStep: React.FC = () => {
  const { orderDetails, updateOrderDetails, calculateTotalCost, pricingInfo, nextStep } = useWizard()

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(binSizeSchema),
    defaultValues: {
      binSize: orderDetails.binSize,
      quantity: orderDetails.quantity || 1,
    },
  })

  const selectedBinSize = watch("binSize")
  const quantity = watch("quantity")

  const onSubmit = (data: z.infer<typeof binSizeSchema>) => {
    updateOrderDetails(data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-300">
          Choose the appropriate bin size for your project. If you're unsure, it's better to go with a larger size to
          avoid overflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {binSizes.map((bin) => (
            <motion.div key={bin.size} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  selectedBinSize === bin.size ? "ring-2 ring-orange-500 dark:ring-orange-400" : "hover:shadow-md"
                }`}
                onClick={() => setValue("binSize", bin.size)}
              >
                <CardContent className="p-6 flex items-center">
                  <div className="mr-4">
                    <Truck size={48} className="text-orange-500 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{bin.label}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{bin.capacity}</p>
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      ${pricingInfo.basePrices[bin.size].toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {errors.binSize && <p className="text-red-500 text-sm mt-2">{errors.binSize.message}</p>}
        <div className="flex items-center space-x-4">
          <label htmlFor="quantity" className="font-medium">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            className="border rounded p-2 w-20"
            value={quantity}
            onChange={(e) => setValue("quantity", Number.parseInt(e.target.value))}
          />
        </div>
        {errors.quantity && <p className="text-red-500 text-sm mt-2">{errors.quantity.message}</p>}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Note: Final price may vary based on the selected waste type and placement options.
        </p>
        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}

export default BinSizeStep

