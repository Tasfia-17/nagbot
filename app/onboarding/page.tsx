'use client';

import { motion } from 'framer-motion';
import MascotCharacter from '@/components/MascotCharacter';
import { useState } from 'react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-xl text-center"
      >
        {step === 1 && (
          <>
            <MascotCharacter mood="happy" size={200} />
            <h2 className="text-4xl font-extrabold text-gray-800 mt-6">Meet NagBot!</h2>
            <p className="text-lg text-gray-600 mt-4">
              I&apos;m here to help you stay accountable. Set goals, and I&apos;ll make sure you follow through... or else. 😈
            </p>
            <button
              onClick={() => setStep(2)}
              className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              Let&apos;s Go!
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <MascotCharacter mood="neutral" size={200} />
            <h2 className="text-4xl font-extrabold text-gray-800 mt-6">Connect Twitter</h2>
            <p className="text-lg text-gray-600 mt-4">
              I need permission to post tweets on your behalf. Don&apos;t worry, I&apos;ll only tweet when you miss a deadline.
            </p>
            <div className="bg-accent/10 border-2 border-accent rounded-2xl p-4 mt-6">
              <p className="text-sm text-accent font-bold">⚠️ Required Permissions:</p>
              <ul className="text-sm text-gray-700 mt-2 text-left">
                <li>• Read your profile</li>
                <li>• Post tweets</li>
                <li>• Stay connected (offline access)</li>
              </ul>
            </div>
            <button
              onClick={() => setStep(3)}
              className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              Connect Twitter
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <MascotCharacter mood="worried" size={200} />
            <h2 className="text-4xl font-extrabold text-gray-800 mt-6">The Stakes Are Real</h2>
            <p className="text-lg text-gray-600 mt-4">
              If you miss a deadline, your shame tweet goes public. No exceptions. No mercy.
            </p>
            <div className="bg-accent/10 border-2 border-accent rounded-2xl p-6 mt-6">
              <p className="text-accent font-bold text-lg">This is not a drill.</p>
              <p className="text-gray-700 mt-2">
                Your reputation is on the line. Choose your goals wisely.
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/create'}
              className="mt-8 px-8 py-4 bg-accent text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              I Understand
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
