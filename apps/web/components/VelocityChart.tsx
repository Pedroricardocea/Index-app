"use client";

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface VelocityDataPoint {
  date: string;
  velocity: number;
  sentiment: number;
}

interface VelocityChartProps {
  data: VelocityDataPoint[];
}

export const VelocityChart: React.FC<VelocityChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    return data.map(point => ({
      ...point,
      formattedDate: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-3xl bg-white/5 p-8 border border-white/10">
        <p className="text-white/40">Not enough data to calculate velocity</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full rounded-3xl bg-white/5 p-4 border border-white/10 shadow-xl backdrop-blur-md">
       <div className="mb-4 px-2">
        <h3 className="text-lg font-semibold text-white/90">Velocity Field</h3>
        <p className="text-xs text-white/50">Momentum over time</p>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="formattedDate" 
            stroke="#ffffff40" 
            tick={{ fill: '#ffffff40', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#ffffff40" 
            tick={{ fill: '#ffffff40', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            domain={[-20, 20]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#000000dd', 
              border: '1px solid #ffffff20', 
              borderRadius: '12px',
              color: '#fff' 
            }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#ffffff80' }}
          />
          <ReferenceLine y={0} stroke="#ffffff20" />
          <Line 
            type="monotone" 
            dataKey="velocity" 
            stroke="#60a5fa" 
            strokeWidth={3}
            dot={{ fill: '#60a5fa', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
