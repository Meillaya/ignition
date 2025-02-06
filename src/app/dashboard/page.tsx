import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Button } from '@/app/_components/ui/button'
import { ArrowRight, Package, FileText, Truck, DollarSign } from 'lucide-react'
import Link from 'next/link'
import  Metadata  from 'next'
import { api, HydrateClient } from "@/trpc/server";
export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Client Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">18</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Projects</CardTitle>
            <Truck className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">2 pending pickup</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$2,345</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Recycling Rate</CardTitle>
            <FileText className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">78%</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[1, 2, 3].map((order) => (
                <li key={order} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Order #{order}</span>
                  <Button variant="ghost" size="sm" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200">
                    View <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Upcoming Pickups</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[1, 2, 3].map((pickup) => (
                <li key={pickup} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Pickup #{pickup}</span>
                  <Button variant="ghost" size="sm" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-200">
                    Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700 dark:text-white transition-colors duration-200">
          <Link href="/dashboard/new-order">
            New Waste Disposal Order <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

