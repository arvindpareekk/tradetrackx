# TradeTrack X 🚀

**AI-Powered Trading, Crypto & Sports Analytics Platform**

> Free-to-use ecosystem for traders, crypto users, and cricket/sports fans.

---

## ⚡ Quick Start (Step by Step)

### Step 1 — Prerequisites
Install these on your machine:
- [Node.js 18+](https://nodejs.org) — download LTS version
- [Git](https://git-scm.com) — for version control
- A free [GitHub account](https://github.com)
- A free [Supabase account](https://supabase.com)
- A free [Vercel account](https://vercel.com)

---

### Step 2 — Clone and Install

```bash
# 1. Create GitHub repo named "tradetrackx" (go to github.com → New Repo)
# 2. Clone it
git clone https://github.com/YOUR_USERNAME/tradetrackx.git
cd tradetrackx

# 3. Copy all files from this folder into it, then:
npm install
```

---

### Step 3 — Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → Create Account → New Project
2. Name it `tradetrackx`, set a strong password, choose region: **South Asia (ap-south-1)**
3. Wait ~2 minutes for project to spin up
4. Go to: **SQL Editor → New Query**
5. Paste the entire contents of `supabase-schema.sql` and click **Run**
6. Go to: **Settings → API**
7. Copy:
   - `Project URL` → this is `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → this is `SUPABASE_SERVICE_ROLE_KEY`

**Enable Auth:**
- Go to: Authentication → Providers
- Enable **Email** (it's on by default)
- Optional: Enable **Google** (needs Google OAuth app)

---

### Step 4 — Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...

# Cricket — free at https://cricapi.com (register, get API key)
NEXT_PUBLIC_CRICAPI_KEY=your_key_here
```

---

### Step 5 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

### Step 6 — Push to GitHub

```bash
git add .
git commit -m "Initial TradeTrack X commit"
git push origin main
```

---

### Step 7 — Deploy to Vercel (Free Hosting)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **Add New → Project**
3. Import your `tradetrackx` repo
4. In **Environment Variables**, add all 4 variables from Step 4
5. Click **Deploy** → Wait ~2 minutes
6. Your site is live at `tradetrackx.vercel.app` 🚀

---

## 📁 Project Structure

```
tradetrackx/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Homepage
│   │   ├── layout.tsx            ← Root layout + nav
│   │   ├── trading/
│   │   │   ├── journal/          ← Trading journal
│   │   │   ├── calculator/       ← Risk calculator
│   │   │   ├── pnl/              ← P&L tracker
│   │   │   └── analytics/        ← Charts
│   │   ├── crypto/               ← Live crypto dashboard
│   │   ├── cricket/              ← Cricket analytics
│   │   └── ai-insights/          ← AI features
│   ├── components/
│   │   ├── layout/Navbar.tsx
│   │   └── layout/Footer.tsx
│   ├── lib/
│   │   └── supabase/             ← DB client
│   └── styles/globals.css
├── supabase-schema.sql           ← Run in Supabase SQL editor
├── .env.local.example            ← Copy to .env.local
└── vercel.json
```

---

## 🗺️ Development Roadmap

| Phase | Features | Status |
|-------|----------|--------|
| 1 | Trading Journal, P&L, Risk Calculator | ✅ Done |
| 2 | Crypto Dashboard (CoinGecko live) | ✅ Done |
| 3 | Cricket Live Scores + Predictions | ✅ Done |
| 4 | Football Analytics, AI Engine | 🔄 In Progress |
| 5 | Mobile App, Premium Features | 📅 Planned |

---

## 🔑 Free API Keys You Need

| Service | URL | Free Tier |
|---------|-----|-----------|
| CoinGecko (Crypto) | https://coingecko.com/api | No key needed! |
| CricAPI (Cricket) | https://cricapi.com | 100 calls/day free |
| API-Football | https://rapidapi.com/api-sports | 100 calls/day free |
| Supabase (Database) | https://supabase.com | 500MB free |
| Vercel (Hosting) | https://vercel.com | Unlimited free |

---

## 💰 Monetization (After Launch)

1. **Google AdSense** — Apply at ads.google.com once site has 50+ daily visitors
2. **Affiliate Links** — Zerodha, Upstox, Dream11, MPL
3. **Premium Tier** — Advanced AI, exports, no ads

---

## 📞 Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Charts**: Recharts
- **Hosting**: Vercel
- **Crypto API**: CoinGecko (free, no key)
- **Cricket API**: CricAPI

---

*Not financial advice. Trade responsibly.*
