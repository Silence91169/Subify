'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatCurrencyWithDecimals } from '@/lib/utils'

const COLORS = [
  '#a855f7', // purple-500
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#ec4899', // pink-500
]

export function CategoryChart({ data }: { data: any[] }) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-zinc-500 italic">
        No active subscriptions to show
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={95}
            paddingAngle={8}
            dataKey="value"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                style={{ filter: `drop-shadow(0 0 8px ${COLORS[index % COLORS.length]}40)` }}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#18181b', 
              borderColor: '#27272a',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}
            labelStyle={{ display: 'none' }}
            formatter={(value: any) => [formatCurrencyWithDecimals(Number(value)), 'Monthly']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
