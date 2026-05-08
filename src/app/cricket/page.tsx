'use client'
import { useState, useEffect } from 'react'
import { Trophy, RefreshCw, Zap, Calendar, MapPin } from 'lucide-react'

// NOTE: Replace NEXT_PUBLIC_CRICAPI_KEY in .env.local with your actual CricAPI key
// Get a free key at https://cricapi.com

type Match = {
  id: string
  name: string
  status: string
  venue: string
  date: string
  dateTimeGMT: string
  teams: string[]
  score?: { r: number; w: number; o: number; inning: string }[]
  matchType: string
}

export default function CricketPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'live' | 'upcoming' | 'recent'>('live')

  async function fetchMatches() {
    setLoading(true)
    const key = process.env.NEXT_PUBLIC_CRICAPI_KEY
    if (!key) {
      // Show demo data if no API key
      setMatches(DEMO_MATCHES)
      setLoading(false)
      return
    }
    try {
      const res = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${key}&offset=0`)
      const data = await res.json()
      if (data.data) setMatches(data.data)
    } catch {
      setMatches(DEMO_MATCHES)
    }
    setLoading(false)
  }

  useEffect(() => { fetchMatches() }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold flex items-center gap-3">
            <Trophy className="text-brand-blue" /> Cricket Analytics
          </h1>
          <p className="text-brand-muted text-sm mt-1">Live scores, predictions & fantasy insights</p>
        </div>
        <button onClick={fetchMatches} disabled={loading} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-brand-border text-brand-muted text-sm hover:text-brand-neon hover:border-brand-neon/30 transition-all">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Match Type Tabs */}
      <div className="flex gap-2 mb-6">
        {(['live', 'upcoming', 'recent'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
              tab === t ? 'bg-brand-blue text-white' : 'border border-brand-border text-brand-muted hover:text-brand-text'
            }`}
          >
            {t === 'live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-red mr-2 animate-pulse" />}
            {t}
          </button>
        ))}
      </div>

      {/* IPL Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'IPL 2024', value: 'Season 17', desc: '10 Teams' },
          { label: 'Highest Score', value: '277/3', desc: 'RCB vs CSK' },
          { label: 'Most Runs', value: 'Virat Kohli', desc: 'Ongoing' },
          { label: 'Most Wickets', value: 'Jasprit Bumrah', desc: 'MI' },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl border border-brand-border p-4">
            <div className="text-xs text-brand-muted mb-1">{s.label}</div>
            <div className="font-display font-bold text-brand-text text-sm">{s.value}</div>
            <div className="text-xs text-brand-muted">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Matches */}
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-32 glass rounded-2xl border border-brand-border animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {matches.slice(0, 10).map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
          {matches.length === 0 && (
            <div className="text-center py-20 glass rounded-2xl border border-brand-border">
              <Trophy size={40} className="text-brand-muted mx-auto mb-4" />
              <p className="text-brand-muted text-sm">No matches found. Add your CricAPI key to see live data.</p>
            </div>
          )}
        </div>
      )}

      {/* Fantasy Tips Card */}
      <div className="mt-10 glass rounded-2xl border border-brand-blue/20 p-6 bg-brand-blue/5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-brand-blue" />
          <span className="font-display font-semibold text-sm">Fantasy Prediction Tips</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-xs">
          {[
            { tip: 'Pick top-order batsmen on batting-friendly pitches. Check pitch report and toss decision.', label: 'Batting' },
            { tip: 'Spinners on dry pitches are gold. 3+ wicket-takers carry high fantasy value.', label: 'Bowling' },
            { tip: 'All-rounders who bat at #5-6 and bowl 4 overs are the best value picks in T20.', label: 'All-Rounders' },
          ].map(t => (
            <div key={t.label} className="bg-brand-card rounded-xl p-3 border border-brand-border">
              <div className="text-brand-blue font-semibold mb-1">{t.label}</div>
              <div className="text-brand-muted leading-relaxed">{t.tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MatchCard({ match }: { match: Match }) {
  const isLive = match.status && match.status.toLowerCase().includes('live') || match.status?.includes('Toss')
  const [t1, t2] = match.teams || ['Team 1', 'Team 2']

  return (
    <div className={`glass rounded-2xl border p-5 transition-all hover:shadow-card ${isLive ? 'border-brand-red/30 bg-brand-red/2' : 'border-brand-border'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {isLive && <span className="flex items-center gap-1.5 text-xs text-brand-red"><span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" /> LIVE</span>}
          <span className="text-xs text-brand-muted uppercase font-mono">{match.matchType}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-brand-muted">
          {match.venue && <span className="flex items-center gap-1"><MapPin size={10} /> {match.venue.split(',')[0]}</span>}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-display font-semibold text-brand-text">{t1}</div>
          {match.score?.[0] && (
            <div className="text-xs font-mono text-brand-neon mt-1">
              {match.score[0].r}/{match.score[0].w} ({match.score[0].o} ov)
            </div>
          )}
        </div>
        <div className="px-4 text-xs text-brand-muted font-mono">VS</div>
        <div className="flex-1 text-right">
          <div className="font-display font-semibold text-brand-text">{t2}</div>
          {match.score?.[1] && (
            <div className="text-xs font-mono text-brand-neon mt-1">
              {match.score[1].r}/{match.score[1].w} ({match.score[1].o} ov)
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 text-xs text-brand-muted border-t border-brand-border/50 pt-3">
        {match.status}
      </div>
    </div>
  )
}

// Demo data shown when no API key
const DEMO_MATCHES: Match[] = [
  { id: '1', name: 'Mumbai Indians vs Chennai Super Kings', status: 'MI won by 6 wickets', venue: 'Wankhede Stadium, Mumbai', date: '2024-04-20', dateTimeGMT: '', teams: ['Mumbai Indians', 'Chennai Super Kings'], matchType: 'ipl', score: [{ r: 176, w: 4, o: 19.4, inning: 'MI' }, { r: 172, w: 8, o: 20, inning: 'CSK' }] },
  { id: '2', name: 'Royal Challengers Bangalore vs Delhi Capitals', status: '2nd innings: DC batting', venue: 'Chinnaswamy Stadium, Bangalore', date: '2024-04-21', dateTimeGMT: '', teams: ['Royal Challengers Bangalore', 'Delhi Capitals'], matchType: 'ipl', score: [{ r: 201, w: 4, o: 20, inning: 'RCB' }, { r: 98, w: 3, o: 11.2, inning: 'DC' }] },
  { id: '3', name: 'Rajasthan Royals vs Gujarat Titans', status: 'Match starts at 7:30 PM IST', venue: 'Sawai Mansingh Stadium, Jaipur', date: '2024-04-22', dateTimeGMT: '', teams: ['Rajasthan Royals', 'Gujarat Titans'], matchType: 'ipl' },
]
