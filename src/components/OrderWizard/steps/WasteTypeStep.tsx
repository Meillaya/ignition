import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useWizard } from '../OrderWizard'
import { WasteType } from '@/types/wizard'

const wasteTypes: { type: WasteType; label: string; description: string; image: string }[] = [
  {
    type: 'mixed_garbage',
    label: 'Mixed Garbage',
    description: 'General waste from construction or renovation projects.',
    image: '/mixed.jpg',
  },
  {
    type: 'asphalt',
    label: 'Asphalt',
    description: 'Broken up asphalt from driveways or roads.',
    image: '/asphalt.jpg',
  },
  {
    type: 'dirt',
    label: 'Dirt',
    description: 'Clean fill dirt from excavation projects.',
    image: '/dirt.jpg',
  },
  {
    type: 'mixed_dirt',
    label: 'Mixed Dirt',
    description: 'Dirt mixed with small amounts of other materials.',
    image: '/mix-dirt.jpg',
  },
  {
    type: 'brick_and_block',
    label: 'Brick and Block',
    description: 'Broken bricks and concrete blocks.',
    image: '/bricks-and-blocks.jpg',
  },
  {
    type: 'concrete',
    label: 'Concrete',
    description: 'Broken concrete from demolition projects.',
    image: '/concrete.jpg',
  },
  {
    type: 'brick_block_concrete',
    label: 'Brick, Block and Concrete',
    description: 'Mixed masonry waste.',
    image: '/bricks-blocks-concrete.png',
  },
]

const WasteTypeStep: React.FC = () => {
  const { orderDetails, updateOrderDetails } = useWizard()

  return (
    <div className="space-y-6">
      <p className="text-gray-600 dark:text-gray-300">
        Select the type of waste you need to dispose of. This helps us determine the best handling method and pricing.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wasteTypes.map((waste) => (
          <motion.div
            key={waste.type}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 ${
                orderDetails.wasteType === waste.type
                  ? 'ring-2 ring-orange-500 dark:ring-orange-400'
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateOrderDetails({ wasteType: waste.type })}
            >
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src={waste.image}
                    alt={waste.label}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-2 left-3 text-white font-semibold text-lg">
                    {waste.label}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{waste.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WasteTypeStep

