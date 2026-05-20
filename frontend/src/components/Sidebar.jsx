import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, TrendingUp, Briefcase, Star, BarChart2, ChevronLeft, ChevronRight, Zap } from 'lucide-react'

const NAV = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/markets',   icon: TrendingUp,      label: 'Markets'   },
  { to: '/portfolio', icon: Briefcase,       label: 'Portfolio' },
  { to: '/watchlist', icon: Star,            label: 'Watchlist' },
  { to: '/analytics', icon: BarChart2,       label: 'Analytics' },
]

export default function Sidebar({ open, setOpen }) {
  return (
    <motion.aside
      animate={{ width: open ? 272 : 88 }}
      transition={{ type: 'spring', damping: 28, stiffness: 350 }}
      style={{
        position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50,
        background: 'rgba(8,13,30,0.97)',
        borderRight: '1px solid rgba(99,102,241,0.15)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
    >
      <div style={{ padding: '24px 20px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={20} color="#fff" />
        </div>
        <AnimatePresence>
          {open && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, color: '#f1f5f9', whiteSpace: 'nowrap' }}>
              StockVision
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '11px 14px', borderRadius: 10, textDecoration: 'none',
              background: isActive ? 'rgba(99,102,241,0.18)' : 'transparent',
              color: isActive ? '#818cf8' : '#94a3b8',
              transition: 'all 0.15s',
            })}>
            <Icon size={20} style={{ flexShrink: 0 }} />
            <AnimatePresence>
              {open && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: 14, whiteSpace: 'nowrap' }}>
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '16px 12px' }}>
        <button onClick={() => setOpen(!open)}
          style={{
            width: '100%', padding: '10px', borderRadius: 10,
            border: '1px solid rgba(99,102,241,0.2)',
            background: 'rgba(99,102,241,0.08)', color: '#818cf8', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </motion.aside>
  )
}
