import type { ComponentType } from 'react';
export interface Player {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
}

export interface LeaderboardResponse {
  players: Player[];
}

export interface MarketItem {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
}

export interface MarketResponse {
  items: MarketItem[];
}

export interface WithTabsProps {
  first: ComponentType
  second: ComponentType
  firstLabel: string
  secondLabel: string
}

export interface RefetchButtonProps {
  onClick: () => void
  iconSrc: string
  iconSrcSet: string
  size?: number
  className?: string
}