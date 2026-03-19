import type { Metadata } from 'next'
import { Instrument_Serif, Geist } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://arcstudio.co'),
  title: {
    default: 'ARC Studio — Web Design Agency That Converts',
    template: '%s | ARC Studio',
  },
  description:
    'ARC Studio is a premium web design agency building high-converting websites for ambitious businesses. Strategy-led design, conversion-optimized copy, and engineering that performs.',
  keywords: [
    'web design agency',
    'high converting website design',
    'premium web design',
    'conversion focused web design',
    'website redesign agency',
    'custom web development',
    'landing page design agency',
  ],
  authors: [{ name: 'ARC Studio', url: 'https://arcstudio.co' }],
  creator: 'ARC Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arcstudio.co',
    siteName: 'ARC Studio',
    title: 'ARC Studio — Web Design That Actually Converts',
    description:
      'We build websites that close deals. Strategy-led design for businesses competing on quality.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ARC Studio — Premium Web Design Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARC Studio — Web Design That Actually Converts',
    description:
      'Strategy-led web design for businesses that compete on quality.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
    },
  },
  alternates: {
    canonical: 'https://arcstudio.co',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ARC Studio',
  description:
    'Premium web design agency building high-converting websites for ambitious businesses.',
  url: 'https://arcstudio.co',
  email: 'hello@arcstudio.co',
  serviceType: 'Web Design',
  areaServed: 'Worldwide',
  priceRange: '$$$$',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${geistSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
