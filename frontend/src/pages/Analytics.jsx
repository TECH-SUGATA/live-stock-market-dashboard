import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const card = { background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: 20 }

const SECTORS  = [{ name:'Technology',value:42,color:'#6366f1'},{name:'Finance',value:18,color:'#06b6d4'},{name:'Healthcare',value:14,color:'#10b981'},{name:'Consumer',value:12,color:'#f59e0b'},{name:'Energy',value:8,color:'#f43f5e'},{name:'Other',value:6,color:'#8b5cf6'}]
const MONTHLY  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => ({ month:m, gain:+(Math.random()*8+2).toFixed(1), loss:-(+(Math.random()*4+1).toFixed(1)) }))
const PERF     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m,i) => ({ month:m, portfolio:+(100+i*3.2+Math.random()*8).toFixed(2), benchmark:+(100+i*2.1+Math.random()*5).toFixed(2) }))

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h1 style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 22, color: '#f1f5f9', margin: 0 }}>Analytics</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
        {[{label:'Sharpe Ratio',value:'1.84',color:'#6366f1'},{label:'Win Rate',value:'67.3%',color:'#10b981'},{label:'Max Drawdown',value:'-8.2%',color:'#f43f5e'},{label:'Alpha',value:'+3.4%',color:'#06b6d4'},{label:'Beta',value:'0.92',color:'#f59e0b'}].map(({label,value,color}) => (
          <div key={label} style={card}>
            <div style={{ fontFamily:'DM Sans', fontSize:11, color:'#64748b', marginBottom:8 }}>{label}</div>
            <div style={{ fontFamily:'DM Sans', fontWeight:700, fontSize:24, color }}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={card}>
          <div style={{ fontFamily:'DM Sans', fontWeight:600, fontSize:15, color:'#f1f5f9', marginBottom:16 }}>Portfolio vs Benchmark</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={PERF}>
              <XAxis dataKey="month" tick={{ fill:'#475569', fontSize:10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill:'#475569', fontSize:10 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background:'rgba(8,13,30,0.95)', border:'1px solid rgba(99,102,241,0.2)', borderRadius:8, fontFamily:'DM Sans', fontSize:12 }} />
              <Line type="monotone" dataKey="portfolio" stroke="#6366f1" strokeWidth={2} dot={false} name="Portfolio" />
              <Line type="monotone" dataKey="benchmark" stroke="#64748b" strokeWidth={2} dot={false} strokeDasharray="4 4" name="S&P 500" />
              <Legend wrapperStyle={{ fontFamily:'DM Sans', fontSize:12 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={card}>
          <div style={{ fontFamily:'DM Sans', fontWeight:600, fontSize:15, color:'#f1f5f9', marginBottom:16 }}>Sector Allocation</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={SECTORS} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {SECTORS.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background:'rgba(8,13,30,0.95)', border:'1px solid rgba(99,102,241,0.2)', borderRadius:8, fontFamily:'DM Sans', fontSize:12 }} />
              <Legend wrapperStyle={{ fontFamily:'DM Sans', fontSize:11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={card}>
        <div style={{ fontFamily:'DM Sans', fontWeight:600, fontSize:15, color:'#f1f5f9', marginBottom:16 }}>Monthly Performance (%)</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={MONTHLY}>
            <XAxis dataKey="month" tick={{ fill:'#475569', fontSize:10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill:'#475569', fontSize:10 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background:'rgba(8,13,30,0.95)', border:'1px solid rgba(99,102,241,0.2)', borderRadius:8, fontFamily:'DM Sans', fontSize:12 }} />
            <Bar dataKey="gain" fill="#10b981" radius={[4,4,0,0]} name="Gain %" />
            <Bar dataKey="loss" fill="#f43f5e" radius={[4,4,0,0]} name="Loss %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
