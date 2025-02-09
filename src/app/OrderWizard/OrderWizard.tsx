"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { OrderDetails, WizardContextType, PricingInfo } from "@/types/wizard"
import { Button } from "@/app/_components/ui/button"
import { Progress } from "@/app/_components/ui/progress"
import WasteTypeStep from "./steps/WasteTypeStep"
import BinSizeStep from "./steps/BinSizeStep"
import BinPlacementStep from "./steps/BinPlacementStep"
import ContactInfoStep from "./steps/ContactInfoStep"
import ScheduleStep from "./steps/ScheduleStep"
import ReviewStep from "./steps/ReviewStep"
import { CurrentCost } from "./CurrentCost"
import { Card, CardContent } from "@/app/_components/ui/card"

const WizardContext = createContext<WizardContextType | undefined>(undefined)

export const useWizard = () => {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider")
  }
  return context
}

const pricingInfo: PricingInfo = {
  basePrices: {
    "6": 200,
    "8": 250,
    "10": 300,
    "14": 350,
  },
  wasteTypeMultipliers: {
    mixed_garbage: 1.2,
    asphalt: 1.1,
    dirt: 1.0,
    mixed_dirt: 1.1,
    brick_and_block: 1.15,
    concrete: 1.2,
    brick_block_concrete: 1.25,
  },
  placementFees: {
    right_side: 0,
    left_side: 0,
    on_lawn: 50,
  },
}

const OrderWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderDetails, setOrderDetails] = useState<Partial<OrderDetails>>({})

  const updateOrderDetails = (details: Partial<OrderDetails>) => {
    setOrderDetails((prev) => ({ ...prev, ...details }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))
  const goToStep = (step: number) => setCurrentStep(step)

  const calculateTotalCost = () => {
    let total = 0
    if (orderDetails.binSize) {
      total += pricingInfo.basePrices[orderDetails.binSize]
    }
    if (orderDetails.wasteType) {
      total *= pricingInfo.wasteTypeMultipliers[orderDetails.wasteType]
    }
    if (orderDetails.placementType) {
      total += pricingInfo.placementFees[orderDetails.placementType]
    }
    if (orderDetails.quantity) {
      total *= orderDetails.quantity
    }
    return Number.parseFloat(total.toFixed(2))
  }

  const [totalCost, setTotalCost] = useState(calculateTotalCost())

  useEffect(() => {
    setTotalCost(calculateTotalCost())
  }, [orderDetails])

  const steps = [
    { component: WasteTypeStep, label: "Waste Type" },
    { component: BinSizeStep, label: "Bin Size" },
    { component: BinPlacementStep, label: "Bin Placement" },
    { component: ContactInfoStep, label: "Contact Info" },
    { component: ScheduleStep, label: "Schedule" },
    { component: ReviewStep, label: "Review" },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        orderDetails,
        updateOrderDetails,
        nextStep,
        prevStep,
        goToStep,
        calculateTotalCost: () => totalCost,
        pricingInfo,
      }}
    >
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">New Waste Disposal Order</h2>
            <p className="text-gray-600 dark:text-gray-300">Complete the following steps to place your order.</p>
          </div>
          <div className="mb-8">
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-sm font-medium ${
                    index + 1 <= currentStep
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {step.label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{steps[currentStep - 1].label}</h3>
            <CurrentCost />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-8">
            <Button onClick={prevStep} disabled={currentStep === 1} variant="outline" className="px-6">
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className="px-6 bg-orange-500 hover:bg-orange-600 text-white"
            >
              {currentStep === steps.length ? "Submit Order" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </WizardContext.Provider>
  )
}

export default OrderWizard

