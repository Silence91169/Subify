'use client'

import { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Download, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  FilterX
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { format } from 'date-fns'
import { SubscriptionDialog } from './subscription-dialog'
import { deleteSubscription } from '@/lib/actions/subscriptions'
import { toast } from 'sonner'
import { formatCurrencyWithDecimals } from '@/lib/utils'

export function SubscriptionList({ initialSubscriptions }: { initialSubscriptions: any[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || sub.category === category
    const matchesStatus = status === 'All' || sub.status === status.toLowerCase()
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteSubscription(id)
      setSubscriptions(subscriptions.filter(s => s.id !== id))
      toast.success('Subscription deleted')
    } catch (error) {
      toast.error('Failed to delete subscription')
    } finally {
      setDeleteId(null)
    }
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Category', 'Cost', 'Cycle', 'Renewal Date', 'Status']
    const rows = filteredSubscriptions.map(sub => [
      sub.name,
      sub.category,
      sub.cost,
      sub.billing_cycle,
      sub.renewal_date,
      sub.status
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'subscriptions.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
    setStatus('All')
  }

  return (
    <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 w-full md:w-auto gap-3">
            <div className="relative flex-1 max-w-sm group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400 transition-colors" />
              <Input
                placeholder="Search subscriptions..."
                className="pl-10 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-purple-500/50 h-11 rounded-xl placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all focus:bg-zinc-50 dark:focus:bg-zinc-900"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[160px] bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 h-11 rounded-xl focus:ring-purple-500/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px] bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 h-11 rounded-xl focus:ring-purple-500/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            {(category !== 'All' || status !== 'All' || search !== '') && (
               <Button variant="ghost" size="icon" onClick={clearFilters} className="h-11 w-11 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                 <FilterX className="h-4 w-4" />
               </Button>
            )}
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" onClick={exportToCSV} className="h-11 px-6 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <SubscriptionDialog />
          </div>
        </div>


      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 backdrop-blur-xl overflow-hidden shadow-sm dark:shadow-2xl">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800/50">
            <TableRow className="hover:bg-transparent border-b border-zinc-200 dark:border-zinc-800/50">
              <TableHead className="text-zinc-600 dark:text-zinc-400 font-semibold h-12 px-6">Name</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400 font-semibold h-12 px-6">Category</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400 font-semibold h-12 px-6">Cost</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400 font-semibold h-12 px-6">Billing Cycle</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400 font-semibold h-12 px-6">Next Renewal</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400 font-semibold h-12 px-6">Status</TableHead>
              <TableHead className="w-[70px] h-12 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="h-48 text-center text-zinc-500">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50">
                      <Search className="h-6 w-6 text-zinc-400 dark:text-zinc-600" />
                    </div>
                    <p className="text-sm">No subscriptions found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscriptions.map((sub) => (
                  <TableRow key={sub.id} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <TableCell className="font-semibold text-zinc-900 dark:text-white px-6 py-4">{sub.name}</TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                        {sub.category}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">
                        {formatCurrencyWithDecimals(parseFloat(sub.cost))}
                      </span>
                    </TableCell>
                    <TableCell className="capitalize text-zinc-600 dark:text-zinc-400 px-6 py-4">{sub.billing_cycle}</TableCell>

                  <TableCell className="text-zinc-600 dark:text-zinc-400 px-6 py-4">{format(new Date(sub.renewal_date), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge 
                      variant={sub.status === 'active' ? 'default' : 'secondary'}
                      className={sub.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700'}
                    >
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
                        <SubscriptionDialog 
                          subscription={sub} 
                          trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="hover:bg-zinc-100 dark:hover:bg-zinc-800">
                              <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                          } 
                        />
                          <DropdownMenuItem 
                            className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                            onClick={() => setDeleteId(sub.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
                This action cannot be undone. This will permanently delete your
                subscription and remove the data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  )
}
