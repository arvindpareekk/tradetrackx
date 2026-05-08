'use client'
import { useState } from 'react'
import { Shield, Target, TrendingUp } from 'lucide-react'

export default function RiskCalculator() {
  const [capital, setCapital] = useState('')
  const [riskPct, setRiskPct] = useState('1')
  const [entry, setEntry] = useState('')
  const [stopLoss, setStopLoss] = useState('')
  const [takeProfit, setTakeProfit] = useState('')

  const cap = parseFloat(capital) || 0
  const ep = parseFloat(entry) || 0
  const sl = parseFloat(stopLoss) || 0
  const tp = parseFloat(takeProfit) || 0
  const rp = parseFloat(riskPct) || 1

  const riskAmount = (cap * rp) / 100
  const riskPerUnit = ep > 0 && sl > 0 ? Math.abs(ep - sl) : 0
  const positionSize = riskPerUnit > 0 ? Math.floor(riskAmount / riskPerUnit) : 0
  const rewardPerUnit = ep > 0 && tp > 0 ? Math.abs(tp - ep) : 0
  const riskReward = riskPerUnit > 0 && rewardPerUnit > 0 ? (rewardPerUnit / riskPerUnit).toFixed(2) : '—'
  const potentialProfit = positionSize * rewardPerUnit

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold flex items-center gap-3">
          <Shield className="text-brand-neon" /> Risk Calculator
        </h1>
        <p className="text-brand-muted text-sm mt-1">Calculate position size and risk-reward ratio</p>
      </div>

      <div className="glass rounded-2xl border border-brand-border p-6 space-y-5">
        {[
          { label: 'Total Capital (₹)', value: capital, setter: setCapital, placeholder: '500000' },
          { label: 'Risk % per Trade', value: riskPct, setter: setRiskPct, placeholder: '1' },
          { label: 'Entry Price', value: entry, setter: setEntry, placeholder: '2840' },
          { label: 'Stop Loss Price', value: stopLoss, setter: setStopLoss, placeholder: '2810' },
          { label: 'Take Profit Price', value: takeProfit, setter: setTakeProfit, placeholder: '2900' },
        ].map(f => (
          <div key={f.label}>
            <label className="text-xs text-brand-muted mb-1.5 block">{f.label}</label>
            <input
              type="number"
              value={f.value}
              onChange={e => f.setter(e.target.value)}
              placeholder={f.placeholder}
              className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-brand-text text-sm focus:outline-none focus:border-brand-neon/50 font-mono"
            />
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { label: 'Risk Amount', value: `₹${riskAmount.toLocaleString('en-IN')}`, icon: Shield, color: 'text-brand-red' },
          { label: 'Position Size', value: `${positionSize} units`, icon: TrendingUp, color: 'text-brand-neon' },
          { label: 'Risk : Reward', value: `1 : ${riskReward}`, icon: Target, color: parseFloat(riskReward as string) >= 2 ? 'text-brand-neon' : 'text-brand-gold' },
          { label: 'Potential Profit', value: `₹${potentialProfit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, icon: TrendingUp, color: 'text-brand-neon' },
        ].map(r => (
          <div key={r.label} className="glass rounded-xl border border-brand-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <r.icon size={14} className="text-brand-muted" />
              <span className="text-xs text-brand-muted">{r.label}</span>
            </div>
            <div className={`font-mono font-bold text-lg ${r.color}`}>{r.value}</div>
          </div>
        ))}
      </div>

      {parseFloat(riskReward as string) >= 2 && (
        <div className="mt-4 p-4 rounded-xl bg-brand-neon/5 border border-brand-neon/20 text-xs text-brand-neon">
          ✓ Good risk-reward ratio! Most pros aim for minimum 1:2 or better.
        </div>
      )}
      {parseFloat(riskReward as string) > 0 && parseFloat(riskReward as string) < 1.5 && (
        <div className="mt-4 p-4 rounded-xl bg-brand-red/5 border border-brand-red/20 text-xs text-brand-red">
          ⚠ Low risk-reward. Consider widening your take profit or tightening your stop loss.
        </div>
      )}
    </div>
  )
}
