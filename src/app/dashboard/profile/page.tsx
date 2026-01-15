import { createClient } from '@/utils/supabase/server'
import { ProfileForm } from '@/components/dashboard/profile-form'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Profile
        </h1>
        <p className="text-zinc-500 text-lg">
          View and update your personal information.
        </p>
      </div>

      <div className="grid gap-8 max-w-4xl">
        <ProfileForm user={user} />
      </div>
    </div>
  )
}
