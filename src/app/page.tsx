import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ArrowRight, Truck, Recycle, Clock, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold">EcoWaste</span>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-foreground/60 hover:text-foreground">
                Features
              </Link>
              <Link href="#services" className="text-foreground/60 hover:text-foreground">
                Services
              </Link>
              <Link href="#about" className="text-foreground/60 hover:text-foreground">
                About
              </Link>
              <Button asChild variant="outline">
                <Link href="/login">
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Efficient Construction Waste Management Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your construction waste disposal with our modern platform. 
              Connect with reliable contractors and manage your projects efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#learn-more">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-lg">
              <Truck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Pickup</h3>
              <p className="text-muted-foreground">
                Schedule waste pickups with just a few clicks and get fast service.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-lg">
              <Recycle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-muted-foreground">
                We prioritize recycling and sustainable waste management practices.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-lg">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your waste disposal progress in real-time.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-lg">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compliance</h3>
              <p className="text-muted-foreground">
                Stay compliant with local regulations and environmental standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 via-transparent to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to streamline your waste management?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl">
                Join thousands of construction companies and contractors who trust 
                EcoWaste for their waste management needs.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} EcoWaste. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

