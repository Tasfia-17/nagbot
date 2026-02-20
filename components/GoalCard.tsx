'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Trash2 } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { useState } from 'react';
import Confetti from './Confetti';

interface Goal {
  id: string;
  title: string;
  deadline: Date;
  verificationMethod: string;
  status: string;
}

interface GoalCardProps {
  goal: Goal;
  onComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function GoalCard({ goal, onComplete, onDelete }: GoalCardProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onComplete?.(goal.id);
      setShowConfetti(false);
    }, 1000);
  };

  return (
    <>
      <Confetti trigger={showConfetti} />
      <motion.div
        className="bg-white/25 backdrop-blur-3xl border-2 border-white/40 rounded-3xl p-7 shadow-2xl hover:shadow-3xl transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3 drop-shadow">{goal.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-bold bg-white/40 rounded-full px-4 py-2 w-fit">
              <Clock size={16} />
              <span className="capitalize">{goal.verificationMethod}</span>
            </div>
          </div>
          <CountdownTimer deadline={goal.deadline} size={110} />
        </div>

        <div className="flex gap-3 mt-6">
          {goal.status === 'active' && (
            <motion.button
              onClick={handleComplete}
              className="flex-1 bg-gradient-to-r from-secondary to-emerald-400 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 shadow-xl border-2 border-white/30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle size={22} />
              Complete
            </motion.button>
          )}
          <motion.button
            onClick={() => onDelete?.(goal.id)}
            className="px-5 bg-accent/20 text-accent rounded-2xl hover:bg-accent/30 backdrop-blur-xl border-2 border-accent/40 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 size={22} />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
