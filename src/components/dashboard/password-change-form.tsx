'use client'

import { useActionState, useEffect } from 'react'
import { changePassword } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function PasswordChangeForm() {
  const [state, action, isPending] = useActionState(changePassword, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'Password updated successfully')
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <Card className="bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm dark:shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Lock className="h-5 w-5 text-orange-500 dark:text-orange-400" />
          Change Password
        </CardTitle>
        <CardDescription>Update your account password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new_password" className="text-zinc-600 dark:text-zinc-400">New Password</Label>
            <Input
              id="new_password"
              name="new_password"
              type="password"
              placeholder="Enter new password"
              className="bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:border-orange-500/50"
              required
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm_password" className="text-zinc-600 dark:text-zinc-400">Confirm Password</Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Confirm new password"
              className="bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:border-orange-500/50"
              required
              minLength={6}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
