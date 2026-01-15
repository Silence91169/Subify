'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/components/auth-layout'
import Link from 'next/link'
import { useState } from 'react'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Mocking password reset for now as it needs more complex setup
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <AuthLayout>
      <div className="grid gap-6">
        <div className="grid gap-2 text-left">
          <Link 
            href="/login" 
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Forgot password?</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-primary/10 text-primary p-6 rounded-2xl border border-primary/20">
            <h3 className="font-semibold mb-2">Check your inbox</h3>
            <p className="text-sm leading-relaxed">
              If an account exists for that email, we've sent instructions to reset your password.
            </p>
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Try another email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
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
                  disabled={isLoading}
                  className="h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-purple-500"
                  required
                />
              </div>
              <Button disabled={isLoading} className="w-full h-11 bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-semibold mt-2">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
