import { memo } from 'preact/compat';
import { useQuery } from '@tanstack/react-query';

import { fetchMarket } from '../services/api';
import type { MarketResponse } from '../types';
import RefetchButton from './UI/RefetchButton';

const iconSrc = '/icons/refresh-144x144.png'
const iconSrcSet = '/icons/refresh-144x144.png 144w, /icons/refresh-512x512.png 512w'

const SkeletonItem = memo(() => (
  <div className="p-3 bg-gray-700 rounded shadow animate-pulse">
    <div className="h-5 bg-gray-600 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-600 rounded w-1/2 mb-3"></div>
    <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-600 rounded w-full mb-3"></div>
    <div className="h-5 bg-gray-600 rounded w-1/4 ml-auto"></div>
  </div>
));

const MarketItem = memo(({ item }: { item: MarketResponse['items'][number] }) => (
  <div className="p-3 bg-gray-700 rounded shadow hover:bg-gray-600/80 transition-colors duration-150">
    <h3 className="text-lg font-semibold text-yellow-300">{item.name}</h3>
    <p className="text-xs text-gray-400 mb-1 italic">{item.type}</p>
    <p className="text-sm mb-2">{item.description}</p>
    <p className="font-semibold text-yellow-400 text-right">{item.cost} G</p>
  </div>
));

const Market = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<MarketResponse, Error>({
    queryKey: ['market'],
    queryFn: fetchMarket,
  });

  const content = isLoading
    ? Array.from({ length: 3 }).map((_, i) => <SkeletonItem key={i} />)
    : isError
      ? <p className="text-center text-red-400">Error loading market: {error?.message}</p>
      : !data?.items.length
        ? <p className="text-center text-gray-500">Market is empty.</p>
        : data.items.map(item => <MarketItem key={item.id} item={item} />);

  return (
    <section className="flex flex-col p-4 bg-slate-800 rounded-lg shadow-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex-1 text-xl md:text-2xl font-semibold text-cyan-300">
          Market
        </h2>
        <RefetchButton
          onClick={() => void refetch()}
          iconSrc={iconSrc}
          iconSrcSet={iconSrcSet}
          size={32}
          className="text-cyan-300"
        />
      </div>
      <div className="flex-1 overflow-auto space-y-4">
        {content}
      </div>
    </section>
  );
};

export default memo(Market);