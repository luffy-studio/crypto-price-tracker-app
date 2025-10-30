import { useState } from 'react';
import { searchCoins } from '../services/api';

function SearchBar({ onCoinSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchCoins(searchQuery);
      setResults(data.coins || []);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectCoin = (coinId) => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    if (onCoinSelect) {
      onCoinSelect(coinId);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8 md:mb-6">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="w-full py-4 pr-12 pl-6 md:py-3.5 md:pr-10 md:pl-4 md:text-[0.95rem] text-base border-2 border-gray-200 dark:border-[#3a3a3a] rounded-xl outline-none transition-all bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white/87 placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(100,108,255,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(100,108,255,0.2)]"
        />
        {isSearching && <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xl animate-spin">🔍</div>}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white dark:bg-[#1a1a1a] border-2 border-gray-200 dark:border-[#3a3a3a] rounded-xl max-h-96 md:max-h-[300px] overflow-y-auto shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-[100] animate-slideDown">
          {results.slice(0, 10).map((coin) => (
            <div
              key={coin.id}
              className="flex items-center gap-4 p-4 cursor-pointer transition-colors border-b border-gray-200 dark:border-[#3a3a3a] last:border-b-0 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
              onClick={() => handleSelectCoin(coin.id)}
            >
              <img src={coin.thumb || coin.large} alt={coin.name} className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-semibold text-gray-900 dark:text-white/87">{coin.name}</span>
                <span className="text-sm text-gray-500 dark:text-white/60 uppercase">{coin.symbol}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-white/60 font-semibold">#{coin.market_cap_rank || 'N/A'}</span>
            </div>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && !isSearching && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white dark:bg-[#1a1a1a] border-2 border-gray-200 dark:border-[#3a3a3a] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-[100] animate-slideDown">
          <div className="py-8 text-center text-gray-500 dark:text-white/60">No results found</div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
