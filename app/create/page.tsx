'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Target, Clock, Twitter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ShameTweetPreview from '@/components/ShameTweetPreview';
import NightSkyBackground from '@/components/backgrounds/NightSkyBackground';

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
          userId: 'demo-user',
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
    <>
      <NightSkyBackground />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/25 backdrop-blur-3xl border-2 border-white/40 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow">Create New Goal 🎯</h2>

          {/* Goal Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Target size={20} />
              What do you want to accomplish?
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Finish project proposal"
              className="w-full px-5 py-4 rounded-2xl border-2 border-white/40 bg-white/50 backdrop-blur-xl focus:border-primary focus:outline-none text-lg font-medium shadow-lg"
            />
          </motion.div>

          {/* Deadline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Clock size={20} />
              When's the deadline?
            </label>
            <input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border-2 border-white/40 bg-white/50 backdrop-blur-xl focus:border-primary focus:outline-none text-lg font-medium shadow-lg"
            />
          </motion.div>

          {/* Verification Method */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <label className="block text-sm font-bold text-gray-800 mb-4">
              How will you verify completion?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['manual', 'github', 'strava', 'webhook'].map((method) => (
                <motion.button
                  key={method}
                  onClick={() => setFormData({ ...formData, verificationMethod: method })}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-5 rounded-2xl border-2 font-bold capitalize text-lg shadow-lg transition-all ${
                    formData.verificationMethod === method
                      ? 'border-primary bg-primary/30 text-primary backdrop-blur-xl'
                      : 'border-white/40 bg-white/30 backdrop-blur-xl hover:border-white/60'
                  }`}
                >
                  {method}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Shame Tweet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Twitter size={20} />
              Write your shame tweet
            </label>
            <textarea
              value={formData.shameTweet}
              onChange={(e) => setFormData({ ...formData, shameTweet: e.target.value })}
              placeholder="I failed to finish my project on time. I have no discipline. 😔"
              className="w-full px-5 py-4 rounded-2xl border-2 border-white/40 bg-white/50 backdrop-blur-xl focus:border-accent focus:outline-none h-28 resize-none text-lg font-medium shadow-lg"
              maxLength={280}
            />
            <div className="text-right text-sm text-gray-700 mt-2 font-bold">
              {formData.shameTweet.length}/280
            </div>
            
            {formData.shameTweet && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5"
              >
                <p className="text-sm font-bold text-gray-800 mb-3">Preview:</p>
                <ShameTweetPreview text={formData.shameTweet} />
              </motion.div>
            )}
          </motion.div>

          {/* Submit */}
          <motion.button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.deadline || !formData.shameTweet}
            whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -3 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-2xl py-5 font-bold text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/30"
          >
            {loading ? '🤖 Creating...' : 'Create Goal 🚀'}
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
