import { useState } from 'preact/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Leaderboard from './components/Leaderboard';
import Market from './components/Market';
import ServiceWorker from "./pwa/serviceWorker";

import './styles/app.css';

const queryClient = new QueryClient({});

const TABS = [
  { key: 'leaderboard', label: 'Leaderboard' },
  { key: 'market', label: 'Market' },
] as const;

type TabKey = typeof TABS[number]['key'];

const Tabs = ({ active, onChange }: { active: TabKey; onChange: (key: TabKey) => void }) => (
  <div className="lg:hidden flex justify-center gap-4 mb-4">
    {TABS.map(({ key, label }) => {
      const isActive = active === key;
      const baseClasses = 'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors';
      const activeClasses = isActive ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-gray-300';

      return (
        <button
          key={key}
          onClick={() => onChange(key)}
          aria-pressed={isActive}
          className={`${baseClasses} ${activeClasses}`}
        >
          {label}
        </button>
      );
    })}
  </div>
);

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('leaderboard');

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="h-full overflow-hidden flex flex-col mx-auto relative z-10">
          <header className="text-center my-6 md:my-8">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 tracking-tight">
              Galactic Fishing Stats
            </h1>
          </header>

          <Tabs active={activeTab} onChange={setActiveTab} />

          <main className="flex flex-1 flex-col lg:flex-row overflow-y-auto p-4 gap-6">
            <div className={`flex flex-col flex-1 min-h-0 overflow-y-auto lg:block ${activeTab !== 'leaderboard' ? 'hidden lg:block' : ''}`}>
              <Leaderboard />
            </div>

            <div className={`flex flex-col flex-1 min-h-0 overflow-y-auto lg:block ${activeTab !== 'market' ? 'hidden lg:block' : ''}`}>
              <Market />
            </div>
          </main>

          <footer className="text-center mt-4 mb-2 text-gray-500 text-xs">
            Bloque Hiring Challenge App - Developed by tatd3v
          </footer>

          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </div>

        <ServiceWorker />
      </QueryClientProvider>
    </>
  );
}