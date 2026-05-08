'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  TrendingUp, Bitcoin, Trophy, Zap, Menu, X,
  ChevronDown, BarChart2, Calculator, Brain
} from 'lucide-react'

const navItems = [
  {
    label: 'Trading',
    icon: TrendingUp,
    href: '/trading',
    children: [
      { label: 'Journal',          href: '/trading/journal' },
      { label: 'P&L Tracker',     href: '/trading/pnl' },
      { label: 'Risk Calculator',  href: '/trading/calculator' },
      { label: 'Analytics',        href: '/trading/analytics' },
    ],
  },
  {
    label: 'Crypto',
    icon: Bitcoin,
    href: '/crypto',
    children: [
      { label: 'Dashboard',        href: '/crypto' },
      { label: 'Watchlist',        href: '/crypto/watchlist' },
      { label: 'Market Sentiment', href: '/crypto/sentiment' },
    ],
  },
  {
    label: 'Cricket',
    icon: Trophy,
    href: '/cricket',
    children: [
      { label: 'Live Scores',   href: '/cricket/live' },
      { label: 'IPL',           href: '/cricket/ipl' },
      { label: 'Predictions',   href: '/cricket/predictions' },
      { label: 'Fantasy Tips',  href: '/cricket/fantasy' },
    ],
  },
  { label: 'AI Insights', icon: Brain, href: '/ai-insights' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-brand-neon flex items-center justify-center">
              <Zap size={16} className="text-black" fill="black" />
            </div>
            <span className="font-display font-800 text-lg tracking-tight">
              TradeTrack<span className="text-brand-neon">X</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${pathname.startsWith(item.href) && item.href !== '/'
                      ? 'text-brand-neon bg-brand-neon/10'
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-card'
                    }`}
                >
                  <item.icon size={14} />
                  {item.label}
                  {item.children && <ChevronDown size={12} />}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-48 glass rounded-xl border border-brand-border shadow-card overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-brand-muted hover:text-brand-neon hover:bg-brand-neon/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-neon text-black text-sm font-semibold hover:bg-brand-neon/90 transition-all"
            >
              Get Started
            </Link>
            <button
              className="md:hidden p-2 text-brand-muted hover:text-brand-text"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-brand-border px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-brand-text hover:text-brand-neon hover:bg-brand-neon/5"
                onClick={() => setMobileOpen(false)}
              >
                <item.icon size={14} />
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-2 text-xs text-brand-muted hover:text-brand-neon"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/profile"
            className="block mt-3 px-4 py-2.5 rounded-lg bg-brand-neon text-black text-sm font-semibold text-center"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
