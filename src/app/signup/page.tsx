'use client'

import { useSearchParams } from 'next/navigation'
import { signup, signInWithGoogle } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/components/auth-layout'
import Link from 'next/link'
import { Suspense, useState, useActionState } from 'react'
import { Icons } from '@/components/icons'
import { Loader2 } from 'lucide-react'

function SignupForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [state, formAction, isPending] = useActionState(signup, null)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      const result = await signInWithGoogle()
      if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2 text-left">
        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
        <p className="text-muted-foreground text-sm">
          Join 10,000+ users tracking their subscriptions effortlessly.
        </p>
      </div>

      <div className="grid gap-4">
        <Button 
          variant="outline" 
          type="button" 
          disabled={isGoogleLoading || isPending}
          onClick={handleGoogleSignIn}
          className="w-full h-11 font-medium bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Sign up with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-950 px-2 text-muted-foreground font-medium">
              Or continue with
            </span>
          </div>
        </div>

        <form action={formAction}>
          <div className="grid gap-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                {error}
              </div>
            )}
            <div className="grid gap-1.5">
              <Label htmlFor="full_name" className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                disabled={isPending || isGoogleLoading}
                className="h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-purple-500"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">Email address</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isPending || isGoogleLoading}
                className="h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-purple-500"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                disabled={isPending || isGoogleLoading}
                className="h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-purple-500"
                required
              />
            </div>
            <Button disabled={isPending || isGoogleLoading} className="w-full h-11 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-semibold mt-2">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </div>
        </form>
      </div>

      <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary font-medium"
        >
          Login Here
        </Link>
      </p>
    </div>
  )
}

export default function SignupPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-zinc-300" /></div>}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  )
}
