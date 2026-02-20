'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Trash2, Edit3 } from 'lucide-react';
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
      className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{goal.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span className="capitalize">{goal.verificationMethod}</span>
          </div>
        </div>
        <CountdownTimer deadline={goal.deadline} size={100} />
      </div>

      <div className="flex gap-2 mt-4">
        {goal.status === 'active' && (
          <motion.button
            onClick={handleComplete}
            className="flex-1 bg-secondary text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle size={20} />
            Complete
          </motion.button>
        )}
        <motion.button
          onClick={() => onDelete?.(goal.id)}
          className="px-4 bg-accent/10 text-accent rounded-xl hover:bg-accent/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 size={20} />
        </motion.button>
      </div>
    </motion.div>
    </>
  );
}
