import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'TradeTrack X — AI Trading, Crypto & Sports Analytics',
  description: 'Free AI-powered analytics platform for traders, crypto users, and sports enthusiasts. Trading journal, crypto dashboard, cricket & football analytics.',
  keywords: 'trading journal, crypto analytics, ipl prediction, fantasy cricket, risk calculator, trading psychology',
  openGraph: {
    title: 'TradeTrack X',
    description: 'AI-Powered Trading, Crypto & Sports Analytics',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      <GoogleAnalytics gaId="G-F9CRZ2T24V" />
    </html>
  )
}
