"use client"

import React, { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OrderDetails, WizardContextType } from '../../types/wizard'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import WasteTypeStep from './steps/WasteTypeStep'
import BinSizeStep from './steps/BinSizeStep'
import BinPlacementStep from './steps/BinPlacementStep'
import ContactInfoStep from './steps/ContactInfoStep'
import PaymentStep from './steps/PaymentStep'


const WizardContext = createContext<WizardContextType | undefined>(undefined)

export const useWizard = () => {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider')
  }
  return context
}

const OrderWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    wasteType: null,
    binSize: null,
    binPlacement: null,
    address: '',
    deliveryDate: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  })

  const updateOrderDetails = (details: Partial<OrderDetails>) => {
    setOrderDetails((prev) => ({ ...prev, ...details }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))
  const goToStep = (step: number) => setCurrentStep(step)

  const steps = [
    WasteTypeStep,
    BinSizeStep,
    BinPlacementStep,
    ContactInfoStep,
    PaymentStep,
  ]

  const CurrentStepComponent = steps[currentStep - 1]

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        orderDetails,
        updateOrderDetails,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-background rounded-xl shadow-lg">
        <Progress value={(currentStep / steps.length) * 100} className="mb-8" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-8">
          <Button onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          <Button onClick={nextStep} disabled={currentStep === steps.length}>
            {currentStep === steps.length ? 'Submit Order' : 'Next'}
          </Button>
        </div>
      </div>
    </WizardContext.Provider>
  )
}

export default OrderWizard

