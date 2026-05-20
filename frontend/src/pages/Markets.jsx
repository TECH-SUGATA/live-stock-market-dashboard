import { useState } from 'react'
import { TrendingUp, TrendingDown, Search } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

const card = { background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: 20 }

function MiniChart({ data, pos }) {
  if (!data || !data.length) return null
  return (
    <ResponsiveContainer width={80} height={36}>
      <AreaChart data={data.slice(-10)}>
        <defs>
          <linearGradient id={`mg${pos}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={pos ? '#10b981' : '#f43f5e'} stopOpacity={0.3} />
            <stop offset="95%" stopColor={pos ? '#10b981' : '#f43f5e'} stopOpacity={0}   />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="price" stroke={pos ? '#10b981' : '#f43f5e'} strokeWidth={1.5} fill={`url(#mg${pos})`} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default function Markets({ stocks = [], loading, chartData = {} }) {
  const [search, setSearch] = useState('')
  const filtered = stocks.filter(s => s.symbol.toLowerCase().includes(search.toLowerCase()))

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: 'DM Sans', color: '#64748b' }}>Loading markets...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color: '#f1f5f9', margin: 0 }}>Markets</h1>
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symbol..."
            style={{ background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '8px 12px 8px 34px', color: '#f1f5f9', fontFamily: 'DM Sans', fontSize: 13, outline: 'none', width: 200 }} />
        </div>
      </div>
      <div style={card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Symbol','Price','Change','Chart','Volume','High','Low'].map(h => (
                <th key={h} style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#64748b', fontWeight: 600, textAlign: h === 'Symbol' ? 'left' : 'right', padding: '0 12px 12px', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const pos = s.changePct >= 0
              return (
                <tr key={s.symbol} style={{ borderBottom: '1px solid rgba(99,102,241,0.06)' }}>
                  <td style={{ padding: '12px', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#f1f5f9' }}>{s.symbol}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 14, color: '#f1f5f9', fontWeight: 500 }}>${s.price.toFixed(2)}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: pos ? '#10b981' : '#f43f5e', fontSize: 13, fontFamily: 'DM Sans' }}>
                      {pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{pos ? '+' : ''}{s.changePct.toFixed(2)}%
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}><MiniChart data={chartData[s.symbol]} pos={pos} /></td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 12, color: '#64748b' }}>{(s.volume / 1e6).toFixed(1)}M</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 12, color: '#10b981' }}>${s.high.toFixed(2)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 12, color: '#f43f5e' }}>${s.low.toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
