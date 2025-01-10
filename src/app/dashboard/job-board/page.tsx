"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { MapPin, CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for jobs
const jobs = [
  { id: 1, date: '2023-10-01', type: 'Construction', size: 'Medium', location: 'New York, NY', status: 'Open' },
  { id: 2, date: '2023-10-15', type: 'Demolition', size: 'Large', location: 'Los Angeles, CA', status: 'Open' },
  { id: 3, date: '2023-10-20', type: 'Renovation', size: 'Small', location: 'Chicago, IL', status: 'Open' },
  { id: 4, date: '2023-11-05', type: 'Construction', size: 'Medium', location: 'Houston, TX', status: 'Open' },
  { id: 5, date: '2023-11-10', type: 'Demolition', size: 'Large', location: 'Phoenix, AZ', status: 'Open' },
]

export default function JobBoardPage() {
  const [date, setDate] = useState<Date>()
  const [location, setLocation] = useState<string>('')

  const filteredJobs = jobs.filter(job => {
    if (date && new Date(job.date).toDateString() !== date.toDateString()) {
      return false
    }
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Job Board</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full sm:w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-[280px]"
        />

        <Button
          variant="ghost"
          onClick={() => {
            setDate(undefined)
            setLocation('')
          }}
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.type} Waste Removal</CardTitle>
              <CardDescription>{format(new Date(job.date), 'PPP')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="mt-2 space-x-2">
                <Badge>{job.size}</Badge>
                <Badge variant="outline">{job.status}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Accept Job</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

