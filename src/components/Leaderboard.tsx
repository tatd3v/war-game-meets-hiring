import { useEffect } from 'preact/hooks'
import { memo, useMemo } from 'preact/compat'
import { useQuery } from '@tanstack/react-query'

import { fetchLeaderboard } from '../services/api'
import RefetchButton from './UI/RefetchButton'

import type { LeaderboardResponse, Player } from '../types'

const iconSrc = '/icons/refresh-144x144.png'
const iconSrcSet = '/icons/refresh-144x144.png 144w, /icons/refresh-512x512.png 512w'

const SkeletonRow = memo(() => (
  <tr className="animate-pulse">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className="p-2">
        <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
      </td>
    ))}
  </tr>
))

interface PlayerRowProps { p: Player }
const PlayerRow = memo(({ p }: PlayerRowProps) => (
  <tr key={p.username} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
    <td className="p-2 font-semibold text-center w-1/12 md:w-auto">{p.rank}</td>
    <td className="p-2 font-medium w-1/3 md:w-auto">{p.username}</td>
    <td className="p-2 text-right w-1/6 md:w-auto">{p.level}</td>
    <td className="p-2 text-right w-1/6 md:w-auto">{p.xp}</td>
    <td className="p-2 text-right text-yellow-400 w-1/6 md:w-auto">{p.gold} G</td>
    <td className="p-2 text-right w-1/6 md:w-auto" title={p.emojiDescription}>{p.fishEmojis}</td>
    <td className="p-2 text-right w-1/6 md:w-auto">
      {p.isInfected ? <span className="text-red-400">🦠</span> : <span className="text-green-400">❤️</span>}
    </td>
  </tr>
))

const Leaderboard = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<LeaderboardResponse, Error>({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
    refetchInterval: 300000,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (data) {
      console.log('Data fetched:', data)
    }
  }, [data])

  const rows = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
    }
    if (isError) {
      return (
        <tr>
          <td colSpan={5} className="p-4 text-center text-red-400">
            Error loading leaderboard: {error?.message}
          </td>
        </tr>
      )
    }
    if (data?.players.length) {
      return data.players.map(p => <PlayerRow key={p.username} p={p} />)
    }
    return (
      <tr>
        <td colSpan={5} className="p-4 text-center text-gray-500">
          Leaderboard is empty.
        </td>
      </tr>
    )
  }, [isLoading, isError, error?.message, data?.players])

  return (
    <section className="flex flex-col p-4 bg-slate-800 rounded-lg shadow-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex-1 text-xl md:text-2xl font-semibold text-cyan-300">Leaderboard</h2>
        <RefetchButton
          onClick={() => void refetch()}
          iconSrc={iconSrc}
          iconSrcSet={iconSrcSet}
          size={32}
          className="text-cyan-300"
        />
      </div>
      <div className="flex-1 overflow-auto">
        <table className="min-w-full text-left text-sm md:text-base table-auto">
          <thead className="border-b-2 border-gray-600 text-gray-400 uppercase text-xs whitespace-nowrap">
            <tr>
              <th className="p-2 text-center w-1/12 md:w-auto">Rank</th>
              <th className="p-2 w-1/3 md:w-auto">Username</th>
              <th className="p-2 text-right w-1/6 md:w-auto">Level</th>
              <th className="p-2 text-right w-1/6 md:w-auto">XP</th>
              <th className="p-2 text-right w-1/6 md:w-auto">Gold</th>
              <th className="p-2 text-right w-1/6 md:w-auto">Fish</th>
              <th className="p-2 text-right w-1/6 md:w-auto">Infected</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </section>
  )
}

export default memo(Leaderboard)