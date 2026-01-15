'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Plus, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Globe, 
  ShieldCheck,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { addSubscription } from '@/lib/actions/subscriptions'

const POPULAR_SERVICES = [
  { name: 'Netflix', icon: 'https://www.google.com/s2/favicons?domain=netflix.com&sz=128', color: 'bg-red-600', category: 'Entertainment', cost: '649' },
  { name: 'Spotify', icon: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=128', color: 'bg-emerald-500', category: 'Entertainment', cost: '119' },
  { name: 'Prime Video', icon: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128', color: 'bg-blue-400', category: 'Entertainment', cost: '179' },
  { name: 'Disney+', icon: 'https://www.google.com/s2/favicons?domain=disneyplus.com&sz=128', color: 'bg-blue-900', category: 'Entertainment', cost: '299' },
  { name: 'YouTube Premium', icon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=128', color: 'bg-red-500', category: 'Entertainment', cost: '129' },
  { name: 'iCloud+', icon: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128', color: 'bg-zinc-100 text-black', category: 'SaaS', cost: '75' },
]

export function ConnectServiceModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'select' | 'connect' | 'confirm'>('select')
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [search, setSearch] = useState('')

  const filteredServices = POPULAR_SERVICES.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (service: any) => {
    setSelectedService(service)
    setStep('connect')
  }

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate smart import
    setTimeout(() => {
      setIsConnecting(false)
      setStep('confirm')
    }, 2000)
  }

  const handleFinalize = async () => {
    try {
      const formData = new FormData()
      formData.append('name', selectedService.name)
      formData.append('category', selectedService.category)
      formData.append('cost', selectedService.cost)
      formData.append('billing_cycle', 'monthly')
      formData.append('renewal_date', new Date().toISOString().split('T')[0])
      formData.append('status', 'active')

      await addSubscription(formData)
      toast.success(`${selectedService.name} linked successfully!`)
      setOpen(false)
      reset()
    } catch (error) {
      toast.error('Failed to link service')
    }
  }

  const reset = () => {
    setStep('select')
    setSelectedService(null)
    setSearch('')
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) reset(); }}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-all border-0 rounded-xl shadow-lg shadow-purple-500/20 px-6">
          <Zap className="mr-2 h-4 w-4" /> Connect Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-zinc-800 bg-[#09090b]">
        {step === 'select' && (
          <div className="flex flex-col h-[600px]">
            <div className="p-6 border-b border-zinc-800 bg-gradient-to-br from-purple-600/10 to-transparent">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">Directly Link Service</DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Select a provider to automatically import your subscription details.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input 
                  placeholder="Search 100+ services..." 
                  className="bg-zinc-900 border-zinc-800 pl-10 h-12 rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-2 py-2">Popular Services</p>
              <div className="grid grid-cols-2 gap-3">
                {filteredServices.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => handleSelect(service)}
                    className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-4 p-3 shadow-2xl transition-transform group-hover:scale-110", service.color)}>
                      <img src={service.icon} alt={service.name} className="h-full w-full object-contain filter brightness-100 invert-0" />
                    </div>
                    <span className="font-bold text-white text-sm">{service.name}</span>
                    <span className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Start Link</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-500">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs">Secure OAuth 2.0 Connection</span>
              </div>
              <Button variant="ghost" onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">Cancel</Button>
            </div>
          </div>
        )}

        {step === 'connect' && (
          <div className="flex flex-col h-[500px] items-center justify-center p-8 space-y-8 animate-in fade-in zoom-in duration-300 text-center">
             <div className="relative">
                <div className="h-24 w-24 rounded-3xl bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden">
                   <img src={selectedService.icon} alt={selectedService.name} className="h-16 w-16 object-contain" />
                </div>
                {isConnecting && (
                  <div className="absolute -inset-4 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                )}
             </div>
             
             <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">
                  {isConnecting ? `Linking ${selectedService.name}...` : `Connect ${selectedService.name}`}
                </h3>
                <p className="text-zinc-400 max-w-xs mx-auto text-sm leading-relaxed">
                  We'll use a secure browser session to fetch your current plan and next renewal date.
                </p>
             </div>

             <div className="w-full space-y-3">
                <Button 
                  onClick={handleConnect} 
                  disabled={isConnecting}
                  className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-bold rounded-xl"
                >
                  {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Globe className="mr-2 h-4 w-4" />}
                  {isConnecting ? 'Establishing Connection...' : `Login to ${selectedService.name}`}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setStep('select')}
                  className="w-full text-zinc-500"
                >
                  Go Back
                </Button>
             </div>

             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">End-to-End Encrypted</span>
             </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="flex flex-col h-[500px] p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
             <div className="flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center border-4 border-emerald-500/10 scale-110">
                   <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </div>
             </div>

             <div className="text-center space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">Data Found!</h3>
                <p className="text-zinc-500 text-sm">We successfully retrieved your subscription details.</p>
             </div>

             <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                        <img src={selectedService.icon} alt={selectedService.name} className="h-6 w-6 object-contain" />
                      </div>
                      <p className="font-bold text-white">{selectedService.name}</p>
                   </div>
                   <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">Matched</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">Cost / Month</p>
                      <p className="text-xl font-bold text-white tracking-tight">₹{selectedService.cost}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">Renewal Date</p>
                      <p className="text-sm font-semibold text-zinc-200">24th Jan, 2024</p>
                   </div>
                </div>
             </div>

             <Button 
                onClick={handleFinalize}
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-bold rounded-2xl text-lg shadow-xl shadow-purple-500/20 mt-auto"
             >
                Import to Dashboard
             </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
