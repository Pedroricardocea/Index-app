"use client";

import React from 'react';
import { Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckInCardProps {
  onRecordingComplete: () => void;
  className?: string;
}

export const CheckInCard: React.FC<CheckInCardProps> = ({
  onRecordingComplete,
  className,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl ${className}`}>
      {/* Dynamic Background Glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl filter" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl filter" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
            Morning Check-In
          </h2>
          <p className="text-base text-white/60">
            What's your main focus today?
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRecordingComplete}
          className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-all hover:shadow-blue-500/50"
        >
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-20 duration-1000" />
          <Mic className="h-10 w-10 text-white" />
        </motion.button>
        
        <p className="text-sm font-medium text-white/40">Tap to Record</p>
      </div>
    </div>
  );
};
