import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Truck, FileText, DollarSign, Users } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contractor Dashboard - Fox In The Truck',
  description: 'Manage your waste collection jobs',
}

import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'

export default async function ContractorDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  if (session.user.role !== 'contractor') {
    redirect('/dashboard/client')
  }
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contractor Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Jobs</CardTitle>
            <Truck className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">+4 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Jobs</CardTitle>
            <Users className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">2 pending completion</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">$5,231</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">+20% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Completion Rate</CardTitle>
            <FileText className="h-4 w-4 text-orange-500 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">95%</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">+1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Current Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[1, 2, 3].map((job) => (
                <li key={job} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Job #{job}</span>
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
            <CardTitle className="text-gray-900 dark:text-gray-100">Available Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[1, 2, 3].map((job) => (
                <li key={job} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Job #{job}</span>
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
          <Link href="/dashboard/contractor/available-jobs">
            Find New Jobs <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

