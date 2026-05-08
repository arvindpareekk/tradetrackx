'use client'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RefreshCw, Search } from 'lucide-react'
import Image from 'next/image'

type Coin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  market_cap_rank: number
  high_24h: number
  low_24h: number
}

export default function CryptoDashboard() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  async function fetchCoins() {
    setLoading(true)
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false',
        { next: { revalidate: 60 } }
      )
      const data = await res.json()
      if (Array.isArray(data)) {
        setCoins(data)
        setLastUpdated(new Date())
      }
    } catch (e) {
      console.error('CoinGecko fetch error', e)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
    const interval = setInterval(fetchCoins, 60000) // auto-refresh every 60s
    return () => clearInterval(interval)
  }, [])

  const filtered = coins.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const topGainers = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3)
  const topLosers  = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 3)

  const fmt = (n: number) => n >= 1e12 ? `₹${(n/1e12).toFixed(2)}T` : n >= 1e9 ? `₹${(n/1e9).toFixed(2)}B` : `₹${(n/1e6).toFixed(2)}M`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Crypto Dashboard</h1>
          <p className="text-brand-muted text-sm mt-1">
            Live prices in INR · {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Loading…'}
          </p>
        </div>
        <button
          onClick={fetchCoins}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-brand-border text-brand-muted text-sm hover:text-brand-neon hover:border-brand-neon/30 transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Movers */}
      {!loading && (
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="glass rounded-2xl border border-brand-border p-4">
            <div className="text-xs font-mono text-brand-neon mb-3 uppercase tracking-widest">🚀 Top Gainers (24h)</div>
            <div className="space-y-2">
              {topGainers.map(c => (
                <div key={c.id} className="flex items-center gap-3">
                  <img src={c.image} alt={c.name} width={24} height={24} className="rounded-full" />
                  <span className="text-sm text-brand-text font-medium flex-1">{c.symbol.toUpperCase()}</span>
                  <span className="text-xs text-brand-neon font-mono">+{c.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl border border-brand-border p-4">
            <div className="text-xs font-mono text-brand-red mb-3 uppercase tracking-widest">📉 Top Losers (24h)</div>
            <div className="space-y-2">
              {topLosers.map(c => (
                <div key={c.id} className="flex items-center gap-3">
                  <img src={c.image} alt={c.name} width={24} height={24} className="rounded-full" />
                  <span className="text-sm text-brand-text font-medium flex-1">{c.symbol.toUpperCase()}</span>
                  <span className="text-xs text-brand-red font-mono">{c.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search coin…"
          className="w-full max-w-xs bg-brand-card border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-neon/50"
        />
      </div>

      {/* Table */}
      <div className="glass rounded-2xl border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                {['#', 'Asset', 'Price (INR)', '24h %', '24h High', '24h Low', 'Market Cap', 'Volume'].map(h => (
                  <th key={h} className="text-left text-xs text-brand-muted font-medium px-4 py-3 first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-brand-border/50">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-brand-card rounded animate-pulse w-20" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.map(coin => {
                const positive = coin.price_change_percentage_24h >= 0
                return (
                  <tr key={coin.id} className="border-b border-brand-border/50 hover:bg-brand-neon/2 transition-colors">
                    <td className="pl-5 py-3 text-xs text-brand-muted">{coin.market_cap_rank}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={coin.image} alt={coin.name} width={24} height={24} className="rounded-full" />
                        <div>
                          <div className="font-medium text-brand-text">{coin.name}</div>
                          <div className="text-xs text-brand-muted uppercase">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono font-medium text-brand-text">
                      ₹{coin.current_price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 font-mono text-xs ${positive ? 'text-brand-neon' : 'text-brand-red'}`}>
                        {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {positive ? '+' : ''}
                        {coin.price_change_percentage_24h
                          ? coin.price_change_percentage_24h.toFixed(2)
                          : '0.00'}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-brand-muted">₹{coin.high_24h.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-xs font-mono text-brand-muted">₹{coin.low_24h.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-xs text-brand-muted">{fmt(coin.market_cap)}</td>
                    <td className="px-4 py-3 text-xs text-brand-muted">{fmt(coin.total_volume)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 text-xs text-brand-muted border-t border-brand-border">
          Data from CoinGecko API · Updates every 60 seconds
        </div>
      </div>
    </div>
  )
}

export default function CryptoPage() {
  return (
    <div>
      <h1>Crypto Page</h1>
    </div>
  );
}