'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

export function UserRoleForm({ initialRole }: { initialRole: string }) {
  const [role, setRole] = useState(initialRole)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useUser()

  const handleSubmit = async () => {
    if (!user) return
    
    setIsSubmitting(true)
    try {
      await user.update({
        publicMetadata: {
          role
        }
      })
      toast({
        title: 'Success',
        description: 'Your role has been updated',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update role',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Update Role</h3>
      <div className="flex items-center gap-4">
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="contractor">Contractor</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || role === initialRole}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
