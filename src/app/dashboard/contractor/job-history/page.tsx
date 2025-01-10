import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Job History - EcoWaste',
  description: 'View your completed waste disposal jobs',
}

export default function JobHistoryPage() {
  // Mock data - replace with actual data fetching
  const jobs = [
    { id: 1, date: '2023-05-01', status: 'Completed', type: 'Mixed Waste', location: 'New York, NY' },
    { id: 2, date: '2023-06-15', status: 'In Progress', type: 'Construction Debris', location: 'Los Angeles, CA' },
    { id: 3, date: '2023-07-20', status: 'Completed', type: 'Recyclables', location: 'Chicago, IL' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Job History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Past Jobs</CardTitle>
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
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    job.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status}
                  </span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

