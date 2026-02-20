'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  deadline: Date;
  size?: number;
}

export default function CountdownTimer({ deadline, size = 120 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(deadline.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const totalTime = deadline.getTime() - Date.now() + 86400000; // assume 24h goal
  const progress = Math.max(0, Math.min(1, timeLeft / totalTime));
  const hours = Math.floor(timeLeft / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);

  const color = hours > 24 ? '#10B981' : hours > 6 ? '#F97316' : '#F43F5E';
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          animate={hours < 1 ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-gray-800">{hours}h</div>
        <div className="text-sm text-gray-500">{minutes}m</div>
      </div>
    </div>
  );
}
