import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserRoleForm } from './user-role-form'

export default async function ProfilePage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/login')
  }

  const role = user.publicMetadata.role || 'client'

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Account Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p>{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{user.emailAddresses[0]?.emailAddress}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="capitalize">{role}</p>
              </div>
            </div>
          </div>

          <UserRoleForm initialRole={role} />
        </CardContent>
      </Card>
    </div>
  )
}
