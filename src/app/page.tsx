import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Truck, Recycle, Clock, Shield, ChevronRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-secondary/20 via-secondary/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">EcoWaste</span>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-foreground/60 hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-foreground/60 hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-foreground/60 hover:text-foreground transition-colors">
                Testimonials
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
      <section className="relative pt-20 pb-40 sm:pt-24 sm:pb-48">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">
                Revolutionize
              </span>{" "}
              Your Waste Management
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your construction waste disposal with our cutting-edge platform. 
              Connect with reliable contractors and manage your projects efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 transition-all duration-300 shadow-lg hover:shadow-xl" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 hover:bg-secondary/10 transition-all duration-300" asChild>
                <Link href="#learn-more">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">EcoWaste</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Quick Pickup", description: "Schedule waste pickups with just a few clicks and get fast service." },
              { icon: Recycle, title: "Eco-Friendly", description: "We prioritize recycling and sustainable waste management practices." },
              { icon: Clock, title: "Real-Time Tracking", description: "Monitor your waste disposal progress in real-time." },
              { icon: Shield, title: "Compliance", description: "Stay compliant with local regulations and environmental standards." },
            ].map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border group hover:border-primary/50">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-3 inline-block mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            How <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">EcoWaste</span> Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { step: 1, title: "Request a Pickup", description: "Easily schedule your waste collection through our intuitive platform." },
              { step: 2, title: "We Collect", description: "Our certified contractors arrive on time to collect your construction waste." },
              { step: 3, title: "Proper Disposal", description: "We ensure your waste is disposed of responsibly and in compliance with regulations." },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary hidden md:block" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Construction Manager", quote: "EcoWaste has streamlined our waste management process, saving us time and money." },
              { name: "Jane Smith", role: "Project Coordinator", quote: "The real-time tracking feature has been a game-changer for our project timelines." },
              { name: "Mike Johnson", role: "Environmental Compliance Officer", quote: "Thanks to EcoWaste, staying compliant with regulations has never been easier." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full mr-4" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to streamline your waste management?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl">
                Join thousands of construction companies and contractors who trust 
                EcoWaste for their waste management needs.
              </p>
              <Button size="lg" variant="secondary" className="text-primary font-semibold px-8 py-6 rounded-full hover:bg-white transition-colors duration-300" asChild>
                <Link href="/signup">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-secondary rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-primary rounded-full opacity-20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} EcoWaste. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

