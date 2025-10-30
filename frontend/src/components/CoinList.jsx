import { useState, useEffect } from 'react';
import { fetchCoins } from '../services/api';

function CoinList({ onCoinSelect }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap_rank', direction: 'asc' });

  useEffect(() => {
    loadCoins();
  }, []);

  const loadCoins = async () => {
    try {
      setLoading(true);
      const data = await fetchCoins(1, 100);
      setCoins(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cryptocurrencies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num?.toFixed(2) || 0}`;
  };

  const formatPrice = (price) => {
    if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(8)}`;
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...coins].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setCoins(sorted);
  };

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading cryptocurrencies...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
        <button className="mt-4 bg-red-500 text-white border-none py-2.5 px-6 rounded-md cursor-pointer font-semibold hover:bg-red-600" onClick={loadCoins}>Retry</button>
      </div>
    );
  }

  return (
    <div className="w-full my-8 mx-auto px-4">
      <div className="flex justify-between items-center mb-6 px-2 md:flex-col md:gap-4 md:items-start">
        <h2 className="m-0 text-3xl md:text-2xl text-gray-800 dark:text-white/87">Cryptocurrency Prices by Market Cap</h2>
        <button onClick={loadCoins} className="bg-indigo-500 text-white border-none py-2 px-5 rounded-md cursor-pointer font-semibold transition-colors hover:bg-indigo-600">Refresh</button>
      </div>
      
      <div className="overflow-x-auto bg-white dark:bg-[#1a1a1a] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-gray-50 dark:bg-[#2a2a2a] border-b-2 border-gray-200 dark:border-[#3a3a3a]">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-white/87 cursor-pointer select-none transition-colors hover:bg-gray-200 dark:hover:bg-[#3a3a3a]" onClick={() => handleSort('market_cap_rank')}>#</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-white/87">Coin</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-white/87 cursor-pointer select-none transition-colors hover:bg-gray-200 dark:hover:bg-[#3a3a3a]" onClick={() => handleSort('current_price')}>Price</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-white/87 cursor-pointer select-none transition-colors hover:bg-gray-200 dark:hover:bg-[#3a3a3a]" onClick={() => handleSort('price_change_percentage_24h')}>24h %</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-white/87 cursor-pointer select-none transition-colors hover:bg-gray-200 dark:hover:bg-[#3a3a3a]" onClick={() => handleSort('price_change_percentage_7d_in_currency')}>7d %</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-white/87 cursor-pointer select-none transition-colors hover:bg-gray-200 dark:hover:bg-[#3a3a3a]" onClick={() => handleSort('market_cap')}>Market Cap</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-white/87 cursor-pointer select-none transition-colors hover:bg-gray-200 dark:hover:bg-[#3a3a3a]" onClick={() => handleSort('total_volume')}>Volume(24h)</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="border-b border-gray-200 dark:border-[#3a3a3a] cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-[#2a2a2a]" onClick={() => onCoinSelect && onCoinSelect(coin.id)}>
                <td className="p-4 text-gray-900 dark:text-white/87">{coin.market_cap_rank}</td>
                <td className="p-4 text-gray-900 dark:text-white/87">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-900 dark:text-white/87">{coin.name}</span>
                      <span className="text-sm text-gray-500 dark:text-white/60 uppercase">{coin.symbol.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-900 dark:text-white/87 font-semibold font-mono">{formatPrice(coin.current_price)}</td>
                <td className={`p-4 font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className={`p-4 font-semibold ${coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </td>
                <td className="p-4 text-gray-900 dark:text-white/87">{formatNumber(coin.market_cap)}</td>
                <td className="p-4 text-gray-900 dark:text-white/87">{formatNumber(coin.total_volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoinList;
