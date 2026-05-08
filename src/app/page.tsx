import Link from 'next/link'
import {
  TrendingUp, Bitcoin, Trophy, Brain, Zap,
  BarChart2, Shield, Target, ArrowRight, Star
} from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'Trading Journal',
    desc: 'Log trades, track P&L, analyze emotions, and spot patterns in your trading psychology.',
    href: '/trading/journal',
    color: 'text-brand-neon',
    bg: 'bg-brand-neon/10',
  },
  {
    icon: Bitcoin,
    title: 'Crypto Dashboard',
    desc: 'Live prices, fear & greed index, BTC dominance, and personalized watchlists.',
    href: '/crypto',
    color: 'text-brand-gold',
    bg: 'bg-brand-gold/10',
  },
  {
    icon: Trophy,
    title: 'Cricket Analytics',
    desc: 'IPL, T20, ODI & Test insights. Live scores, toss analysis, and fantasy predictions.',
    href: '/cricket',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
  },
  {
    icon: Brain,
    title: 'AI Insights',
    desc: 'AI-powered predictions, sentiment analysis, and personalized performance coaching.',
    href: '/ai-insights',
    color: 'text-brand-purple',
    bg: 'bg-brand-purple/10',
  },
]

const stats = [
  { label: 'Modules', value: '10+' },
  { label: 'Tools', value: '20+' },
  { label: 'Cost', value: '₹0' },
  { label: 'Sports Covered', value: '3' },
]

const tools = [
  { icon: Target, label: 'Position Size Calculator' },
  { icon: Shield, label: 'Risk-Reward Calculator' },
  { icon: BarChart2, label: 'Compounding Calculator' },
  { icon: Zap, label: 'Fantasy Prediction Engine' },
]

export default function HomePage() {
  return (
    <div className="hero-gradient grid-overlay">
      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-neon/30 bg-brand-neon/5 text-brand-neon text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse-slow" />
          LIVE — Free AI Analytics Platform
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
          Trade Smarter.{' '}
          <br />
          <span className="text-brand-neon glow-text">Analyze Everything.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-brand-muted text-lg leading-relaxed mb-10">
          One free platform for trading journals, crypto tracking, cricket analytics,
          and AI-powered insights. Built for traders and sports enthusiasts who think in data.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/trading/journal"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-neon text-black font-semibold text-sm hover:bg-brand-neon/90 transition-all shadow-neon"
          >
            Start Free Journal <ArrowRight size={16} />
          </Link>
          <Link
            href="/cricket"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-brand-border text-brand-text text-sm font-medium hover:border-brand-neon/30 hover:text-brand-neon transition-all"
          >
            <Trophy size={16} /> Cricket Analytics
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-4 gap-4 max-w-lg mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-display font-bold text-brand-neon">{s.value}</div>
              <div className="text-xs text-brand-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Everything in One Platform</h2>
          <p className="text-brand-muted text-sm">No subscriptions. No paywalls. Just data.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group glass rounded-2xl p-6 border border-brand-border hover:border-brand-neon/20 transition-all hover:shadow-neon"
            >
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="font-display font-semibold text-brand-text mb-2 group-hover:text-brand-neon transition-colors">
                {f.title}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">{f.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-brand-neon opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Utility Tools Strip ── */}
      <section className="border-y border-brand-border bg-brand-surface/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm font-mono text-brand-muted uppercase tracking-widest">Free Utility Tools</p>
            <div className="flex flex-wrap gap-3">
              {tools.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-brand-card text-xs text-brand-muted hover:border-brand-neon/30 hover:text-brand-neon transition-all cursor-pointer"
                >
                  <t.icon size={12} />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trading Journal Preview ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-mono text-brand-neon mb-3 uppercase tracking-widest">Phase 1 — Live Now</div>
            <h2 className="font-display text-4xl font-bold mb-4">
              Your Trading Journal,<br />
              <span className="text-brand-neon">Finally Intelligent</span>
            </h2>
            <p className="text-brand-muted leading-relaxed mb-6">
              Log every trade with entry, exit, emotion, and notes. See your win rate,
              average R:R, best setups, and psychology patterns — all in one dashboard.
            </p>
            <ul className="space-y-3 text-sm text-brand-muted mb-8">
              {[
                'Log trades with buy/sell prices, emotion, setup notes',
                'P&L tracking with charts and monthly breakdown',
                'Risk/reward analysis per trade and overall',
                'Emotion heatmap — see when FOMO costs you money',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-neon mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/trading/journal"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-neon text-black font-semibold text-sm hover:bg-brand-neon/90 transition-all"
            >
              Open Journal <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mock Journal Card */}
          <div className="glass rounded-2xl border border-brand-border p-6 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-brand-muted">RECENT TRADES</span>
              <span className="text-xs text-brand-neon">Live Preview</span>
            </div>
            {[
              { asset: 'RELIANCE', dir: 'LONG', entry: '2840', exit: '2910', pnl: '+₹2,100', emotion: '😎', win: true },
              { asset: 'NIFTY50', dir: 'SHORT', entry: '22450', exit: '22380', pnl: '+₹3,500', emotion: '🎯', win: true },
              { asset: 'BITCOIN', dir: 'LONG', entry: '58200', exit: '56400', pnl: '-₹1,800', emotion: '😨', win: false },
              { asset: 'INFY', dir: 'LONG', entry: '1480', exit: '1510', pnl: '+₹900', emotion: '😊', win: true },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-brand-card border border-brand-border/50">
                <div className={`w-1.5 h-8 rounded-full ${t.win ? 'bg-brand-neon' : 'bg-brand-red'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-brand-text">{t.asset}</div>
                  <div className="text-xs text-brand-muted">{t.dir} · {t.entry} → {t.exit}</div>
                </div>
                <span className="text-base">{t.emotion}</span>
                <span className={`text-xs font-mono font-bold ${t.win ? 'text-brand-neon' : 'text-brand-red'}`}>{t.pnl}</span>
              </div>
            ))}
            <div className="pt-2 flex justify-between text-xs">
              <span className="text-brand-muted">Win Rate</span>
              <span className="text-brand-neon font-mono font-bold">75%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-2xl neon-border bg-brand-neon/5 p-10 text-center">
          <h2 className="font-display text-3xl font-bold mb-3">
            Ready to Level Up Your Game?
          </h2>
          <p className="text-brand-muted text-sm mb-6 max-w-md mx-auto">
            Completely free. No credit card. Just better trading and sports analytics starting now.
          </p>
          <Link
            href="/trading/journal"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-neon text-black font-semibold text-sm hover:bg-brand-neon/90 transition-all shadow-neon"
          >
            Get Started Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
