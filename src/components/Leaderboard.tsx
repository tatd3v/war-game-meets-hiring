import { useQuery } from '@tanstack/react-query'
import { fetchLeaderboard } from '../services/api'
import type { LeaderboardResponse } from '../types'

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-2"><div className="h-4 bg-gray-700 rounded w-1/4"></div></td>
    <td className="p-2"><div className="h-4 bg-gray-700 rounded w-3/4"></div></td>
    <td className="p-2 text-right"><div className="h-4 bg-gray-700 rounded w-1/2 ml-auto"></div></td>
    <td className="p-2 text-right"><div className="h-4 bg-gray-700 rounded w-1/2 ml-auto"></div></td>
    <td className="p-2 text-right"><div className="h-4 bg-gray-700 rounded w-1/2 ml-auto"></div></td>
  </tr>
)

const Leaderboard = () => {
  const { data, isLoading, isError, error } = useQuery<LeaderboardResponse, Error>({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
  })

  const rows = isLoading
    ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
    : isError
      ? (
        <tr>
          <td colSpan={5} className="p-4 text-center text-red-400">
            Error loading leaderboard: {error?.message}
          </td>
        </tr>
      )
      : (data?.players.length
        ? data.players.map(p => (
          <tr key={p.username} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
            <td className="p-2 font-semibold text-center w-1/12">{p.rank}</td>
            <td className="p-2 font-medium">{p.username}</td>
            <td className="p-2 text-right">{p.level}</td>
            <td className="p-2 text-right">{p.xp}</td>
            <td className="p-2 text-right text-yellow-400">{p.gold} G</td>
          </tr>
        ))
        : (
          <tr>
            <td colSpan={5} className="p-4 text-center text-gray-500">
              Leaderboard is empty.
            </td>
          </tr>
        )
      )

  return (
    <section className="flex flex-col p-4 bg-slate-800 rounded-lg shadow-lg h-full">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-cyan-300">
        Leaderboard
      </h2>
      <div className="flex-1 overflow-auto">
        <table className="min-w-full text-left text-sm md:text-base table-fixed">
          <thead className="border-b-2 border-gray-600 text-gray-400 uppercase text-xs whitespace-nowrap">
            <tr>
              <th className="p-2 text-center w-1/12">Rank</th>
              <th className="p-2">Username</th>
              <th className="p-2 text-right">Level</th>
              <th className="p-2 text-right">XP</th>
              <th className="p-2 text-right">Gold</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard