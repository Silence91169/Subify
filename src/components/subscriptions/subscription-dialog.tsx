'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addSubscription, updateSubscription } from '@/lib/actions/subscriptions'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  category: z.string().min(1, {
    message: 'Please select a category.',
  }),
  cost: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Cost must be a positive number.',
  }),
  billing_cycle: z.enum(['monthly', 'yearly']),
  renewal_date: z.string().min(1, {
    message: 'Please select a renewal date.',
  }),
  status: z.enum(['active', 'cancelled']).optional(),
})

interface SubscriptionDialogProps {
  subscription?: any
  trigger?: React.ReactNode
}

export function SubscriptionDialog({ subscription, trigger }: SubscriptionDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subscription?.name || '',
      category: subscription?.category || '',
      cost: subscription?.cost?.toString() || '',
      billing_cycle: subscription?.billing_cycle || 'monthly',
      renewal_date: subscription?.renewal_date || '',
      status: subscription?.status || 'active',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })

      if (subscription) {
        await updateSubscription(subscription.id, formData)
        toast.success('Subscription updated successfully')
      } else {
        await addSubscription(formData)
        toast.success('Subscription added successfully')
      }
      setOpen(false)
      form.reset()
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl h-11 px-6 border border-zinc-700/50 shadow-lg transition-all active:scale-95">
              <Plus className="mr-2 h-4 w-4" /> Add Subscription
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#09090b] border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight text-white">{subscription ? 'Edit' : 'Add'} Subscription</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {subscription ? 'Update your subscription details below.' : 'Add a new subscription to track your expenses.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-widest">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Netflix" className="bg-zinc-900 border-zinc-800 focus:ring-purple-500/50 h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-widest">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:ring-purple-500/50">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="SaaS">SaaS</SelectItem>
                          <SelectItem value="Fitness">Fitness</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                    <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-widest">Cost (₹)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-bold">₹</span>
                            <Input type="number" step="0.01" placeholder="999" className="pl-8 bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:ring-purple-500/50" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
  
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="billing_cycle"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-widest">Billing Cycle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:ring-purple-500/50">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="renewal_date"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-widest">Renewal Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:ring-purple-500/50 text-white [color-scheme:dark]" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              {subscription && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-widest">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl focus:ring-purple-500/50">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )}
              <DialogFooter className="pt-4">
                <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {subscription ? 'Save Changes' : 'Add Subscription'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
    </Dialog>
  )
}
