import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Order History - EcoWaste',
  description: 'View your past waste disposal orders',
}

export default function OrderHistoryPage() {
  // Mock data - replace with actual data fetching
  const orders = [
    { id: 1, date: '2023-05-01', status: 'Completed', type: 'Mixed Waste' },
    { id: 2, date: '2023-06-15', status: 'In Progress', type: 'Construction Debris' },
    { id: 3, date: '2023-07-20', status: 'Scheduled', type: 'Recyclables' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Past Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date} - {order.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
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

