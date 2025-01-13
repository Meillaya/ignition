"use client"

import { useState } from 'react'
import  Metadata  from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar, MapPin, MoreHorizontal, Search, Truck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Jobs - Fox In The Truck',
  description: 'View and manage your current waste collection jobs',
}

interface Job {
  id: string
  client: string
  address: string
  date: string
  status: 'Scheduled' | 'In Progress' | 'Completed'
  wasteType: string
  binSize: string
}

const mockJobs: Job[] = [
  {
    id: 'JOB001',
    client: 'Acme Construction',
    address: '123 Main St, Anytown, USA',
    date: '2023-08-15',
    status: 'Scheduled',
    wasteType: 'Mixed Garbage',
    binSize: '10 yards',
  },
  {
    id: 'JOB002',
    client: 'BuildRight Inc.',
    address: '456 Oak Ave, Somewhere, USA',
    date: '2023-08-16',
    status: 'In Progress',
    wasteType: 'Concrete',
    binSize: '14 yards',
  },
  {
    id: 'JOB003',
    client: 'Green Renovations',
    address: '789 Pine Rd, Elsewhere, USA',
    date: '2023-08-17',
    status: 'Completed',
    wasteType: 'Asphalt',
    binSize: '8 yards',
  },
  {
    id: 'JOB004',
    client: 'Urban Developers',
    address: '101 Cedar Ln, Nowhere, USA',
    date: '2023-08-18',
    status: 'Scheduled',
    wasteType: 'Mixed Dirt',
    binSize: '6 yards',
  },
  {
    id: 'JOB005',
    client: 'Skyline Builders',
    address: '202 Elm St, Anystate, USA',
    date: '2023-08-19',
    status: 'In Progress',
    wasteType: 'Brick and Block',
    binSize: '10 yards',
  },
]

export default function MyJobsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredJobs = mockJobs.filter(job =>
    job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Jobs</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Truck className="mr-2 h-4 w-4" /> Start Next Job
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Waste Type</TableHead>
                  <TableHead>Bin Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                        {job.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        {job.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(job.status)}`}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.wasteType}</TableCell>
                    <TableCell>{job.binSize}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Update status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Contact client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

