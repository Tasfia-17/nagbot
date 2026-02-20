'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-2xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
          >
            🤖
          </motion.div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
            NagBot
          </h1>
        </Link>
        <nav className="flex gap-3">
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl bg-white/40 backdrop-blur-xl hover:bg-white/60 transition-all font-bold text-gray-800 shadow-lg border border-white/40"
            >
              Dashboard
            </motion.button>
          </Link>
          <Link href="/create">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-xl border border-white/20"
            >
              New Goal
            </motion.button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
