import Link from 'next/link'
import { TrendingUp, BookOpen, Calculator, BarChart2, PieChart } from 'lucide-react'

const tradingNav = [
  { href: '/trading/journal',    icon: BookOpen,    label: 'Journal' },
  { href: '/trading/calculator', icon: Calculator,  label: 'Risk Calc' },
  { href: '/trading/pnl',        icon: BarChart2,   label: 'P&L' },
  { href: '/trading/analytics',  icon: PieChart,    label: 'Analytics' },
]

export default function TradingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Sub-nav */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-brand-surface/80 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 py-2">
            <TrendingUp size={14} className="text-brand-neon mr-2" />
            {tradingNav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-brand-muted hover:text-brand-neon hover:bg-brand-neon/5 transition-all"
              >
                <item.icon size={12} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-8">{children}</div>
    </div>
  )
}
