import { useState } from 'react'
import { TrendingUp, TrendingDown, Star, Trash2, Plus } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

const card = { background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: 20 }

export default function Watchlist({ watchlist = [], stocks = [], chartData = {}, onAdd, onRemove }) {
  const [input, setInput] = useState('')
  const watched = stocks.filter(s => watchlist.includes(s.symbol))

  const handleAdd = () => {
    const sym = input.trim().toUpperCase()
    if (sym && !watchlist.includes(sym)) { onAdd(sym); setInput('') }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color: '#f1f5f9', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Star size={20} color="#f59e0b" /> Watchlist
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} placeholder="Add symbol..."
            style={{ background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '8px 14px', color: '#f1f5f9', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: 180 }} />
          <button onClick={handleAdd} style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#6366f1,#818cf8)', color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {watched.length === 0
        ? <div style={{ ...card, textAlign: 'center', padding: 60, color: '#64748b', fontFamily: 'DM Sans' }}>No stocks in watchlist. Add some above!</div>
        : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {watched.map(s => {
              const pos = s.changePct >= 0
              return (
                <div key={s.symbol} style={card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, color: '#f1f5f9' }}>{s.symbol}</div>
                      <div style={{ fontFamily: 'DM Sans', fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginTop: 4 }}>${s.price.toFixed(2)}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                      <button onClick={() => onRemove(s.symbol)} style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 8, padding: '4px 8px', cursor: 'pointer', color: '#f43f5e' }}>
                        <Trash2 size={14} />
                      </button>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: pos ? '#10b981' : '#f43f5e', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 600 }}>
                        {pos ? <TrendingUp size={13} /> : <TrendingDown size={13} />}{pos ? '+' : ''}{s.changePct.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={70}>
                    <AreaChart data={(chartData[s.symbol] || []).slice(-15)}>
                      <defs>
                        <linearGradient id={`wg${s.symbol}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={pos ? '#10b981' : '#f43f5e'} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={pos ? '#10b981' : '#f43f5e'} stopOpacity={0}   />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="price" stroke={pos ? '#10b981' : '#f43f5e'} strokeWidth={2} fill={`url(#wg${s.symbol})`} dot={false} />
                      <Tooltip contentStyle={{ background: 'rgba(8,13,30,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontFamily: 'DM Sans', fontSize: 11 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'DM Sans', fontSize: 11, color: '#64748b' }}>
                    <span>H: <span style={{ color: '#10b981' }}>${s.high.toFixed(2)}</span></span>
                    <span>L: <span style={{ color: '#f43f5e' }}>${s.low.toFixed(2)}</span></span>
                    <span>Vol: {(s.volume / 1e6).toFixed(1)}M</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
    </div>
  )
}
