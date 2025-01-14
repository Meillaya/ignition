"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getAvailableJobs, claimJob } from '@/lib/api/orders'
import { useSession } from 'next-auth/react'

export default function JobBoard() {
  const [jobs, setJobs] = useState([])
  const { data: session } = useSession()

  const loadJobs = async () => {
    const availableJobs = await getAvailableJobs()
    setJobs(availableJobs)
  }

  const handleClaimJob = async (jobId: string) => {
    if (!session?.user?.id) return
    await claimJob(jobId, session.user.id)
    loadJobs()
  }

  useEffect(() => {
    loadJobs()
  }, [])

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Available Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.map(job => (
          <div key={job.id} className="border p-4 mb-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{job.wasteType} - {job.binSize}</h3>
                <p>{job.address}</p>
                <p>${job.totalCost}</p>
              </div>
              <Button 
                onClick={() => handleClaimJob(job.id)}
                disabled={!session?.user}
              >
                Claim Job
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
