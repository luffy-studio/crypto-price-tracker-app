import { useState } from 'react'
import SearchBar from './components/SearchBar'
import CoinList from './components/CoinList'
import CoinDetails from './components/CoinDetails'

function App() {
  const [selectedCoin, setSelectedCoin] = useState(null)

  const handleCoinSelect = (coinId) => {
    setSelectedCoin(coinId)
  }

  const handleCloseDetails = () => {
    setSelectedCoin(null)
  }

  return (
    <div className="min-h-screen w-full">
      <header className="text-center py-12 md:py-8 md:px-4 px-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white mb-8">
        <h1 className="m-0 text-4xl md:text-3xl font-bold [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">🚀 Crypto Price Tracker</h1>
        <p className="mt-3 mb-0 text-lg md:text-base opacity-95 font-normal">Real-time cryptocurrency prices and market data</p>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-2 pb-12 md:pb-8">
        <SearchBar onCoinSelect={handleCoinSelect} />
        <CoinList onCoinSelect={handleCoinSelect} />
      </div>

      {selectedCoin && (
        <CoinDetails coinId={selectedCoin} onClose={handleCloseDetails} />
      )}
    </div>
  )
}

export default App
