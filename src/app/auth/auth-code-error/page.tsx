'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import AuthLayout from '@/components/auth-layout'

export default function AuthCodeErrorPage() {
  return (
    <AuthLayout>
      <div className="grid gap-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Authentication Failed</h1>
            <p className="text-muted-foreground text-sm max-w-sm">
              We couldn't complete the sign-in process. This might be due to an expired link or a cancelled authorization.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild className="w-full h-11 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold">
            <Link href="/login">
              Try Again
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
