import { TrendingUp, TrendingDown, Briefcase } from 'lucide-react'

const card = { background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: 20 }
const PRICES = { AAPL:189.3, MSFT:415.2, GOOGL:175.5, AMZN:192.1, TSLA:248.9, NVDA:875.4, META:504.2, NFLX:628.8, JPM:198.5, V:275.3 }

export default function Portfolio({ portfolio = [] }) {
  const enriched = portfolio.map(p => {
    const price = PRICES[p.symbol] || p.avgCost
    const value = price * p.shares
    const cost  = p.avgCost * p.shares
    const pnl   = value - cost
    return { ...p, price, value, cost, pnl, pnlPct: ((pnl / cost) * 100).toFixed(2) }
  })
  const totalValue = enriched.reduce((s, p) => s + p.value, 0)
  const totalCost  = enriched.reduce((s, p) => s + p.cost,  0)
  const totalPnl   = totalValue - totalCost
  const totalPct   = ((totalPnl / totalCost) * 100).toFixed(2)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h1 style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color: '#f1f5f9', margin: 0 }}>Portfolio</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {[
          { label: 'Total Value', value: `$${totalValue.toFixed(2)}`,  color: '#6366f1' },
          { label: 'Total Cost',  value: `$${totalCost.toFixed(2)}`,   color: '#64748b' },
          { label: 'Total P&L',   value: `$${totalPnl.toFixed(2)}`,    color: totalPnl >= 0 ? '#10b981' : '#f43f5e' },
          { label: 'Return',      value: `${totalPct}%`,               color: +totalPct >= 0 ? '#10b981' : '#f43f5e' },
        ].map(({ label, value, color }) => (
          <div key={label} style={card}>
            <div style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#64748b', marginBottom: 8 }}>{label}</div>
            <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color }}>{value}</div>
          </div>
        ))}
      </div>
      <div style={card}>
        <div style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 15, color: '#f1f5f9', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Briefcase size={16} color="#6366f1" /> Holdings
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Symbol','Shares','Avg Cost','Price','Value','P&L','Return'].map(h => (
                <th key={h} style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#64748b', fontWeight: 600, textAlign: h === 'Symbol' ? 'left' : 'right', padding: '0 12px 12px', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enriched.map(p => (
              <tr key={p.symbol} style={{ borderBottom: '1px solid rgba(99,102,241,0.06)' }}>
                <td style={{ padding: '12px', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#f1f5f9' }}>{p.symbol}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 13, color: '#94a3b8' }}>{p.shares}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 13, color: '#94a3b8' }}>${p.avgCost.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 13, color: '#f1f5f9', fontWeight: 600 }}>${p.price.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 13, color: '#f1f5f9' }}>${p.value.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <span style={{ color: p.pnl >= 0 ? '#10b981' : '#f43f5e', fontSize: 13, fontFamily: 'DM Sans', display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                    {p.pnl >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />} ${Math.abs(p.pnl).toFixed(2)}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600, color: +p.pnlPct >= 0 ? '#10b981' : '#f43f5e' }}>{+p.pnlPct >= 0 ? '+' : ''}{p.pnlPct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
