import { getDashboardStats } from '@/lib/actions/subscriptions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Bell, Calendar, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import { formatCurrencyWithDecimals } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export default async function AlertsPage() {
  const stats = await getDashboardStats()
  
  const upcomingRenewals = stats.upcomingRenewals
  const criticalRenewals = upcomingRenewals.filter(s => {
    const renewalDate = new Date(s.renewal_date)
    const today = new Date()
    const diffTime = renewalDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3
  })

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Renewal Alerts
          </h1>
          <p className="text-zinc-500 text-lg">
            Stay on top of your upcoming subscription renewals and payments.
          </p>
        </div>
        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1.5 rounded-full text-sm font-semibold self-start md:self-auto">
          {upcomingRenewals.length} Notifications
        </Badge>
      </div>

      {criticalRenewals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Critical - Renewing Soon
          </h2>
          <div className="grid gap-4">
            {criticalRenewals.map(sub => (
              <div key={sub.id} className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 p-6 transition-all hover:bg-red-500/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                       <Bell className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{sub.name}</h3>
                      <p className="text-sm text-zinc-400">Payment of <span className="text-red-400 font-semibold">{formatCurrencyWithDecimals(parseFloat(sub.cost))}</span> is due on <span className="text-white font-medium">{format(new Date(sub.renewal_date), 'MMMM do')}</span></p>
                    </div>
                  </div>
                  <Badge className="bg-red-500 text-white border-0 w-fit">Due in {Math.ceil((new Date(sub.renewal_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Upcoming This Month
        </h2>
        
        <div className="grid gap-4">
          {upcomingRenewals.filter(s => !criticalRenewals.includes(s)).map(sub => (
            <Card key={sub.id} className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm group hover:border-zinc-700 transition-colors">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all">
                     <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{sub.name}</h3>
                    <p className="text-sm text-zinc-500">Scheduled for <span className="text-zinc-300">{format(new Date(sub.renewal_date), 'MMM d, yyyy')}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{formatCurrencyWithDecimals(parseFloat(sub.cost))}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{sub.billing_cycle}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 group-hover:border-emerald-500/20 transition-all">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {upcomingRenewals.length === 0 && (
            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
               <Bell className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
               <p className="text-zinc-500">No upcoming renewals for the next 30 days.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
