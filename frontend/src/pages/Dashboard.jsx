import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Activity, Star } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const card = { background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: 20 }

function StatCard({ label, value, change, icon: Icon, color }) {
  const pos = change >= 0
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ ...card, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#64748b', marginBottom: 6 }}>{label}</div>
          <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color: '#f1f5f9' }}>{value}</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: pos ? '#10b981' : '#f43f5e' }}>
        {pos ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        {pos ? '+' : ''}{change}% today
      </div>
    </motion.div>
  )
}

export default function Dashboard({ stocks = [], gainers = [], losers = [], watchlist = [], portfolio = [], loading, chartData = {}, addToWatchlist, removeFromWatchlist }) {
  const totalValue = portfolio.reduce((sum, p) => { const s = stocks.find(x => x.symbol === p.symbol); return sum + (s ? s.price * p.shares : p.avgCost * p.shares) }, 0)
  const totalCost  = portfolio.reduce((sum, p) => sum + p.avgCost * p.shares, 0)
  const totalPnl   = totalValue - totalCost
  const pnlPct     = totalCost ? +((totalPnl / totalCost) * 100).toFixed(2) : 0
  const chartStock = stocks[0]
  const chart      = chartStock ? chartData[chartStock.symbol] || [] : []

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: 'DM Sans', color: '#64748b' }}>Loading market data...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard label="Portfolio Value" value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} change={pnlPct} icon={DollarSign} color="#6366f1" />
        <StatCard label="Total P&L"       value={`$${totalPnl.toFixed(2)}`} change={pnlPct} icon={TrendingUp} color="#10b981" />
        <StatCard label="Watchlist"       value={`${watchlist.length} stocks`} change={1.2} icon={Star} color="#f59e0b" />
        <StatCard label="Market Activity" value={`${stocks.filter(s => s.changePct > 0).length}/${stocks.length} up`} change={0.8} icon={Activity} color="#06b6d4" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={card}>
          <div style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 15, color: '#f1f5f9', marginBottom: 16 }}>{chartStock?.symbol} — Price History</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chart}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} axisLine={false} interval={6} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} tickLine={false} axisLine={false} domain={['auto','auto']} />
              <Tooltip contentStyle={{ background: 'rgba(8,13,30,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 12 }} />
              <Area type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <div style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14, color: '#10b981', marginBottom: 4 }}>Top Gainers</div>
          {gainers.map(s => (
            <div key={s.symbol} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(99,102,241,0.08)', fontFamily: 'DM Sans', fontSize: 13 }}>
              <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{s.symbol}</span>
              <span style={{ color: '#10b981' }}>+{s.changePct.toFixed(2)}%</span>
            </div>
          ))}
          <div style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14, color: '#f43f5e', margin: '16px 0 4px' }}>Top Losers</div>
          {losers.map(s => (
            <div key={s.symbol} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(99,102,241,0.08)', fontFamily: 'DM Sans', fontSize: 13 }}>
              <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{s.symbol}</span>
              <span style={{ color: '#f43f5e' }}>{s.changePct.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 15, color: '#f1f5f9', marginBottom: 8 }}>All Stocks</div>
        {stocks.map(s => (
          <div key={s.symbol} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(99,102,241,0.08)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14, color: '#f1f5f9' }}>{s.symbol}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Vol: {(s.volume / 1e6).toFixed(1)}M</div>
            </div>
            <div style={{ textAlign: 'right', marginRight: 16 }}>
              <div style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14, color: '#f1f5f9' }}>${s.price.toFixed(2)}</div>
              <div style={{ fontSize: 12, color: s.changePct >= 0 ? '#10b981' : '#f43f5e' }}>{s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%</div>
            </div>
            <button onClick={() => watchlist.includes(s.symbol) ? removeFromWatchlist(s.symbol) : addToWatchlist(s.symbol)}
              style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${watchlist.includes(s.symbol) ? 'rgba(245,158,11,0.4)' : 'rgba(99,102,241,0.3)'}`, background: watchlist.includes(s.symbol) ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.1)', color: watchlist.includes(s.symbol) ? '#f59e0b' : '#818cf8', cursor: 'pointer', fontSize: 14 }}>
              {watchlist.includes(s.symbol) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
