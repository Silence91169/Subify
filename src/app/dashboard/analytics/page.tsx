import { getDashboardStats, getSubscriptions } from '@/lib/actions/subscriptions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CategoryChart } from '@/components/dashboard/stats-charts'
import { TrendingUp, DollarSign, PieChart, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrencyWithDecimals } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export default async function AnalyticsPage() {
  const stats = await getDashboardStats()
  const subscriptions = await getSubscriptions()
  
  const activeSubs = subscriptions.filter(s => s.status === 'active')
  const sortedSubs = [...activeSubs].sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost))
  const topSubscriptions = sortedSubs.slice(0, 5)

  const yearlyTotal = stats.totalMonthlyExpense * 12
  
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Financial Insights
          </h1>
          <p className="text-zinc-500 text-lg">
            Detailed breakdown of your spending habits and subscription data.
          </p>
        </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              Monthly Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{formatCurrencyWithDecimals(stats.totalMonthlyExpense)}</div>
            <p className="text-xs text-zinc-500 mt-1">Based on current active plans</p>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Yearly Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{formatCurrencyWithDecimals(yearlyTotal)}</div>
            <p className="text-xs text-zinc-500 mt-1">Estimated annual cost</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-400" />
              Efficiency Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">84%</div>
            <p className="text-xs text-zinc-500 mt-1">Spending vs. budget utilization</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4 bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-400" />
              Spending by Category
            </CardTitle>
            <CardDescription>Where your money goes each month.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center pt-4">
             <CategoryChart data={stats.pieChartData} />
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3 bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Top Expenses</CardTitle>
            <CardDescription>Your most expensive active subscriptions.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-800/50">
              {topSubscriptions.map((sub, i) => (
                <div key={sub.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{sub.name}</p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{sub.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{formatCurrencyWithDecimals(parseFloat(sub.cost))}</p>
                    <p className="text-[10px] text-zinc-500">{sub.billing_cycle}</p>
                  </div>
                </div>
              ))}
              {topSubscriptions.length === 0 && (
                <p className="p-8 text-center text-zinc-500 text-sm">No active subscriptions found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Savings Opportunities</CardTitle>
          <CardDescription>Potential ways to optimize your spending.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid gap-4 md:grid-cols-2">
              <div className="flex gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                 <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <ArrowDownRight className="h-5 w-5 text-emerald-500" />
                 </div>
                 <div>
                    <p className="font-bold text-emerald-400">Annual Switch</p>
                    <p className="text-sm text-zinc-400 mt-1">Switching Netflix to an annual plan could save you up to 15% yearly.</p>
                 </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                 <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                 </div>
                 <div>
                    <p className="font-bold text-purple-400">Unused Apps</p>
                    <p className="text-sm text-zinc-400 mt-1">You haven't logged any activity for "Design Tools" in 30 days.</p>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
