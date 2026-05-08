import { Brain, Zap, TrendingUp, Shield, Target, BarChart2 } from 'lucide-react'

const insights = [
  {
    category: 'Trading Psychology',
    icon: Brain,
    color: 'text-brand-purple',
    bg: 'bg-brand-purple/10',
    items: [
      { title: 'FOMO Detector', desc: 'Identify trades made from fear of missing out vs disciplined setups. Track FOMO patterns in your journal.', status: 'Available' },
      { title: 'Revenge Trading Alert', desc: 'After 2 consecutive losses, get an alert to take a break. Revenge trading costs average ₹12,000/month.', status: 'Coming Soon' },
    ]
  },
  {
    category: 'Market Intelligence',
    icon: TrendingUp,
    color: 'text-brand-neon',
    bg: 'bg-brand-neon/10',
    items: [
      { title: 'Crypto Sentiment Score', desc: 'Aggregated sentiment from Fear & Greed Index, BTC dominance, and social signals.', status: 'Available' },
      { title: 'Volatility Radar', desc: 'Track which assets are about to enter high-volatility zones based on historical patterns.', status: 'Coming Soon' },
    ]
  },
  {
    category: 'Sports Predictions',
    icon: Target,
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
    items: [
      { title: 'IPL Win Probability', desc: 'AI model trained on 500+ IPL matches. Accounts for toss, venue, head-to-head, and form.', status: 'Coming Soon' },
      { title: 'Fantasy Score Predictor', desc: 'Predict player fantasy scores based on opponent, pitch type, and recent form.', status: 'Coming Soon' },
    ]
  },
]

export default function AIInsightsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/5 text-brand-purple text-xs font-mono mb-6">
          <Brain size={12} /> AI Engine — In Development
        </div>
        <h1 className="font-display text-4xl font-bold mb-4">
          AI-Powered Insights
        </h1>
        <p className="text-brand-muted max-w-xl mx-auto text-sm leading-relaxed">
          Our AI layer is being built progressively. Some features are live, others coming in Phase 4.
          The goal: a personal AI coach for your trades and sports predictions.
        </p>
      </div>

      <div className="space-y-10">
        {insights.map(section => (
          <div key={section.category}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-xl ${section.bg} flex items-center justify-center`}>
                <section.icon size={16} className={section.color} />
              </div>
              <h2 className="font-display font-semibold text-lg">{section.category}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {section.items.map(item => (
                <div key={item.title} className="glass rounded-2xl border border-brand-border p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-sm text-brand-text">{item.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
                      item.status === 'Available'
                        ? 'border-brand-neon/30 text-brand-neon bg-brand-neon/5'
                        : 'border-brand-border text-brand-muted'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap */}
      <div className="mt-16 glass rounded-2xl border border-brand-border p-8">
        <h2 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
          <Zap className="text-brand-neon" size={18} /> AI Roadmap
        </h2>
        <div className="space-y-4">
          {[
            { phase: 'Phase 1', title: 'Trading journal + P&L tracker', done: true },
            { phase: 'Phase 2', title: 'Crypto live dashboard with CoinGecko', done: true },
            { phase: 'Phase 3', title: 'Cricket live scores + fantasy tips', done: true },
            { phase: 'Phase 4', title: 'AI predictions engine + sentiment analysis', done: false },
            { phase: 'Phase 5', title: 'Personalized AI coach + mobile app', done: false },
          ].map(step => (
            <div key={step.phase} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                step.done ? 'bg-brand-neon/10 text-brand-neon border border-brand-neon/30' : 'bg-brand-card border border-brand-border text-brand-muted'
              }`}>
                {step.done ? '✓' : '○'}
              </div>
              <div>
                <span className="text-xs text-brand-muted font-mono">{step.phase} · </span>
                <span className={`text-sm ${step.done ? 'text-brand-text' : 'text-brand-muted'}`}>{step.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
