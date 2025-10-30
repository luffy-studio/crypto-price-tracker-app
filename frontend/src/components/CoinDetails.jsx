import { useState, useEffect } from 'react';
import { fetchCoinDetails } from '../services/api';

function CoinDetails({ coinId, onClose }) {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coinId) {
      loadCoinDetails();
    }
  }, [coinId]);

  const loadCoinDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchCoinDetails(coinId);
      setCoin(data);
      setError(null);
    } catch (err) {
      setError('Failed to load coin details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(8)}`;
  };

  if (!coinId) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] p-4 animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_10px_40px_rgba(0,0,0,0.3)] animate-[slideUp_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer text-gray-500 dark:text-white/60 w-10 h-10 rounded-full flex items-center justify-center p-0 transition-all hover:bg-gray-100 dark:hover:bg-[#2a2a2a] hover:text-gray-900 dark:hover:text-white/87" onClick={onClose}>×</button>

        {loading && <div className="text-center py-12 text-xl text-gray-500 dark:text-white/60">Loading...</div>}

        {error && (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
            <button className="mt-4 bg-red-500 text-white border-none py-3 px-6 rounded-lg cursor-pointer font-semibold hover:bg-red-600" onClick={loadCoinDetails}>Retry</button>
          </div>
        )}

        {coin && !loading && (
          <div className="p-8 md:p-6">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b-2 border-gray-200 dark:border-[#3a3a3a] md:flex-col md:items-start">
              <img src={coin.image?.large} alt={coin.name} className="w-16 h-16 rounded-full" />
              <div className="flex flex-col gap-2">
                <h2 className="m-0 text-3xl text-gray-900 dark:text-white/87">{coin.name}</h2>
                <span className="bg-gray-200 dark:bg-[#2a2a2a] text-gray-700 dark:text-white/87 py-1 px-3 rounded-md font-semibold uppercase inline-block w-fit">{coin.symbol?.toUpperCase()}</span>
                <span className="bg-indigo-500 text-white py-1 px-3 rounded-md font-semibold inline-block w-fit text-sm">Rank #{coin.market_cap_rank}</span>
              </div>
            </div>

            <div className="mb-8 p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
              <div>
                <h3 className="m-0 mb-2 text-base text-gray-500 dark:text-white/60 font-semibold">Current Price</h3>
                <p className="text-4xl md:text-3xl font-bold text-gray-900 dark:text-white/87 font-mono m-0">{formatPrice(coin.market_data?.current_price?.usd)}</p>
              </div>
              <div className="flex gap-6 mt-4 flex-wrap md:flex-col md:gap-3">
                <div className={`text-lg font-semibold py-2 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] ${
                  coin.market_data?.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  <span className="text-gray-500 dark:text-white/60 font-medium">24h: </span>
                  {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
                </div>
                <div className={`text-lg font-semibold py-2 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] ${
                  coin.market_data?.price_change_percentage_7d >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  <span className="text-gray-500 dark:text-white/60 font-medium">7d: </span>
                  {coin.market_data?.price_change_percentage_7d?.toFixed(2)}%
                </div>
                <div className={`text-lg font-semibold py-2 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] ${
                  coin.market_data?.price_change_percentage_30d >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  <span className="text-gray-500 dark:text-white/60 font-medium">30d: </span>
                  {coin.market_data?.price_change_percentage_30d?.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-1 gap-6 mb-8">
              <div className="flex flex-col gap-2 p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                <span className="text-sm text-gray-500 dark:text-white/60 font-semibold">Market Cap</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white/87">{formatNumber(coin.market_data?.market_cap?.usd)}</span>
              </div>
              <div className="flex flex-col gap-2 p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                <span className="text-sm text-gray-500 dark:text-white/60 font-semibold">24h Volume</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white/87">{formatNumber(coin.market_data?.total_volume?.usd)}</span>
              </div>
              <div className="flex flex-col gap-2 p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                <span className="text-sm text-gray-500 dark:text-white/60 font-semibold">Circulating Supply</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white/87">{coin.market_data?.circulating_supply?.toLocaleString()} {coin.symbol?.toUpperCase()}</span>
              </div>
              <div className="flex flex-col gap-2 p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                <span className="text-sm text-gray-500 dark:text-white/60 font-semibold">Total Supply</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white/87">{coin.market_data?.total_supply?.toLocaleString() || 'N/A'} {coin.symbol?.toUpperCase()}</span>
              </div>
              <div className="flex flex-col gap-2 p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                <span className="text-sm text-gray-500 dark:text-white/60 font-semibold">All-Time High</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white/87">{formatPrice(coin.market_data?.ath?.usd)}</span>
              </div>
              <div className="flex flex-col gap-2 p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                <span className="text-sm text-gray-500 dark:text-white/60 font-semibold">All-Time Low</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white/87">{formatPrice(coin.market_data?.atl?.usd)}</span>
              </div>
            </div>

            {coin.description?.en && (
              <div className="mb-8 p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl">
                <h3 className="m-0 mb-4 text-xl text-gray-900 dark:text-white/87">About {coin.name}</h3>
                <p className="leading-7 text-gray-700 dark:text-white/70 m-0" dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ').slice(0, 3).join('. ') + '.' }}></p>
              </div>
            )}

            <div className="flex gap-4 flex-wrap md:flex-col">
              {coin.links?.homepage?.[0] && (
                <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer" className="py-3 px-6 bg-indigo-500 text-white no-underline rounded-lg font-semibold transition-colors hover:bg-indigo-600 md:text-center">Website</a>
              )}
              {coin.links?.blockchain_site?.[0] && (
                <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer" className="py-3 px-6 bg-indigo-500 text-white no-underline rounded-lg font-semibold transition-colors hover:bg-indigo-600 md:text-center">Explorer</a>
              )}
              {coin.links?.repos_url?.github?.[0] && (
                <a href={coin.links.repos_url.github[0]} target="_blank" rel="noopener noreferrer" className="py-3 px-6 bg-indigo-500 text-white no-underline rounded-lg font-semibold transition-colors hover:bg-indigo-600 md:text-center">GitHub</a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoinDetails;
