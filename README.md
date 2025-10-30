# 🚀 Crypto Price Tracker

A real-time cryptocurrency price tracking application built with React and Node.js. Track live prices, market caps, trading volumes, and detailed information for thousands of cryptocurrencies.

## Features

- 📊 **Real-time Price Updates** - Live cryptocurrency prices and market data
- 🔍 **Search Functionality** - Quickly find any cryptocurrency
- 📈 **Detailed Coin Information** - View comprehensive stats, price changes, and descriptions
- 💹 **Market Statistics** - Market cap, 24h volume, circulating supply, and more
- 🎨 **Modern UI** - Clean, responsive design with dark mode support
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 🔄 **Caching** - Smart caching to reduce API calls and improve performance

## Tech Stack

### Frontend
- React 19
- Vite
- Axios
- CSS3 with responsive design

### Backend
- Node.js
- Express
- Axios
- Node-Cache
- CoinGecko API (free, no API key required)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd crypto-price-tracker-app-main
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

### Start the Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Browse the list of top cryptocurrencies by market cap
3. Use the search bar to find specific coins
4. Click on any cryptocurrency to view detailed information
5. Click the refresh button to update prices
6. Sort the table by clicking on column headers

## API Endpoints

The backend provides the following endpoints:

- `GET /api/coins` - Get list of cryptocurrencies
  - Query params: `page`, `per_page`, `currency`
- `GET /api/coin/:id` - Get detailed coin information
- `GET /api/trending` - Get trending coins
- `GET /api/search?q=query` - Search for cryptocurrencies
- `GET /api/global` - Get global market data
- `GET /api/coin/:id/chart` - Get price history chart data
  - Query params: `days`, `currency`
- `GET /health` - Health check endpoint

## Project Structure

```
crypto-price-tracker-app-main/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── package.json
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── CoinList.jsx
│   │   │   ├── CoinDetails.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── services/     # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx       # Main app component
│   │   ├── main.jsx      # Entry point
│   │   └── *.css         # Styling files
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

## Features in Detail

### Coin List
- Displays top 100 cryptocurrencies by market cap
- Shows price, 24h change, 7d change, market cap, and volume
- Sortable columns
- Click on any coin to view details

### Search Bar
- Real-time search as you type
- Search by coin name or symbol
- Displays top 10 matching results
- Quick navigation to coin details

### Coin Details Modal
- Current price and price changes (24h, 7d, 30d)
- Market statistics (market cap, volume, supply)
- All-time high and low prices
- Coin description and important links
- Website, blockchain explorer, and GitHub links

## Performance Optimization

- **Caching**: Backend caches API responses for 2 minutes to reduce load
- **Efficient Re-renders**: React components optimized with proper state management
- **Lazy Loading**: Only loads data when needed
- **Responsive Design**: Optimized for all screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues

- CoinGecko API has rate limits on the free tier (check their documentation)
- Some coins may not have complete data available

## Future Enhancements

- [ ] Add price charts with historical data
- [ ] Implement watchlist/favorites
- [ ] Add portfolio tracking
- [ ] Price alerts
- [ ] Multiple currency support
- [ ] More detailed analytics

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

ISC

## Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for providing free cryptocurrency data
- React team for the amazing framework
- Vite team for the blazing fast build tool

---

**Note**: This application uses the free tier of CoinGecko API. For production use, consider their paid plans for higher rate limits and additional features.
