import Link from 'next/link'
import { Zap, Twitter, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-brand-neon flex items-center justify-center">
                <Zap size={16} className="text-black" fill="black" />
              </div>
              <span className="font-display font-bold text-lg">
                TradeTrack<span className="text-brand-neon">X</span>
              </span>
            </Link>
            <p className="text-xs text-brand-muted leading-relaxed">
              AI-powered analytics for traders, crypto enthusiasts & sports fans. 100% free.
            </p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg border border-brand-border text-brand-muted hover:text-brand-neon hover:border-brand-neon/30 transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Trading */}
          <div>
            <h4 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-4">Trading</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              {['Journal', 'P&L Tracker', 'Risk Calculator', 'Analytics'].map(item => (
                <li key={item}><Link href="#" className="hover:text-brand-neon transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-4">Sports</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              {['Cricket Live', 'IPL Analytics', 'Predictions', 'Fantasy Tips', 'Football'].map(item => (
                <li key={item}><Link href="#" className="hover:text-brand-neon transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-4">More</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              {['Crypto Dashboard', 'AI Insights', 'Blog', 'Profile', 'Roadmap'].map(item => (
                <li key={item}><Link href="#" className="hover:text-brand-neon transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">© 2024 TradeTrack X. Free to use. No spam.</p>
          <p className="text-xs text-brand-muted font-mono">
            Not financial advice. Trade responsibly.
          </p>
        </div>
      </div>
    </footer>
  )
}
