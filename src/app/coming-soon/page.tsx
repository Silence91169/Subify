'use client'

import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei'
import Link from 'next/link'
import { Rocket, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'

function Scene() {
  return (
    <>
      {React.createElement('ambientLight', { intensity: 1 })}
      {React.createElement('directionalLight', { position: [2, 1, 1] })}
      {React.createElement(Float, { speed: 4, rotationIntensity: 1, floatIntensity: 2 },
        React.createElement(Sphere, { args: [1, 100, 200], scale: 2.4 },
          React.createElement(MeshDistortMaterial, {
            color: "#8b5cf6",
            attach: "material",
            distort: 0.4,
            speed: 4,
            roughness: 0
          })
        )
      )}
    </>
  )
}

const particlePositions = [
  { x: 5, y: 10, opacity: 0.15, duration: 12 },
  { x: 15, y: 25, opacity: 0.25, duration: 14 },
  { x: 25, y: 40, opacity: 0.20, duration: 16 },
  { x: 35, y: 55, opacity: 0.30, duration: 11 },
  { x: 45, y: 70, opacity: 0.18, duration: 13 },
  { x: 55, y: 15, opacity: 0.22, duration: 15 },
  { x: 65, y: 30, opacity: 0.28, duration: 17 },
  { x: 75, y: 45, opacity: 0.12, duration: 10 },
  { x: 85, y: 60, opacity: 0.35, duration: 18 },
  { x: 95, y: 75, opacity: 0.20, duration: 12 },
  { x: 10, y: 80, opacity: 0.25, duration: 14 },
  { x: 20, y: 5, opacity: 0.15, duration: 16 },
  { x: 30, y: 20, opacity: 0.30, duration: 11 },
  { x: 40, y: 35, opacity: 0.22, duration: 13 },
  { x: 50, y: 50, opacity: 0.18, duration: 15 },
  { x: 60, y: 65, opacity: 0.28, duration: 17 },
  { x: 70, y: 80, opacity: 0.12, duration: 10 },
  { x: 80, y: 95, opacity: 0.35, duration: 18 },
  { x: 90, y: 10, opacity: 0.20, duration: 12 },
  { x: 100, y: 25, opacity: 0.25, duration: 14 },
]

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center relative overflow-hidden p-6">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full h-[400px] relative z-10 cursor-grab active:cursor-grabbing">
        {React.createElement(Canvas, { camera: { position: [0, 0, 5], fov: 75 } },
          React.createElement(Scene),
          React.createElement(OrbitControls, { enableZoom: false })
        )}
      </div>

      <div className="relative z-20 text-center max-w-2xl space-y-8 mt-[-50px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
            <Rocket className="w-3 h-3" />
            Under Construction
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Coming <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">Soon</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            We're building something extraordinary. This feature is currently in development and will be available shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button 
            asChild
            className="bg-white text-black hover:bg-zinc-200 rounded-2xl h-12 px-8 font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
          >
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="text-zinc-500 text-sm font-medium">
            Stay tuned for updates!
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white/20 rounded-full"
            initial={{ 
              x: `${particle.x}%`, 
              y: `${particle.y}%`,
              opacity: particle.opacity
            }}
            animate={{ 
              y: [null, '-20%'],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: particle.duration, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>
    </div>
  )
}
