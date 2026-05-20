import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from "./components/Layout/Navbar"
import Sidebar from "./components/Layout/Sidebar"
import MarketTicker from './components/Common/MarketTicker'
import Dashboard from './pages/Dashboard'
import Markets from './pages/Markets'
import Portfolio from './pages/Portfolio'
import Watchlist from './pages/Watchlist'
import Analytics from './pages/Analytics'
import { useStockData } from './hooks/useStockData'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const data = useStockData()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-void)' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(8,13,30,0.97)',
            border: '1px solid rgba(99,102,241,0.25)',
            color: 'var(--text-primary)',
            fontFamily: 'DM Sans',
            fontSize: '13px',
          },
        }}
      />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <motion.div
        animate={{ paddingLeft: sidebarOpen ? '272px' : '88px' }}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
        className="min-h-screen flex flex-col"
      >
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div style={{ paddingTop: '72px' }}>
          <MarketTicker />
        </div>
        <main className="flex-1 px-5 py-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    stocks={data.stocks}
                    gainers={data.gainers}
                    losers={data.losers}
                    watchlist={data.watchlist}
                    portfolio={data.portfolio}
                    loading={data.loading}
                    chartData={data.chartData}
                    addToWatchlist={data.addToWatchlist}
                    removeFromWatchlist={data.removeFromWatchlist}
                  />
                }
              />
              <Route
                path="/markets"
                element={
                  <Markets
                    stocks={data.stocks}
                    loading={data.loading}
                    chartData={data.chartData}
                  />
                }
              />
              <Route
                path="/portfolio"
                element={<Portfolio portfolio={data.portfolio} />}
              />
              <Route
                path="/watchlist"
                element={
                  <Watchlist
                    watchlist={data.watchlist}
                    stocks={data.stocks}
                    chartData={data.chartData}
                    onAdd={data.addToWatchlist}
                    onRemove={data.removeFromWatchlist}
                  />
                }
              />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
