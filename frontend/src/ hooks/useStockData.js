// frontend/src/hooks/useStockData.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useStockData = (symbol) => {
  const [quote, setQuote] = useState(null);
  const [candles, setCandles] = useState(null);
  const [profile, setProfile] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = useCallback(async () => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    try {
      const [quoteRes, profileRes, newsRes] = await Promise.all([
        axios.get(`${API_URL}/api/stocks/quote/${symbol}`),
        axios.get(`${API_URL}/api/stocks/profile/${symbol}`),
        axios.get(`${API_URL}/api/stocks/news/${symbol}`),
      ]);
      setQuote(quoteRes.data);
      setProfile(profileRes.data);
      setNews(newsRes.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  const fetchCandles = useCallback(async (resolution = 'D') => {
    if (!symbol) return;
    try {
      const res = await axios.get(
        `${API_URL}/api/stocks/candles/${symbol}?resolution=${resolution}`
      );
      setCandles(res.data);
    } catch (err) {
      console.error('Failed to fetch candles:', err);
    }
  }, [symbol]);

  useEffect(() => {
    fetchQuote();
    fetchCandles();
  }, [fetchQuote, fetchCandles]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!symbol) return;
    const interval = setInterval(fetchQuote, 30000);
    return () => clearInterval(interval);
  }, [symbol, fetchQuote]);

  return { quote, candles, profile, news, loading, error, refetch: fetchQuote };
};

export default useStockData;
