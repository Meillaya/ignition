import { Button } from '@/components/ui/button'
import { ArrowRight, Clipboard, Truck, Recycle, BarChartIcon as ChartBar } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    icon: Clipboard,
    title: 'Schedule Pickup',
    description: 'Use our easy-to-use platform to schedule your waste pickup at your convenience.',
  },
  {
    icon: Truck,
    title: 'We Collect',
    description: 'Our efficient team arrives at your site to collect the waste materials.',
  },
  {
    icon: Recycle,
    title: 'Smart Sorting',
    description: 'We use advanced technology to sort and process the collected waste.',
  },
  {
    icon: ChartBar,
    title: 'Track Progress',
    description: 'Monitor your waste management metrics and environmental impact in real-time.',
  },
]

export default function HowItWorksSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          How Fox In The Truck Works
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Our streamlined process makes waste management simple and efficient.
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-orange-50 dark:bg-gray-800 text-lg font-medium text-gray-900 dark:text-white">
            Simple 4-Step Process
          </span>
        </div>
      </div>
      <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-300 rounded-full mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <Button
          asChild
          size="lg"
          className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-white"
        >
          <Link href="/signup">
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

