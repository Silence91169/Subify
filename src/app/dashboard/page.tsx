import { getDashboardStats } from '@/lib/actions/subscriptions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryChart } from '@/components/dashboard/stats-charts'
import { Badge } from '@/components/ui/badge'
import { Bell, CreditCard, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'
import { format } from 'date-fns'
import { formatCurrencyWithDecimals } from '@/lib/utils'
import { cn } from '@/lib/utils'
import NextLink from 'next/link'

export default async function DashboardPage() {
  const stats = await getDashboardStats()
  
  const upcomingSoon = stats.upcomingRenewals.filter(s => {
    const renewalDate = new Date(s.renewal_date)
    const today = new Date()
    const diffTime = renewalDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  })

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-zinc-500 text-lg">
            Track and manage your recurring expenses in one place.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-xl self-start md:self-auto">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 px-3 py-1 rounded-lg">
            Live Updates
          </Badge>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">
            Last sync: Just now
          </span>
        </div>
      </div>

      {upcomingSoon.length > 0 && (
        <div className="relative group overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 transition-all hover:bg-amber-500/10">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Bell className="h-24 w-24 text-amber-500 -rotate-12" />
          </div>
          <div className="flex gap-4 relative z-10">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
               <Bell className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                Renewal Alert
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                You have <span className="text-zinc-900 dark:text-white font-semibold">{upcomingSoon.length} subscription{upcomingSoon.length > 1 ? 's' : ''}</span> renewing in the next 7 days: 
                <span className="text-amber-600 dark:text-amber-200"> {upcomingSoon.map(s => s.name).join(', ')}</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Monthly Spending" 
          value={formatCurrencyWithDecimals(stats.totalMonthlyExpense)}
          description="Estimated monthly total"
          icon={TrendingUp}
          trend="+2.4%"
          trendType="up"
          color="purple"
        />
        <StatsCard 
          title="Active Plans" 
          value={stats.activeSubsCount.toString()}
          description="Total active subscriptions"
          icon={CreditCard}
          color="blue"
        />
        <StatsCard 
          title="Next Renewal" 
          value={stats.upcomingRenewals[0] ? format(new Date(stats.upcomingRenewals[0].renewal_date), 'MMM d') : 'None'}
          description={stats.upcomingRenewals[0]?.name || 'No upcoming renewals'}
          icon={Calendar}
          color="emerald"
        />
        <StatsCard 
          title="Yearly Projection" 
          value={formatCurrencyWithDecimals(stats.totalMonthlyExpense * 12)}
          description="Projected annual cost"
          icon={Activity}
          color="orange"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm overflow-hidden rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800/50 pb-6">
            <div>
              <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">Upcoming Renewals</CardTitle>
              <p className="text-sm text-zinc-500 mt-1">Your subscriptions renewing in the next 30 days.</p>
            </div>
            <NextLink href="/dashboard/subscriptions">
              <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer">View All</Badge>
            </NextLink>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
              {stats.upcomingRenewals.length === 0 ? (
                <p className="text-sm text-zinc-500 p-8 text-center italic">No upcoming renewals found.</p>
              ) : (
                stats.upcomingRenewals.map((sub) => (
                  <div key={sub.id} className="group flex items-center justify-between p-6 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-white font-bold group-hover:border-purple-500/50 transition-colors capitalize">
                          {sub.name.charAt(0)}
                       </div>
                       <div className="space-y-1">
                          <p className="font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{sub.name}</p>
                          <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{sub.category}</p>
                       </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-zinc-900 dark:text-white">{formatCurrencyWithDecimals(parseFloat(sub.cost))}</p>
                      <p className="text-xs text-zinc-500 mt-1 flex items-center justify-end gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(sub.renewal_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/50 backdrop-blur-sm rounded-2xl">
          <CardHeader className="border-b border-zinc-200 dark:border-zinc-800/50 pb-6">
            <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">Spending Breakdown</CardTitle>
            <p className="text-sm text-zinc-500 mt-1">Monthly expense by category.</p>
          </CardHeader>
          <CardContent className="pt-8">
            <CategoryChart data={stats.pieChartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendType,
  color = "purple"
}: { 
  title: string, 
  value: string, 
  description: string, 
  icon: any,
  trend?: string,
  trendType?: 'up' | 'down',
  color?: 'purple' | 'blue' | 'emerald' | 'orange'
}) {
  const colors = {
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
  }

  const activeColor = colors[color]

  return (
    <Card className={cn("relative overflow-hidden border-0 bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] rounded-2xl", activeColor)}>
      <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-white opacity-[0.03] blur-2xl"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{title}</CardTitle>
        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", 
          color === 'purple' ? "bg-purple-500/20 text-purple-600 dark:text-purple-400" :
          color === 'blue' ? "bg-blue-500/20 text-blue-600 dark:text-blue-400" :
          color === 'emerald' ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
          "bg-orange-500/20 text-orange-600 dark:text-orange-400"
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex items-end gap-2">
          <div className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{value}</div>
          {trend && (
             <div className={cn("flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md mb-1.5", 
               trendType === 'up' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
             )}>
                {trendType === 'up' ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                {trend}
             </div>
          )}
        </div>
        <p className="text-xs font-medium text-zinc-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}
