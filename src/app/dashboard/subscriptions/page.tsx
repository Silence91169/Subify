import { getSubscriptions } from '@/lib/actions/subscriptions'
import { SubscriptionList } from '@/components/subscriptions/subscription-list'

export default async function SubscriptionsPage() {
  const subscriptions = await getSubscriptions()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-muted-foreground">Manage and track all your active and cancelled subscriptions.</p>
      </div>

      <SubscriptionList initialSubscriptions={subscriptions} />
    </div>
  )
}
