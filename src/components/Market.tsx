import { useQuery } from '@tanstack/react-query';
import { fetchMarket } from '../services/api';
import type { MarketResponse, MarketItem } from '../types';

const SkeletonItem = () => (
  <div class="p-3 bg-gray-700 rounded shadow animate-pulse">
    <div class="h-5 bg-gray-600 rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-gray-600 rounded w-1/2 mb-3"></div>
    <div class="h-4 bg-gray-600 rounded w-full mb-2"></div>
    <div class="h-4 bg-gray-600 rounded w-full mb-3"></div>
    <div class="h-5 bg-gray-600 rounded w-1/4 ml-auto"></div>
  </div>
);


function Market() {
  const { data, isLoading, isError, error } = useQuery<MarketResponse, Error>({
    queryKey: ['market'],
    queryFn: fetchMarket,
  });

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => <SkeletonItem key={index} />);
    }

    if (isError) {
      return <p class="text-center text-red-400">Error loading market: {error?.message}</p>;
    }

    const items = data?.items ?? [];
    if (items.length === 0) {
      return <p class="text-center text-gray-500">Market is empty.</p>;
    }

    return items.map((item: MarketItem) => (
      <div key={item.id} class="p-3 bg-gray-700 rounded shadow hover:bg-gray-600/80 transition-colors duration-150">
        <h3 class="text-lg font-semibold text-yellow-300">{item.name}</h3>
        <p class="text-xs text-gray-400 mb-1 italic">{item.type}</p>
        <p class="text-sm mb-2">{item.description}</p>
        <p class="font-semibold text-yellow-400 text-right">{item.cost} G</p>
      </div>
    ));
  };


  return (
    <section class="p-4 bg-slate-800 rounded-lg shadow-lg">
      <h2 class="text-xl md:text-2xl font-semibold mb-4 text-cyan-300">Market</h2>
      <div class="space-y-4">
        {renderContent()}
      </div>
    </section>
  );
}

export default Market;