const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cache for 2 minutes
const cache = new NodeCache({ stdTTL: 120 });

// Middleware
app.use(cors());
app.use(express.json());

// CoinGecko API base URL (Free - no API key required)
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Helper function to fetch with cache
const fetchWithCache = async (cacheKey, url) => {
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(url);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Routes

// Get top cryptocurrencies by market cap
app.get('/api/coins', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.per_page || 50;
    const currency = req.query.currency || 'usd';

    const url = `${COINGECKO_API}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`;
    const cacheKey = `coins_${currency}_${page}_${perPage}`;
    
    const data = await fetchWithCache(cacheKey, url);
    res.json(data);
  } catch (error) {
    console.error('Error fetching coins:', error.message);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
  }
});

// Get single coin details
app.get('/api/coin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${COINGECKO_API}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`;
    const cacheKey = `coin_${id}`;
    
    const data = await fetchWithCache(cacheKey, url);
    res.json(data);
  } catch (error) {
    console.error('Error fetching coin details:', error.message);
    res.status(500).json({ error: 'Failed to fetch coin details' });
  }
});

// Get trending coins
app.get('/api/trending', async (req, res) => {
  try {
    const url = `${COINGECKO_API}/search/trending`;
    const cacheKey = 'trending';
    
    const data = await fetchWithCache(cacheKey, url);
    res.json(data);
  } catch (error) {
    console.error('Error fetching trending coins:', error.message);
    res.status(500).json({ error: 'Failed to fetch trending coins' });
  }
});

// Search coins
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const url = `${COINGECKO_API}/search?query=${query}`;
    const data = await axios.get(url);
    res.json(data.data);
  } catch (error) {
    console.error('Error searching coins:', error.message);
    res.status(500).json({ error: 'Failed to search coins' });
  }
});

// Get global crypto market data
app.get('/api/global', async (req, res) => {
  try {
    const url = `${COINGECKO_API}/global`;
    const cacheKey = 'global';
    
    const data = await fetchWithCache(cacheKey, url);
    res.json(data);
  } catch (error) {
    console.error('Error fetching global data:', error.message);
    res.status(500).json({ error: 'Failed to fetch global market data' });
  }
});

// Get coin price history (chart data)
app.get('/api/coin/:id/chart', async (req, res) => {
  try {
    const { id } = req.params;
    const days = req.query.days || 7;
    const currency = req.query.currency || 'usd';
    
    const url = `${COINGECKO_API}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
    const cacheKey = `chart_${id}_${currency}_${days}`;
    
    const data = await fetchWithCache(cacheKey, url);
    res.json(data);
  } catch (error) {
    console.error('Error fetching chart data:', error.message);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Crypto Price Tracker Backend running on http://localhost:${PORT}`);
});
