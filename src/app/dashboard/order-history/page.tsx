"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Truck, Package } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for orders
const orders = [
  { id: 1, date: '2023-05-01', type: 'Construction', size: 'Medium', status: 'Completed' },
  { id: 2, date: '2023-06-15', type: 'Demolition', size: 'Large', status: 'In Progress' },
  { id: 3, date: '2023-07-20', type: 'Renovation', size: 'Small', status: 'Scheduled' },
  { id: 4, date: '2023-08-05', type: 'Construction', size: 'Medium', status: 'Completed' },
  { id: 5, date: '2023-09-10', type: 'Demolition', size: 'Large', status: 'In Progress' },
]

export default function OrderHistoryPage() {
  const [date, setDate] = useState<Date>()
  const [status, setStatus] = useState<string>()

  const filteredOrders = orders.filter(order => {
    if (date && new Date(order.date).toDateString() !== date.toDateString()) {
      return false
    }
    if (status && order.status !== status) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order History</h1>
      
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

        <Select onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          onClick={() => {
            setDate(undefined)
            setStatus(undefined)
          }}
        >
          Reset Filters
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{format(new Date(order.date), 'PP')}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.size}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

