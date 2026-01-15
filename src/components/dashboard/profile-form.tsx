'use client'

import { useActionState, useEffect } from 'react'
import { updateProfile } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Calendar, Fingerprint, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { User as SupabaseUser } from '@supabase/supabase-js'

export function ProfileForm({ user }: { user: SupabaseUser }) {
  const [state, action, isPending] = useActionState(updateProfile, null)

  useEffect(() => {
    if (state?.success) {
      toast.success('Profile updated successfully')
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  const createdAt = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm dark:shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Profile Information
        </CardTitle>
        <CardDescription>Update your personal details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-zinc-600 dark:text-zinc-400">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              defaultValue={user.user_metadata?.full_name || ''}
              placeholder="Your Name"
              className="bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:border-purple-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" /> Email Address
            </Label>
            <Input
              id="email"
              value={user.email || ''}
              disabled
              className="bg-zinc-100 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800 text-zinc-500 cursor-not-allowed"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" /> Account Created
              </Label>
              <div className="text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg text-sm">
                {createdAt}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                <Fingerprint className="h-3.5 w-3.5" /> User ID
              </Label>
              <div className="text-zinc-500 bg-zinc-100 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-lg text-xs font-mono truncate">
                {user.id}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
