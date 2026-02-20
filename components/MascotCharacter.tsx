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
    happy: 'M 60 110 Q 100 130 140 110',
    neutral: 'M 60 110 L 140 110',
    worried: 'M 60 120 Q 100 100 140 120',
    angry: 'M 60 120 Q 100 110 140 120',
    celebrating: 'M 50 110 Q 100 140 150 110',
  };

  const eyeOffsetX = (mousePos.x - window.innerWidth / 2) * 0.01;
  const eyeOffsetY = (mousePos.y - window.innerHeight / 2) * 0.01;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      animate={{
        y: [0, -10, 0],
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
      </defs>

      {/* Body */}
      <rect
        x="40"
        y="60"
        width="120"
        height="120"
        rx="30"
        fill={colors[mood]}
        opacity="0.9"
      />

      {/* Eyes */}
      <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
        <ellipse cx={70 + eyeOffsetX} cy={80 + eyeOffsetY} rx="12" ry="15" fill="white" />
        <ellipse cx={130 + eyeOffsetX} cy={80 + eyeOffsetY} rx="12" ry="15" fill="white" />
        <circle cx={70 + eyeOffsetX} cy={82 + eyeOffsetY} r="6" fill="#1F2937" />
        <circle cx={130 + eyeOffsetX} cy={82 + eyeOffsetY} r="6" fill="#1F2937" />
      </motion.g>

      {/* Mouth */}
      <path
        d={mouthPaths[mood]}
        stroke="#1F2937"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Antenna */}
      <line x1="100" y1="60" x2="100" y2="30" stroke={colors[mood]} strokeWidth="4" />
      <motion.circle
        cx="100"
        cy="25"
        r="8"
        fill={mood === 'worried' ? '#F97316' : '#10B981'}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Confetti for celebrating */}
      {mood === 'celebrating' && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.rect
              key={i}
              x={100 + Math.cos(i * 45) * 60}
              y={100 + Math.sin(i * 45) * 60}
              width="6"
              height="6"
              rx="1"
              fill={['#8B5CF6', '#10B981', '#F43F5E', '#F97316'][i % 4]}
              animate={{
                x: 100 + Math.cos(i * 45) * (60 + Math.random() * 40),
                y: 100 + Math.sin(i * 45) * (60 + Math.random() * 40),
                opacity: [1, 0],
                rotate: [0, 360],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}
        </>
      )}
    </motion.svg>
  );
}
