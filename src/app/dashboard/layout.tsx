import Link from 'next/link'
import { logout } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  CreditCard, 
  User, 
  LogOut, 
  TrendingUp, 
  PlusCircle,
  Bell,
  Search,
  Settings
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AIChatbot } from '@/components/dashboard/ai-chatbot'
import { createClient } from '@/utils/supabase/server'
import { NotificationBell } from '../../components/dashboard/notification-bell'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest User'
  const initials = fullName.charAt(0).toUpperCase()

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-[#09090b] z-50">
        <div className="p-8">
          <Link className="flex items-center gap-3 group" href="/dashboard">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 dark:from-white to-zinc-500 dark:to-zinc-400">
              Subify
            </span>
          </Link>
        </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              <SidebarLink href="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
              <SidebarLink href="/dashboard/subscriptions" icon={PlusCircle}>Subscriptions</SidebarLink>
              <SidebarLink href="/dashboard/profile" icon={User}>Profile</SidebarLink>
              
              <div className="pt-8 pb-4 px-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Reports
              </div>
                <SidebarLink href="/dashboard/analytics" icon={TrendingUp}>Financial</SidebarLink>
              <SidebarLink href="/dashboard/alerts" icon={Bell}>Alerts</SidebarLink>
              <SidebarLink href="/dashboard/settings" icon={Settings}>Settings</SidebarLink>
            </nav>


          <div className="p-4 mt-auto">
            <form action={logout}>

            <Button 
              variant="ghost" 
              className="w-full justify-start text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-xl transition-all duration-200" 
              type="submit"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </form>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-zinc-200 dark:border-zinc-800/50 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl flex items-center justify-between px-8 z-40 sticky top-0">
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
              <Input 
                placeholder="Search anything..." 
                className="bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-purple-500/50 pl-10 h-10 rounded-xl placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all focus:bg-white dark:focus:bg-zinc-900" 
              />
            </div>
          </div>

          <div className="flex md:hidden items-center gap-3">
             <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-1.5 rounded-lg">
               <CreditCard className="h-5 w-5 text-white" />
             </div>
             <span className="font-bold text-xl tracking-tight">Subify</span>
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{fullName}</p>
              </div>
              <Link href="/dashboard/profile" className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 font-bold hover:border-purple-500 transition-colors cursor-pointer">
                {initials}
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </div>
        <AIChatbot />
      </main>
    </div>
  )
}


function SidebarLink({ href, icon: Icon, children }: { href: string, icon: any, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200 group"
    >
      <Icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
      {children}
    </Link>
  )
}
