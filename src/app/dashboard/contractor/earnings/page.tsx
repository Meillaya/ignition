import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const metadata: Metadata = {
  title: 'Earnings - EcoWaste',
  description: 'View your earnings from waste disposal jobs',
}

export default function EarningsPage() {
  // Mock data - replace with actual data fetching
  const earningsData = [
    { month: 'Jan', earnings: 4000 },
    { month: 'Feb', earnings: 3000 },
    { month: 'Mar', earnings: 5000 },
    { month: 'Apr', earnings: 4500 },
    { month: 'May', earnings: 6000 },
    { month: 'Jun', earnings: 5500 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Earnings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {earningsData.map((data, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <span>{data.month}</span>
                <span className="font-semibold">${data.earnings}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

