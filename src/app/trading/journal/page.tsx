'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, TrendingUp, TrendingDown, Target, X, BarChart2, Filter } from 'lucide-react'
import { format } from 'date-fns'

type Trade = {
  id: string
  asset_name: string
  asset_type: string
  direction: 'long' | 'short'
  buy_price: number
  sell_price: number | null
  quantity: number
  profit_loss: number | null
  emotion: string
  notes: string | null
  status: string
  risk_reward: number | null
  entry_date: string
}

const EMOTIONS = [
  { value: 'confident',  emoji: '😎', label: 'Confident' },
  { value: 'disciplined',emoji: '🎯', label: 'Disciplined' },
  { value: 'neutral',    emoji: '😐', label: 'Neutral' },
  { value: 'greedy',     emoji: '🤑', label: 'Greedy' },
  { value: 'fearful',    emoji: '😨', label: 'Fearful' },
  { value: 'fomo',       emoji: '🚀', label: 'FOMO' },
  { value: 'revenge',    emoji: '😤', label: 'Revenge' },
]

const ASSET_TYPES = ['stock', 'crypto', 'forex', 'commodity', 'index']

export default function TradingJournal() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed'>('all')

  const [form, setForm] = useState({
    asset_name: '',
    asset_type: 'stock',
    direction: 'long',
    buy_price: '',
    sell_price: '',
    quantity: '',
    emotion: 'neutral',
    notes: '',
    risk_reward: '',
    stop_loss: '',
    take_profit: '',
  })

  const supabase = createClient()

  useEffect(() => { fetchTrades() }, [])

  async function fetchTrades() {
    setLoading(true)
    const { data } = await supabase
      .from('trades')
      .select('*')
      .order('entry_date', { ascending: false })
    if (data) setTrades(data)
    setLoading(false)
  }

  async function saveTrade() {
    if (!form.asset_name || !form.buy_price || !form.quantity) return
    setSaving(true)
    const { error } = await supabase.from('trades').insert({
      asset_name:  form.asset_name.toUpperCase(),
      asset_type:  form.asset_type,
      direction:   form.direction,
      buy_price:   parseFloat(form.buy_price),
      sell_price:  form.sell_price ? parseFloat(form.sell_price) : null,
      quantity:    parseFloat(form.quantity),
      emotion:     form.emotion,
      notes:       form.notes || null,
      risk_reward: form.risk_reward ? parseFloat(form.risk_reward) : null,
      stop_loss:   form.stop_loss ? parseFloat(form.stop_loss) : null,
      take_profit: form.take_profit ? parseFloat(form.take_profit) : null,
      status:      form.sell_price ? 'closed' : 'open',
    })
    if (!error) {
      setShowForm(false)
      setForm({ asset_name:'', asset_type:'stock', direction:'long', buy_price:'', sell_price:'', quantity:'', emotion:'neutral', notes:'', risk_reward:'', stop_loss:'', take_profit:'' })
      fetchTrades()
    }
    setSaving(false)
  }

  async function deleteTrade(id: string) {
    await supabase.from('trades').delete().eq('id', id)
    setTrades(prev => prev.filter(t => t.id !== id))
  }

  // Stats
  const closedTrades = trades.filter(t => t.status === 'closed' && t.profit_loss !== null)
  const wins = closedTrades.filter(t => (t.profit_loss ?? 0) > 0)
  const totalPnL = closedTrades.reduce((s, t) => s + (t.profit_loss ?? 0), 0)
  const winRate = closedTrades.length ? Math.round((wins.length / closedTrades.length) * 100) : 0
  const avgWin = wins.length ? wins.reduce((s, t) => s + (t.profit_loss ?? 0), 0) / wins.length : 0
  const losses = closedTrades.filter(t => (t.profit_loss ?? 0) < 0)
  const avgLoss = losses.length ? Math.abs(losses.reduce((s, t) => s + (t.profit_loss ?? 0), 0) / losses.length) : 0

  const filtered = filterStatus === 'all' ? trades : trades.filter(t => t.status === filterStatus)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Trading Journal</h1>
          <p className="text-brand-muted text-sm mt-1">Log trades, track emotions, improve discipline</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-black font-semibold text-sm hover:bg-brand-neon/90 transition-all"
        >
          <Plus size={16} /> New Trade
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total P&L', value: `${totalPnL >= 0 ? '+' : ''}₹${totalPnL.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, color: totalPnL >= 0 ? 'text-brand-neon' : 'text-brand-red' },
          { label: 'Win Rate', value: `${winRate}%`, color: winRate >= 50 ? 'text-brand-neon' : 'text-brand-red' },
          { label: 'Avg Win', value: `₹${avgWin.toFixed(0)}`, color: 'text-brand-neon' },
          { label: 'Total Trades', value: `${closedTrades.length}`, color: 'text-brand-text' },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-xl p-4 border border-brand-border">
            <div className="text-xs text-brand-muted mb-1">{stat.label}</div>
            <div className={`text-xl font-display font-bold font-mono ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        <Filter size={14} className="text-brand-muted" />
        {(['all', 'open', 'closed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
              filterStatus === f
                ? 'bg-brand-neon text-black'
                : 'text-brand-muted border border-brand-border hover:border-brand-neon/30 hover:text-brand-text'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Trade List */}
      {loading ? (
        <div className="text-center py-20 text-brand-muted text-sm">Loading trades…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl border border-brand-border">
          <BarChart2 size={40} className="text-brand-muted mx-auto mb-4" />
          <p className="text-brand-muted text-sm">No trades yet. Add your first trade above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(trade => {
            const emotionObj = EMOTIONS.find(e => e.value === trade.emotion)
            const isWin = (trade.profit_loss ?? 0) > 0
            return (
              <div key={trade.id} className="glass rounded-xl border border-brand-border p-4 flex items-center gap-4 group hover:border-brand-neon/20 transition-all">
                {/* Direction indicator */}
                <div className={`w-1 h-12 rounded-full flex-shrink-0 ${trade.direction === 'long' ? 'bg-brand-neon' : 'bg-brand-red'}`} />

                {/* Asset info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-brand-text text-sm">{trade.asset_name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded uppercase font-mono ${trade.direction === 'long' ? 'bg-brand-neon/10 text-brand-neon' : 'bg-brand-red/10 text-brand-red'}`}>
                      {trade.direction}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded border ${trade.status === 'open' ? 'border-brand-gold/30 text-brand-gold' : 'border-brand-border text-brand-muted'}`}>
                      {trade.status}
                    </span>
                  </div>
                  <div className="text-xs text-brand-muted">
                    Entry ₹{trade.buy_price} · Qty {trade.quantity}
                    {trade.sell_price && ` · Exit ₹${trade.sell_price}`}
                    &nbsp;· {format(new Date(trade.entry_date), 'dd MMM yy')}
                  </div>
                  {trade.notes && <div className="text-xs text-brand-muted mt-1 truncate italic">"{trade.notes}"</div>}
                </div>

                {/* Emotion */}
                <div className="text-xl" title={emotionObj?.label}>{emotionObj?.emoji}</div>

                {/* P&L */}
                {trade.profit_loss !== null && (
                  <div className={`font-mono font-bold text-sm ${isWin ? 'text-brand-neon' : 'text-brand-red'}`}>
                    {isWin ? '+' : ''}₹{trade.profit_loss.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                )}

                {/* Delete */}
                <button
                  onClick={() => deleteTrade(trade.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-brand-muted hover:text-brand-red hover:bg-brand-red/10 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Trade Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="glass rounded-2xl border border-brand-border w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-lg">Log New Trade</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-text"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              {/* Asset + Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-brand-muted mb-1 block">Asset *</label>
                  <input
                    value={form.asset_name}
                    onChange={e => setForm(f => ({...f, asset_name: e.target.value}))}
                    placeholder="e.g. RELIANCE, BTC"
                    className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2.5 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-neon/50 uppercase"
                  />
                </div>
                <div>
                  <label className="text-xs text-brand-muted mb-1 block">Type</label>
                  <select
                    value={form.asset_type}
                    onChange={e => setForm(f => ({...f, asset_type: e.target.value}))}
                    className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-neon/50 capitalize"
                  >
                    {ASSET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Direction */}
              <div>
                <label className="text-xs text-brand-muted mb-2 block">Direction *</label>
                <div className="flex gap-2">
                  {['long', 'short'].map(d => (
                    <button
                      key={d}
                      onClick={() => setForm(f => ({...f, direction: d}))}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all capitalize border ${
                        form.direction === d
                          ? d === 'long'
                            ? 'bg-brand-neon/10 border-brand-neon text-brand-neon'
                            : 'bg-brand-red/10 border-brand-red text-brand-red'
                          : 'border-brand-border text-brand-muted'
                      }`}
                    >
                      {d === 'long' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prices + Qty */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'buy_price', label: 'Entry Price *' },
                  { key: 'sell_price', label: 'Exit Price' },
                  { key: 'quantity', label: 'Quantity *' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-xs text-brand-muted mb-1 block">{field.label}</label>
                    <input
                      type="number"
                      value={(form as any)[field.key]}
                      onChange={e => setForm(f => ({...f, [field.key]: e.target.value}))}
                      placeholder="0"
                      className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2.5 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-neon/50"
                    />
                  </div>
                ))}
              </div>

              {/* Stop Loss + Take Profit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-brand-muted mb-1 block">Stop Loss</label>
                  <input type="number" value={form.stop_loss} onChange={e => setForm(f => ({...f, stop_loss: e.target.value}))} placeholder="0" className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2.5 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-neon/50" />
                </div>
                <div>
                  <label className="text-xs text-brand-muted mb-1 block">Take Profit</label>
                  <input type="number" value={form.take_profit} onChange={e => setForm(f => ({...f, take_profit: e.target.value}))} placeholder="0" className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2.5 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-neon/50" />
                </div>
              </div>

              {/* Emotion */}
              <div>
                <label className="text-xs text-brand-muted mb-2 block">Emotion / Psychology</label>
                <div className="flex flex-wrap gap-2">
                  {EMOTIONS.map(e => (
                    <button
                      key={e.value}
                      onClick={() => setForm(f => ({...f, emotion: e.value}))}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all border ${
                        form.emotion === e.value
                          ? 'bg-brand-neon/10 border-brand-neon/50 text-brand-neon'
                          : 'border-brand-border text-brand-muted hover:border-brand-neon/20'
                      }`}
                    >
                      {e.emoji} {e.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs text-brand-muted mb-1 block">Notes / Setup</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({...f, notes: e.target.value}))}
                  placeholder="What was your setup? Any lessons?"
                  rows={3}
                  className="w-full bg-brand-card border border-brand-border rounded-lg px-3 py-2.5 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-neon/50 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border text-brand-muted text-sm hover:text-brand-text transition-all">
                Cancel
              </button>
              <button
                onClick={saveTrade}
                disabled={saving}
                className="flex-1 px-4 py-2.5 rounded-xl bg-brand-neon text-black font-semibold text-sm hover:bg-brand-neon/90 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Log Trade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
