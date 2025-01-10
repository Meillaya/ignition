import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Available Jobs - EcoWaste',
  description: 'View and accept available waste disposal jobs',
}

export default function AvailableJobsPage() {
  // Mock data - replace with actual data fetching
  const jobs = [
    { id: 1, date: '2023-08-01', type: 'Mixed Waste', location: 'New York, NY' },
    { id: 2, date: '2023-08-03', type: 'Construction Debris', location: 'Los Angeles, CA' },
    { id: 3, date: '2023-08-05', type: 'Recyclables', location: 'Chicago, IL' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Jobs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Open Waste Disposal Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-semibold">Job #{job.id}</p>
                  <p className="text-sm text-muted-foreground">{job.date} - {job.type}</p>
                  <p className="text-sm text-muted-foreground">{job.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm">Accept Job</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

