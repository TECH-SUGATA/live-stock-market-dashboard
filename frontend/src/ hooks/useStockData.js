import { useState, useEffect, useCallback } from 'react'

const SYMBOLS = ['AAPL','MSFT','GOOGL','AMZN','TSLA','NVDA','META','NFLX','JPM','V']

function generateStock(symbol) {
  const bases = { AAPL:189.3, MSFT:415.2, GOOGL:175.5, AMZN:192.1, TSLA:248.9, NVDA:875.4, META:504.2, NFLX:628.8, JPM:198.5, V:275.3 }
  const base = bases[symbol] || 100
  const change = (Math.random() - 0.48) * base * 0.03
  const price = +(base + change).toFixed(2)
  return {
    symbol, price,
    change: +change.toFixed(2),
    changePct: +((change / base) * 100).toFixed(2),
    volume: Math.floor(Math.random() * 50000000) + 5000000,
    high: +(price * 1.015).toFixed(2),
    low: +(price * 0.985).toFixed(2),
  }
}

function generateChartData() {
  const data = []
  let price = 150 + Math.random() * 200
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    price = price * (1 + (Math.random() - 0.48) * 0.025)
    data.push({ date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), price: +price.toFixed(2) })
  }
  return data
}

export function useStockData() {
  const [stocks, setStocks] = useState([])
  const [chartData, setChartData] = useState({})
  const [watchlist, setWatchlist] = useState(['AAPL', 'TSLA', 'NVDA'])
  const [portfolio] = useState([
    { symbol: 'AAPL',  shares: 10, avgCost: 175.0 },
    { symbol: 'MSFT',  shares: 5,  avgCost: 390.0 },
    { symbol: 'NVDA',  shares: 3,  avgCost: 820.0 },
    { symbol: 'GOOGL', shares: 8,  avgCost: 165.0 },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setStocks(SYMBOLS.map(generateStock))
    const charts = {}
    SYMBOLS.forEach(s => { charts[s] = generateChartData() })
    setChartData(charts)
    setLoading(false)
    const interval = setInterval(() => setStocks(SYMBOLS.map(generateStock)), 5000)
    return () => clearInterval(interval)
  }, [])

  const gainers = [...stocks].sort((a, b) => b.changePct - a.changePct).slice(0, 5)
  const losers  = [...stocks].sort((a, b) => a.changePct - b.changePct).slice(0, 5)
  const addToWatchlist    = useCallback((s) => setWatchlist(p => p.includes(s) ? p : [...p, s]), [])
  const removeFromWatchlist = useCallback((s) => setWatchlist(p => p.filter(x => x !== s)), [])

  return { stocks, chartData, watchlist, portfolio, loading, gainers, losers, addToWatchlist, removeFromWatchlist }
}
