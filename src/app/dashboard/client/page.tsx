import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { 
  Plus, FileText, CreditCard, MessageSquare, 
  Clock, Calendar, DollarSign, CheckCircle 
} from 'lucide-react'

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Client Dashboard</h1>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" /> Review Proposals
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Manage Payments
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" /> Message Contractors
        </Button>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 pending completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">12 projects completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: '2024-03-15', title: 'Site Cleanup Project', status: 'In Progress' },
              { date: '2024-03-20', title: 'Waste Removal', status: 'Scheduled' },
              { date: '2024-03-25', title: 'Recycling Program', status: 'Pending' },
            ].map((project, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">{project.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'Scheduled' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}