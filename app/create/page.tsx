'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Target, Clock, Twitter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ShameTweetPreview from '@/components/ShameTweetPreview';

export default function CreateGoalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    verificationMethod: 'manual',
    shameTweet: '',
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user', // Replace with actual user ID from session
          title: formData.title,
          deadline: new Date(formData.deadline).toISOString(),
          verificationMethod: formData.verificationMethod,
          verificationData: {},
          shameTweetText: formData.shameTweet,
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Failed to create goal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Create New Goal</h2>

        {/* Goal Title */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Target className="inline mr-2" size={18} />
            What do you want to accomplish?
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Finish project proposal"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Deadline */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Clock className="inline mr-2" size={18} />
            When's the deadline?
          </label>
          <input
            type="datetime-local"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Verification Method */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            How will you verify completion?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['manual', 'github', 'strava', 'webhook'].map((method) => (
              <motion.button
                key={method}
                onClick={() => setFormData({ ...formData, verificationMethod: method })}
                className={`p-4 rounded-xl border-2 font-medium capitalize ${
                  formData.verificationMethod === method
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {method}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Shame Tweet */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Twitter className="inline mr-2" size={18} />
            Write your shame tweet
          </label>
          <textarea
            value={formData.shameTweet}
            onChange={(e) => setFormData({ ...formData, shameTweet: e.target.value })}
            placeholder="I failed to finish my project on time. I have no discipline. 😔"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none h-24 resize-none"
            maxLength={280}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {formData.shameTweet.length}/280
          </div>
          
          {formData.shameTweet && (
            <div className="mt-4">
              <p className="text-sm font-bold text-gray-700 mb-2">Preview:</p>
              <ShameTweetPreview text={formData.shameTweet} />
            </div>
          )}
        </div>

        {/* Submit */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading || !formData.title || !formData.deadline || !formData.shameTweet}
          className="w-full bg-primary text-white rounded-xl py-4 font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? 'Creating...' : 'Create Goal'}
        </motion.button>
      </motion.div>
    </div>
  );
}
