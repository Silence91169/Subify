'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSubscriptions(filters: { category?: string; status?: string; search?: string } = {}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  let query = supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('renewal_date', { ascending: true })

  if (filters.category && filters.category !== 'All') {
    query = query.eq('category', filters.category)
  }

  if (filters.status && filters.status !== 'All') {
    query = query.eq('status', filters.status.toLowerCase())
  }

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching subscriptions:', error)
    return []
  }

  return data
}

export async function addSubscription(formData: FormData) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError) {
    console.error('Auth error in addSubscription:', authError)
  }

  if (!user) {
    console.error('No user found in addSubscription. Session might be missing or expired.')
    throw new Error('Unauthorized')
  }

  const subscription = {
    user_id: user.id,
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    cost: parseFloat(formData.get('cost') as string),
    billing_cycle: formData.get('billing_cycle') as string,
    renewal_date: formData.get('renewal_date') as string,
    status: 'active',
  }

  const { error } = await supabase.from('subscriptions').insert([subscription])

  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/subscriptions')
}

export async function updateSubscription(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const updates = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    cost: parseFloat(formData.get('cost') as string),
    billing_cycle: formData.get('billing_cycle') as string,
    renewal_date: formData.get('renewal_date') as string,
    status: formData.get('status') as string,
  }

  const { error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/subscriptions')
}

export async function deleteSubscription(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/subscriptions')
}

export async function getDashboardStats() {
  const subscriptions = await getSubscriptions()
  
  const activeSubs = subscriptions.filter(s => s.status === 'active')
  const totalMonthlyExpense = activeSubs.reduce((acc, s) => {
    const cost = parseFloat(s.cost)
    return acc + (s.billing_cycle === 'monthly' ? cost : cost / 12)
  }, 0)

  const categoryData = activeSubs.reduce((acc: any, s) => {
    const cost = parseFloat(s.cost)
    const monthlyCost = s.billing_cycle === 'monthly' ? cost : cost / 12
    acc[s.category] = (acc[s.category] || 0) + monthlyCost
    return acc
  }, {})

  const pieChartData = Object.keys(categoryData).map(name => ({
    name,
    value: Math.round(categoryData[name] * 100) / 100
  }))

  const upcomingRenewals = activeSubs
    .filter(s => {
      const renewalDate = new Date(s.renewal_date)
      const today = new Date()
      const diffTime = renewalDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays >= 0 && diffDays <= 30
    })
    .sort((a, b) => new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime())

  return {
    totalMonthlyExpense: Math.round(totalMonthlyExpense * 100) / 100,
    activeSubsCount: activeSubs.length,
    pieChartData,
    upcomingRenewals
  }
}
