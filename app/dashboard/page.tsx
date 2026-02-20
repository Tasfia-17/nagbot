'use client';

import GoalCard from '@/components/GoalCard';
import MascotCharacter from '@/components/MascotCharacter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OceanBackground from '@/components/backgrounds/OceanBackground';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const router = useRouter();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals?userId=demo-user&status=active');
      const data = await response.json();
      setGoals(data.map((g: any) => ({ ...g, deadline: new Date(g.deadline) })));
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await fetch(`/api/goals/${id}/complete`, { method: 'POST' });
      fetchGoals();
    } catch (error) {
      console.error('Failed to complete goal:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this goal? This cannot be undone.')) return;
    try {
      await fetch(`/api/goals/${id}`, { method: 'DELETE' });
      fetchGoals();
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  const nearestDeadline = goals.length > 0 
    ? Math.min(...goals.map((g: any) => g.deadline.getTime() - Date.now()))
    : Infinity;
  const mood = nearestDeadline < 3600000 ? 'worried' : 'happy';

  if (loading) {
    return (
      <>
        <OceanBackground />
        <div className="text-center py-20 relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block text-6xl"
          >
            🤖
          </motion.div>
          <p className="text-2xl font-bold text-gray-800 mt-4">Loading your goals...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <OceanBackground />
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10 bg-white/20 backdrop-blur-2xl rounded-3xl p-6 border-2 border-white/30 shadow-2xl"
        >
          <div>
            <h2 className="text-5xl font-extrabold text-gray-800 drop-shadow">Your Goals</h2>
            <p className="text-xl text-gray-700 mt-2 font-medium">Stay accountable or face the shame</p>
          </div>
          <MascotCharacter mood={mood} size={160} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal: any, index: number) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GoalCard 
                goal={goal} 
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </div>

        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white/20 backdrop-blur-2xl rounded-3xl border-2 border-white/30 shadow-2xl"
          >
            <MascotCharacter mood="neutral" size={220} />
            <p className="text-2xl text-gray-800 mt-6 font-bold">No active goals yet!</p>
            <p className="text-lg text-gray-700 mt-2">Create one to get started on your accountability journey</p>
            <motion.button
              onClick={() => router.push('/create')}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-10 py-5 bg-gradient-to-r from-primary to-secondary text-white rounded-3xl font-bold text-xl shadow-2xl border-2 border-white/30"
            >
              Create Your First Goal 🎯
            </motion.button>
          </motion.div>
        )}
      </div>
    </>
  );
}
