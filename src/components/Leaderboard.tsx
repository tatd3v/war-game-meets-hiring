import { useQuery } from '@tanstack/react-query';
import { fetchLeaderboard } from '../services/api';
import type { LeaderboardResponse, Player } from '../types';

const SkeletonRow = () => (
  <tr class="animate-pulse">
    <td class="p-2"><div class="h-4 bg-gray-700 rounded w-1/4"></div></td>
    <td class="p-2"><div class="h-4 bg-gray-700 rounded w-3/4"></div></td>
    <td class="p-2 text-right"><div class="h-4 bg-gray-700 rounded w-1/2 ml-auto"></div></td>
    <td class="p-2 text-right"><div class="h-4 bg-gray-700 rounded w-1/2 ml-auto"></div></td>
    <td class="p-2 text-right"><div class="h-4 bg-gray-700 rounded w-1/2 ml-auto"></div></td>
  </tr>
);

function Leaderboard() {
  const { data, isLoading, isError, error } = useQuery<LeaderboardResponse, Error>({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
  });

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />);
    }

    if (isError) {
      return (
        <tr>
          <td colSpan={5} class="p-4 text-center text-red-400">
            Error loading leaderboard: {error?.message}
          </td>
        </tr>
      );
    }

    const players = data?.players ?? [];
    if (players.length === 0) {
      return (
        <tr>
          <td colSpan={5} class="p-4 text-center text-gray-500">
            Leaderboard is empty.
          </td>
        </tr>
      );
    }

    return players.map((player: Player) => (
      <tr key={player.username} class="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
        <td class="p-2 font-semibold text-center w-1/12">{player.rank}</td>
        <td class="p-2 font-medium">{player.username}</td>
        <td class="p-2 text-right">{player.level}</td>
        <td class="p-2 text-right">{player.xp}</td>
        <td class="p-2 text-right text-yellow-400">{player.gold} G</td>
      </tr>
    ));
  };

  return (
    <section class="p-4 bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <h2 class="text-xl md:text-2xl font-semibold mb-4 text-cyan-300">Leaderboard</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm md:text-base table-auto">
          <thead class="border-b-2 border-gray-600 text-gray-400 uppercase text-xs">
            <tr>
              <th class="p-2 text-center w-1/12">Rank</th>
              <th class="p-2">Username</th>
              <th class="p-2 text-right">Level</th>
              <th class="p-2 text-right">XP</th>
              <th class="p-2 text-right">Gold</th>
            </tr>
          </thead>
          <tbody>
            {renderContent()}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaderboard;