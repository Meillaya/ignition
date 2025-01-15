import { Truck, Recycle, BarChart, Leaf } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Efficient Pickup',
    description: 'Schedule waste pickups with just a few clicks, optimizing your project timeline.',
  },
  {
    icon: Recycle,
    title: 'Smart Sorting',
    description: 'Our AI-powered system ensures proper waste categorization for maximum recycling efficiency.',
  },
  {
    icon: BarChart,
    title: 'Real-time Analytics',
    description: 'Track your waste management performance and identify areas for improvement.',
  },
  {
    icon: Leaf,
    title: 'Eco-friendly Solutions',
    description: 'Minimize your environmental impact with our sustainable waste disposal methods.',
  },
]

export default function FeaturesSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Powerful Features for Efficient Waste Management
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Discover how Fox In The Truck can transform your construction waste disposal process.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 fade-in-up"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 rotating-border" />
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <feature.icon className="h-12 w-12 text-orange-500 mb-4 relative text-shadow-animation" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

