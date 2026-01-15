'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, ResponsiveContainer, YAxis } from 'recharts'

const mockData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
]
import { ModeToggle } from '@/components/mode-toggle'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Left Side: Form */}
      <div className="flex flex-col justify-center items-center p-8 lg:p-16 relative">
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <ModeToggle />
        </div>
        <div className="w-full max-w-[400px] flex flex-col gap-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white dark:bg-black rounded-sm rotate-45" />
            </div>
            <span className="font-bold text-xl tracking-tight">Subify</span>
          </div>
          {children}
        </div>
      </div>

      {/* Right Side: Decorative Dashboard Preview */}
      <div className="hidden lg:flex relative bg-zinc-100 dark:bg-zinc-900 items-center justify-center p-12 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg aspect-[4/5] bg-white/10 dark:bg-zinc-800/20 backdrop-blur-3xl border border-white/20 dark:border-zinc-700/30 rounded-3xl shadow-2xl p-8 flex flex-col gap-6"
        >
          {/* Mock Dashboard Card 1 */}
          <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Expenses</p>
                  <h3 className="text-3xl font-bold">₹1,05,500</h3>
                </div>
                <div className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
                  +12.5%
                </div>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData}>
                    <Bar dataKey="value" fill="currentColor" className="text-purple-500/40" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
  
            {/* Mock Dashboard Card 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mb-1">Active</p>
                <h4 className="text-2xl font-bold">24</h4>
                <p className="text-[10px] text-zinc-400 mt-2">Subscriptions tracking</p>
              </div>
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mb-1">Savings</p>
                <h4 className="text-2xl font-bold text-purple-600 dark:text-purple-400">₹34,500</h4>
                <p className="text-[10px] text-zinc-400 mt-2">Potential annual savings</p>
              </div>
            </div>
  
            {/* Mock Dashboard Card 3 */}
            <div className="mt-auto bg-purple-600/10 border border-purple-500/20 rounded-2xl p-6">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Smart Insights</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We've identified 3 duplicate subscriptions. Canceling them could save you <span className="font-bold text-zinc-900 dark:text-white">₹2,899/mo</span>.
              </p>
            </div>

        </motion.div>
      </div>
    </div>
  )
}
