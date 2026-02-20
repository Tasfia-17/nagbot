'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiProps {
  trigger: boolean;
}

export default function Confetti({ trigger }: ConfettiProps) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: ['#8B5CF6', '#10B981', '#F43F5E', '#F97316'][Math.floor(Math.random() * 4)],
        rotation: Math.random() * 360,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 3000);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: p.color, left: p.x, top: p.y }}
          animate={{
            y: window.innerHeight + 100,
            x: p.x + (Math.random() - 0.5) * 200,
            rotate: p.rotation + 720,
          }}
          transition={{ duration: 2, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}
