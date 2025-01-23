import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useWizard } from "../OrderWizard"
import type { BinPlacement } from "@/types/wizard"
import { MapPin, AlertTriangle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

const binPlacementSchema = z.object({
  placementType: z.enum(["right_side", "left_side", "on_lawn"]),
})

const placementOptions: { value: BinPlacement; label: string; description: string }[] = [
  {
    value: "right_side",
    label: "Right Side",
    description: "Place the bin on the right side of your property.",
  },
  {
    value: "left_side",
    label: "Left Side",
    description: "Place the bin on the left side of your property.",
  },
  {
    value: "on_lawn",
    label: "On the Lawn",
    description: "Place the bin on your lawn. Additional fee applies.",
  },
]

const BinPlacementStep: React.FC = () => {
  const { orderDetails, updateOrderDetails, pricingInfo, nextStep } = useWizard()

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(binPlacementSchema),
    defaultValues: {
      placementType: orderDetails.placementType,
    },
  })

  const selectedPlacement = watch("placementType")

  const onSubmit = (data: z.infer<typeof binPlacementSchema>) => {
    updateOrderDetails(data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-300">
          Choose where you'd like the bin to be placed on your property. Please ensure there's clear access to the
          chosen area.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placementOptions.map((option) => (
            <motion.div key={option.value} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPlacement === option.value ? "ring-2 ring-orange-500 dark:ring-orange-400" : "hover:shadow-md"
                }`}
                onClick={() => setValue("placementType", option.value)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="mr-2 h-5 w-5 text-orange-500 dark:text-orange-400" />
                    <h3 className="font-semibold text-lg">{option.label}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{option.description}</p>
                  {pricingInfo.placementFees[option.value] > 0 && (
                    <div className="flex items-center text-orange-600 dark:text-orange-400">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <p className="text-sm font-semibold">
                        Additional fee: ${pricingInfo.placementFees[option.value]}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {errors.placementType && <p className="text-red-500 text-sm mt-2">{errors.placementType.message}</p>}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Note: Placing the bin on the lawn incurs an additional fee. Please ensure there's clear access to the chosen
          placement area.
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

export default BinPlacementStep

