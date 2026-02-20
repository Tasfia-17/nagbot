'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Mood = 'happy' | 'neutral' | 'worried' | 'angry' | 'celebrating';

interface MascotProps {
  mood?: Mood;
  size?: number;
}

export default function MascotCharacter({ mood = 'happy', size = 200 }: MascotProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const colors = {
    happy: '#8B5CF6',
    neutral: '#6B7280',
    worried: '#F97316',
    angry: '#F43F5E',
    celebrating: 'url(#rainbow)',
  };

  const mouthPaths = {
    happy: 'M 65 115 Q 100 135 135 115',
    neutral: 'M 70 115 L 130 115',
    worried: 'M 65 125 Q 100 105 135 125',
    angry: 'M 65 125 Q 100 115 135 125',
    celebrating: 'M 60 115 Q 100 145 140 115',
  };

  const eyeOffsetX = typeof window !== 'undefined' ? (mousePos.x - window.innerWidth / 2) * 0.015 : 0;
  const eyeOffsetY = typeof window !== 'undefined' ? (mousePos.y - window.innerHeight / 2) * 0.015 : 0;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      animate={{
        y: [0, -12, 0],
        rotate: mood === 'celebrating' ? [0, 5, -5, 0] : 0,
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 0.5, repeat: mood === 'celebrating' ? Infinity : 0 },
      }}
    >
      <defs>
        <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Body - rounder and cuter */}
      <rect
        x="35"
        y="70"
        width="130"
        height="130"
        rx="40"
        fill={colors[mood]}
        opacity="0.95"
      />
      
      {/* Cute blush marks */}
      {mood === 'happy' && (
        <>
          <ellipse cx="50" cy="105" rx="8" ry="6" fill="#FF6B9D" opacity="0.4" />
          <ellipse cx="150" cy="105" rx="8" ry="6" fill="#FF6B9D" opacity="0.4" />
        </>
      )}

      {/* Eyes - bigger and cuter */}
      <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}>
        <ellipse cx={70 + eyeOffsetX} cy={90 + eyeOffsetY} rx="18" ry="22" fill="white" />
        <ellipse cx={130 + eyeOffsetX} cy={90 + eyeOffsetY} rx="18" ry="22" fill="white" />
        <circle cx={70 + eyeOffsetX} cy={93 + eyeOffsetY} r="9" fill="#1F2937" />
        <circle cx={130 + eyeOffsetX} cy={93 + eyeOffsetY} r="9" fill="#1F2937" />
        {/* Eye shine */}
        <circle cx={73 + eyeOffsetX} cy={88 + eyeOffsetY} r="4" fill="white" opacity="0.8" />
        <circle cx={133 + eyeOffsetX} cy={88 + eyeOffsetY} r="4" fill="white" opacity="0.8" />
      </motion.g>

      {/* Mouth - cuter */}
      <path
        d={mouthPaths[mood]}
        stroke="#1F2937"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Antenna - cuter with spring */}
      <path 
        d="M 100 70 Q 95 55 100 40 Q 105 55 100 25" 
        stroke={colors[mood]} 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      <motion.circle
        cx="100"
        cy="20"
        r="10"
        fill={mood === 'worried' ? '#F97316' : '#10B981'}
        filter="url(#glow)"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Cute little arms */}
      <ellipse cx="25" cy="120" rx="12" ry="18" fill={colors[mood]} opacity="0.9" />
      <ellipse cx="175" cy="120" rx="12" ry="18" fill={colors[mood]} opacity="0.9" />

      {/* Confetti for celebrating */}
      {mood === 'celebrating' && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.rect
              key={i}
              x={100 + Math.cos(i * 30) * 70}
              y={120 + Math.sin(i * 30) * 70}
              width="8"
              height="8"
              rx="2"
              fill={['#8B5CF6', '#10B981', '#F43F5E', '#FFD93D'][i % 4]}
              animate={{
                x: 100 + Math.cos(i * 30) * (70 + Math.random() * 50),
                y: 120 + Math.sin(i * 30) * (70 + Math.random() * 50),
                opacity: [1, 0],
                rotate: [0, 360],
              }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </motion.svg>
  );
}
