import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import FeaturesSection from '@/components/landing/FeaturesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import AboutSection from '@/components/landing/AboutSection'
import { ModeToggle } from '@/components/ui/mode-toggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-orange-950 dark:via-gray-950 dark:to-orange-950 relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-900/10 to-red-900/10 backdrop-blur-md border-b border-white/10 dark:border-gray-800/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="foxinthetruck.jpg"
                alt="Fox In The Truck"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                Fox In The Truck
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="#features" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors duration-200"
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors duration-200"
              >
                How It Works
              </Link>
              <Link 
                href="#about" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors duration-200"
              >
                About
              </Link>
            </div>

            {/* ModeToggle and CTA Button */}
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button
                asChild
                className="bg-white dark:bg-orange-600 text-orange-600 dark:text-white hover:bg-orange-50 dark:hover:bg-orange-700 rounded-full px-6"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Subtle pattern background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/cube-pattern.svg')] bg-repeat opacity-5" />
      </div>

      {/* Decorative prism effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10 blur-3xl transform rotate-12 animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-orange-500/10 via-red-500/10 to-yellow-500/10 blur-3xl transform -rotate-12 animate-pulse" />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Image
                src="/foxinthetruck.jpg"
                alt="Fox In The Truck"
                width={200}
                height={200}
                className="rounded-full shadow-lg"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Smart Dumpster Rental
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 ml-2">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Streamline your construction waste disposal with our friendly and efficient service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-all duration-300"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <FeaturesSection />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-orange-50 dark:bg-gray-800">
          <HowItWorksSection />
        </section>

        {/* About Section */}
        {/* <section id="about" className="py-20">
          <AboutSection />
        </section> */}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center gap-2">
              <Image
                src="/foxinthetruck.jpg"
                alt="Fox In The Truck"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                Fox In The Truck
              </span>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-orange-600">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-orange-600">Terms of Service</Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-orange-600">Contact</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-500 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} Fox In The Truck. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

