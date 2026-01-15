'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
      { role: 'bot', content: 'Hi I am Tricker. How can I help you manage your subscriptions today?' }
    ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

      // Simulate AI response
      setTimeout(() => {
        let botResponse = "Hi I am Tricker. You can ask me about your spending, upcoming renewals, or how to link your Netflix account!"
      
      if (userMessage.toLowerCase().includes('netflix')) {
        botResponse = "To link Netflix, go to the Subscriptions page and click 'Connect Service'. Since Netflix doesn't have a public API, I'll guide you through importing your billing details."
      } else if (userMessage.toLowerCase().includes('spending') || userMessage.toLowerCase().includes('total')) {
        botResponse = "You can see your total monthly spending on the Dashboard. Currently, we're tracking your active subscriptions in Rupees (₹)."
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-purple-600 to-blue-600 hover:scale-110 transition-all duration-300 border-0"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-[380px] h-[520px] shadow-2xl border-zinc-800 bg-[#09090b]/95 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
          <CardHeader className="p-4 border-b border-zinc-800 bg-gradient-to-r from-purple-600/20 to-blue-600/10 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-white">Tricker AI</CardTitle>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-zinc-500 font-medium">Always Online</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3",
                  msg.role === 'user' ? "flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                  msg.role === 'bot' ? "bg-purple-500/10 text-purple-400" : "bg-zinc-800 text-zinc-300"
                )}>
                  {msg.role === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'bot' 
                    ? "bg-zinc-900 border border-zinc-800 text-zinc-300" 
                    : "bg-purple-600 text-white"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 border-t border-zinc-800 bg-zinc-900/30">
            <div className="relative w-full">
              <Input
                placeholder="Type your query..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="bg-zinc-900 border-zinc-800 focus-visible:ring-purple-500/50 pr-10 h-11 rounded-xl"
              />
              <Button 
                onClick={handleSend}
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
