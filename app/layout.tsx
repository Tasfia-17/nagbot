import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NagBot - Accountability Through Public Shame',
  description: 'Set goals, write shame tweets, and let fear of embarrassment keep you accountable.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background min-h-screen`}>
        <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                🤖
              </div>
              <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">NagBot</h1>
            </Link>
            <nav className="flex gap-4">
              <Link href="/dashboard">
                <button className="px-4 py-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all hover:scale-105 font-medium text-gray-700">
                  Dashboard
                </button>
              </Link>
              <Link href="/create">
                <button className="px-4 py-2 rounded-xl bg-primary text-white hover:scale-105 transition-all font-medium shadow-lg">
                  New Goal
                </button>
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
