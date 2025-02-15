import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Analytics } from '@vercel/analytics/react'
import { Footer } from '@/components/Footer'

// Initialize Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'International Shepards Christian Coalition',
    template: '%s | International Shepards Christian Coalition',
  },
  description: 'Uniting believers worldwide to nurture faith, leadership, and service in our communities.',
  keywords: [
    'Christian Coalition',
    'Faith',
    'Leadership',
    'Community Service',
    'Spiritual Growth',
    'Unity',
    'Diversity',
  ],
  authors: [
    {
      name: 'International Shepards Christian Coalition',
      url: 'https://iscc.org',
    },
  ],
  creator: 'International Shepards Christian Coalition',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iscc.org',
    title: 'International Shepards Christian Coalition',
    description: 'Uniting believers worldwide to nurture faith, leadership, and service in our communities.',
    siteName: 'International Shepards Christian Coalition',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Shepards Christian Coalition',
    description: 'Uniting believers worldwide to nurture faith, leadership, and service in our communities.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Navigation />
        <div className="min-h-screen flex flex-col pt-16">
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}