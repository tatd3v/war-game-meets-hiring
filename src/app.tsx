import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Leaderboard from './components/Leaderboard';
import Market from './components/Market';
import './styles/app.css';

const queryClient = new QueryClient({});

export function App() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'market'>('leaderboard');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full overflow-hidden flex flex-col mx-auto relative z-[1]">
        <header className="text-center my-6 md:my-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 tracking-tight">
            Galactic Fishing Stats
          </h1>
        </header>
        <div className="md:hidden flex justify-center gap-4 mb-4">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded ${activeTab === 'leaderboard'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-700 text-gray-300'
              }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-2 rounded ${activeTab === 'market'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-700 text-gray-300'
              }`}
          >
            Market
          </button>
        </div>
        <main className="flex flex-1 flex-col md:flex-row overflow-y-auto p-4 gap-6 md:gap-8">
          <div
            className={`
              flex flex-col flex-1 min-h-0 overflow-y-auto
              ${activeTab !== 'leaderboard' ? 'hidden md:flex' : ''}
            `}
          >
            <Leaderboard />
          </div>
          <div
            className={`
              flex flex-col flex-1 min-h-0 overflow-y-auto
              ${activeTab !== 'market' ? 'hidden md:flex' : ''}
            `}
          >
            <Market />
          </div>
        </main>
        <footer className="text-center mt-4 mb-2 text-gray-500 text-xs">
          Bloque Hiring Challenge App - Developed by tatd3v
        </footer>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}