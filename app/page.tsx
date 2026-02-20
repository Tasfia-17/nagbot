import MascotCharacter from '@/components/MascotCharacter';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <MascotCharacter mood="happy" size={250} />
      <h2 className="text-5xl font-extrabold text-gray-800 mt-8 tracking-tight">
        Welcome to NagBot
      </h2>
      <p className="text-xl text-gray-600 mt-4 max-w-2xl">
        The accountability tool that keeps you honest through the power of public shame.
        Set goals, write embarrassing tweets, and let fear be your motivator.
      </p>
      <div className="flex gap-4 mt-8">
        <Link href="/create">
          <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl">
            Get Started
          </button>
        </Link>
        <Link href="/dashboard">
          <button className="px-8 py-4 bg-white/80 backdrop-blur-xl text-gray-800 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl border border-white/20">
            View Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
