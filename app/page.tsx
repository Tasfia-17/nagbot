'use client';

import MascotCharacter from '@/components/MascotCharacter';
import Link from 'next/link';
import ForestBackground from '@/components/backgrounds/ForestBackground';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <ForestBackground />
      <div className="flex flex-col items-center justify-center min-h-[85vh] text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <MascotCharacter mood="happy" size={280} />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-extrabold text-gray-800 mt-8 tracking-tight drop-shadow-lg"
        >
          Welcome to NagBot
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-gray-700 mt-6 max-w-2xl font-medium drop-shadow"
        >
          The accountability tool that keeps you honest through the power of public shame.
          Set goals, write embarrassing tweets, and let fear be your motivator.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-6 mt-10"
        >
          <Link href="/create">
            <motion.button
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-3xl font-bold text-xl shadow-2xl border-2 border-white/30"
            >
              Get Started 🚀
            </motion.button>
          </Link>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/30 backdrop-blur-2xl text-gray-800 rounded-3xl font-bold text-xl shadow-2xl border-2 border-white/40"
            >
              View Dashboard 📊
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
