'use client';

import GoalCard from '@/components/GoalCard';
import MascotCharacter from '@/components/MascotCharacter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800">Your Goals</h2>
          <p className="text-gray-600 mt-2">Stay accountable or face the shame</p>
        </div>
        <MascotCharacter mood={mood} size={150} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal: any) => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-20">
          <MascotCharacter mood="neutral" size={200} />
          <p className="text-xl text-gray-600 mt-4">No active goals. Create one to get started!</p>
          <button
            onClick={() => router.push('/create')}
            className="mt-6 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
          >
            Create Your First Goal
          </button>
        </div>
      )}
    </div>
  );
}
