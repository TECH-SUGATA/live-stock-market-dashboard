import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const TICKERS = [
  { symbol: 'AAPL',  price: 189.30, change: 1.24  },
  { symbol: 'GOOGL', price: 175.50, change: -0.53 },
  { symbol: 'MSFT',  price: 415.20, change: 2.11  },
  { symbol: 'TSLA',  price: 248.90, change: -3.42 },
  { symbol: 'AMZN',  price: 192.10, change: 0.88  },
  { symbol: 'NVDA',  price: 875.40, change: 5.67  },
  { symbol: 'META',  price: 504.20, change: -1.23 },
  { symbol: 'NFLX',  price: 628.80, change: 3.14  },
  { symbol: 'BTC',   price: 67420,  change: 2.34  },
  { symbol: 'ETH',   price: 3540,   change: -1.12 },
]

export default function MarketTicker() {
  const [tickers, setTickers] = useState(TICKERS)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => ({
        ...t,
        price: +(t.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2),
        change: +(t.change + (Math.random() - 0.5) * 0.1).toFixed(2),
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const doubled = [...tickers, ...tickers]

  return (
    <div style={{
      background: 'rgba(8,13,30,0.95)',
      borderBottom: '1px solid rgba(99,102,241,0.12)',
      overflow: 'hidden', height: 40,
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        animation: 'ticker-scroll 40s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {doubled.map((t, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0 24px', fontFamily: 'DM Sans', fontSize: 12,
            borderRight: '1px solid rgba(99,102,241,0.1)',
          }}>
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>{t.symbol}</span>
            <span style={{ color: '#f1f5f9', fontWeight: 500 }}>${t.price.toLocaleString()}</span>
            <span style={{ color: t.change >= 0 ? '#10b981' : '#f43f5e', display: 'flex', alignItems: 'center', gap: 2 }}>
              {t.change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
