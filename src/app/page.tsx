'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  CreditCard, 
  ArrowUpRight, 
  Shield, 
  Zap, 
  Activity, 
  Globe, 
  ChevronDown,
  User,
  CheckCircle2
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white selection:bg-purple-500/20 dark:selection:bg-white/20 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/3 dark:bg-emerald-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Floating Pill Nav */}
      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-full py-2 px-6 shadow-lg dark:shadow-2xl"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white dark:text-black" />
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">FAQ</Link>
            <div className="h-4 w-px bg-zinc-200 dark:bg-white/10 mx-2" />
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-white/10 rounded-full px-2 py-0.5 border border-zinc-200 dark:border-white/5">
              <Link href="#" className="flex items-center gap-1 text-xs font-medium text-zinc-900 dark:text-white group transition-colors">
                Protection <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <div className="w-4 h-4 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center">
                <Shield className="w-2.5 h-2.5 text-white dark:text-black" />
              </div>
            </div>
            </nav>

            <div className="flex items-center gap-3">
            <ModeToggle />
            <Link href="/login" className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
            <Link href="/signup" className="bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
              Create Account
            </Link>
          </div>
        </motion.div>
      </header>

        <main className="relative flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4">
          {/* Floating Decorative Elements */}
          <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
            {/* Node: Netflix */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-[30%] left-[15%] hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                <div className="text-left">
                    <div className="text-xs font-medium text-zinc-600 dark:text-white/80">Netflix</div>
                    <div className="text-[10px] text-zinc-400 dark:text-white/40 tracking-widest uppercase">Premium • ₹1,499</div>
                  </div>
                </div>
                <svg className="absolute top-1/2 left-full ml-4 w-32 h-16 pointer-events-none opacity-20">
                  <path d="M0,8 Q64,8 128,48" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 4" className="text-zinc-400 dark:text-white" />
                </svg>
              </motion.div>

              {/* Node: Spotify */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute top-[25%] right-[15%] hidden lg:block"
              >
                <div className="flex flex-row-reverse items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <div className="text-right">
                    <div className="text-xs font-medium text-zinc-600 dark:text-white/80">Spotify</div>
                    <div className="text-[10px] text-zinc-400 dark:text-white/40 tracking-widest uppercase">Family • ₹179</div>
                  </div>
                </div>
              </motion.div>

              {/* Node: Adobe */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute bottom-[35%] left-[20%] hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <div className="text-left">
                    <div className="text-xs font-medium text-zinc-600 dark:text-white/80">Adobe CC</div>
                    <div className="text-[10px] text-zinc-400 dark:text-white/40 tracking-widest uppercase">Active • ₹4,230</div>
                  </div>
                </div>
              </motion.div>

              {/* Node: iCloud */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute bottom-[40%] right-[20%] hidden lg:block"
              >
                <div className="flex flex-row-reverse items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-white/50 shadow-[0_0_10px_rgba(161,161,170,0.3)] dark:shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                  <div className="text-right">
                    <div className="text-xs font-medium text-zinc-600 dark:text-white/80">iCloud+</div>
                    <div className="text-[10px] text-zinc-400 dark:text-white/40 tracking-widest uppercase">2TB • ₹599</div>
                  </div>

              </div>
            </motion.div>
          </div>

          {/* Hero Content */}
          <div className="z-10 text-center max-w-4xl mx-auto space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[0.9]"
            >
              One-click for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 dark:from-white via-zinc-600 dark:via-white/80 to-zinc-400 dark:to-white/20">
                Asset Defense
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-light leading-relaxed"
            >
              Dive into the art of assets, where innovative tracking technology meets financial expertise. Manage subscriptions with surgical precision.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Button asChild size="lg" className="rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 px-10 py-6 text-base font-bold transition-all hover:scale-105 active:scale-95">
                <Link href="/signup">Open App ↗</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-zinc-300 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 px-10 py-6 text-base font-medium transition-all hover:scale-105 active:scale-95">
                <Link href="/login">Discover More</Link>
              </Button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-8 hidden lg:flex items-center gap-4"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-md">
              <ChevronDown className="w-4 h-4 text-zinc-600 dark:text-white" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-white/40">
              01/03 . Scroll down
            </div>
          </motion.div>

          {/* Status indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 right-8 hidden lg:flex flex-col items-end gap-2"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-white/40">
              Financial horizons
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-1 rounded-full bg-zinc-900 dark:bg-white" />
              <div className="w-8 h-1 rounded-full bg-zinc-200 dark:bg-white/10" />
              <div className="w-8 h-1 rounded-full bg-zinc-200 dark:bg-white/10" />
            </div>
          </motion.div>
        </main>

        {/* Features Section */}
        <section id="features" className="py-32 px-4 relative">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Surgical Precision</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">Our toolkit is designed for the modern asset manager. Automated, secure, and beautiful.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Smart Import', description: 'One-click connection to your favorite services. No manual entry needed.', icon: Zap },
                { title: 'Asset Security', description: 'Bank-grade encryption for all your financial data and connections.', icon: Shield },
                { title: 'Deep Insights', description: 'Projected spending, category breakdown, and renewal alerts.', icon: Activity },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-sm dark:shadow-none"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-zinc-700 dark:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-32 px-4 bg-zinc-100 dark:bg-zinc-950/50">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Simple Pricing</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto">Everything you need to manage your subscriptions. Completely free.</p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="relative p-8 rounded-3xl bg-white dark:bg-white text-zinc-900 dark:text-black border border-zinc-200 dark:border-white shadow-lg">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold">₹0</span>
                  <span className="text-sm opacity-50">forever</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Unlimited Subscriptions', 'Manual Entry', 'Renewal Alerts', 'Spending Analytics', 'Category Breakdown'].map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full rounded-full py-6 font-bold bg-zinc-900 dark:bg-black text-white hover:bg-zinc-700 dark:hover:bg-zinc-800">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Common Inquiries</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "Is my data secure?", a: "Absolutely. We use industry-standard AES-256 encryption and secure OAuth protocols for all service connections. Your credentials never touch our servers." },
                { q: "How does smart import work?", a: "We establish a temporary, secure connection with the service provider to retrieve only the necessary plan details. This happens entirely within a sandboxed environment." },
                { q: "Is Subify really free?", a: "Yes! Subify is completely free to use with all features included. We believe everyone deserves to manage their subscriptions effectively." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
                  <h3 className="font-bold mb-2">{item.q}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


      {/* Footer */}
      <footer className="w-full py-12 border-t border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white dark:text-black" />
              </div>
              <span className="font-bold text-lg">Subify</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-zinc-500">
              <span>© 2026 Subify. All rights reserved.</span>
              <div className="flex items-center gap-2">
                <span>Questions?</span>
                <a href="mailto:completeworks99@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                  completeworks99@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
