import type { LeaderboardResponse, MarketResponse } from '../types';

const API_BASE_URL = 'https://api-game.bloque.app';

async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Network response was not ok for ${endpoint}. Status: ${response.status}. Message: ${errorText}`);
  }
  return response.json() as Promise<T>;
}

export const fetchLeaderboard = (): Promise<LeaderboardResponse> => {
  return fetchData<LeaderboardResponse>('/game/leaderboard');
};

export const fetchMarket = (): Promise<MarketResponse> => {
  return fetchData<MarketResponse>('/game/market');
};