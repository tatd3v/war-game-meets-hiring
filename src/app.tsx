import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Leaderboard from './components/Leaderboard';
import Market from './components/Market';

import './app.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 10,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div class="container mx-auto p-4 min-h-screen flex flex-col">
        <header class="text-center my-6 md:my-8">
          <h1 class="text-3xl md:text-4xl font-bold text-cyan-400 tracking-tight">
            Galactic Fishing Stats
          </h1>
        </header>

        <main class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Leaderboard />
          <Market />
        </main>

        <footer class="text-center mt-10 text-gray-500 text-xs">
          Bloque Hiring Challenge App
        </footer>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
