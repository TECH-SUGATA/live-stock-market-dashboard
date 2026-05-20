import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useStockData = (symbol) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/stocks/${symbol}`);
      setStockData(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { stockData, loading, error, refetch: fetchData };
};

export default useStockData;
