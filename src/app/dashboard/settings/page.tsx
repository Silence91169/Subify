import { ModeToggle } from '@/components/mode-toggle'
import { PasswordChangeForm } from '@/components/dashboard/password-change-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette } from 'lucide-react'

export default async function SettingsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-zinc-500 text-lg">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-8 max-w-4xl">
        <PasswordChangeForm />

        <Card className="bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm dark:shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Palette className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how Subify looks on your device.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Theme Mode</p>
              <p className="text-sm text-zinc-500">Switch between light and dark themes.</p>
            </div>
            <ModeToggle />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
