import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { 
  FileText, Calendar, MessageSquare, Clock,
  DollarSign, Briefcase, CheckCircle, TrendingUp
} from 'lucide-react'

export default function ContractorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contractor Dashboard</h1>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" /> Submit Proposal
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Clock className="h-4 w-4" /> Update Status
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Manage Schedule
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> Message Clients
        </Button>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">5 new opportunities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">3 due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,450</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">18 successful projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Work Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', title: 'Site Visit - Downtown Project', type: 'Visit' },
              { time: '11:30 AM', title: 'Waste Collection - Harbor Area', type: 'Collection' },
              { time: '02:00 PM', title: 'Client Meeting - New Project', type: 'Meeting' },
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{appointment.title}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  appointment.type === 'Visit' ? 'bg-blue-100 text-blue-800' :
                  appointment.type === 'Collection' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {appointment.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}