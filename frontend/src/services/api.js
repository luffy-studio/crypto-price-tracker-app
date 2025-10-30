import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchCoins = async (page = 1, perPage = 50, currency = 'usd') => {
  try {
    const response = await api.get('/coins', {
      params: { page, per_page: perPage, currency }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};

export const fetchCoinDetails = async (coinId) => {
  try {
    const response = await api.get(`/coin/${coinId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw error;
  }
};

export const fetchTrendingCoins = async () => {
  try {
    const response = await api.get('/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    throw error;
  }
};

export const searchCoins = async (query) => {
  try {
    const response = await api.get('/search', {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching coins:', error);
    throw error;
  }
};

export const fetchGlobalData = async () => {
  try {
    const response = await api.get('/global');
    return response.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    throw error;
  }
};

export const fetchCoinChart = async (coinId, days = 7, currency = 'usd') => {
  try {
    const response = await api.get(`/coin/${coinId}/chart`, {
      params: { days, currency }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
};

export default api;
