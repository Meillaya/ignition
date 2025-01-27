import Image from 'next/image'
import { Button } from '@/app/_components/ui/button'

export default function AboutSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          About Fox In The Truck
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Revolutionizing construction waste management for a sustainable future.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="fade-in-up" style={{ animationDelay: '100ms' }}>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            At Fox In The Truck, we're passionate about transforming the construction industry's approach to waste management. Founded in 2020, our mission is to make sustainable waste disposal accessible, efficient, and cost-effective for construction projects of all sizes.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Our team of environmental experts and tech innovators work tirelessly to develop cutting-edge solutions that not only streamline the waste management process but also minimize environmental impact. We believe that responsible waste management is key to building a sustainable future for our planet.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="outline" className="rounded-full text-orange-500 dark:text-orange-400 border-orange-500 dark:border-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900">Innovation</Button>
            <Button variant="outline" className="rounded-full text-orange-500 dark:text-orange-400 border-orange-500 dark:border-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900">Sustainability</Button>
            <Button variant="outline" className="rounded-full text-orange-500 dark:text-orange-400 border-orange-500 dark:border-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900">Efficiency</Button>
            <Button variant="outline" className="rounded-full text-orange-500 dark:text-orange-400 border-orange-500 dark:border-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900">Responsibility</Button>
          </div>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/images/team.jpg"
            alt="Fox In The Truck Team"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Trusted by Industry Leaders</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Image src="/images/logo1.png" alt="Company Logo 1" width={200} height={100} className="grayscale hover:grayscale-0 transition-all duration-300" />
          <Image src="/images/logo2.png" alt="Company Logo 2" width={200} height={100} className="grayscale hover:grayscale-0 transition-all duration-300" />
          <Image src="/images/logo3.png" alt="Company Logo 3" width={200} height={100} className="grayscale hover:grayscale-0 transition-all duration-300" />
          <Image src="/images/logo4.png" alt="Company Logo 4" width={200} height={100} className="grayscale hover:grayscale-0 transition-all duration-300" />
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">What Our Clients Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-300 italic mb-4">"Fox In The Truck has completely transformed our waste management process. Their efficient system has saved us time and money while helping us meet our sustainability goals."</p>
            <p className="font-semibold text-gray-900 dark:text-white">- John Doe, Project Manager at XYZ Construction</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-300 italic mb-4">"The real-time analytics provided by Fox In The Truck have been invaluable in optimizing our waste disposal strategies. Highly recommended!"</p>
            <p className="font-semibold text-gray-900 dark:text-white">- Jane Smith, Sustainability Director at ABC Developers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

