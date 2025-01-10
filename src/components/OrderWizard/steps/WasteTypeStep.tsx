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
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Waste Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wasteTypes.map((waste) => (
          <motion.div
            key={waste.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer transition-colors ${
                orderDetails.wasteType === waste.type
                  ? 'border-primary'
                  : 'border-border hover:border-primary'
              }`}
              onClick={() => updateOrderDetails({ wasteType: waste.type })}
            >
              <CardContent className="p-4">
                <div className="relative h-40 mb-4">
                  <Image
                    src={waste.image}
                    alt={waste.label}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <h3 className="font-semibold mb-2">{waste.label}</h3>
                <p className="text-sm text-muted-foreground">{waste.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WasteTypeStep

