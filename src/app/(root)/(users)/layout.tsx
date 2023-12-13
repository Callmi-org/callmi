import type { Metadata } from 'next'
import Navbar from '@/components/layout/expert-navbar'
import Footer from '@/components/layout/footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://callmi.co'),
  title: 'Callmi - Fast online appointment scheduling',
  description:
    'Callmi – Get Paid for Your Time, Every Time: Schedule, Charge, and Call in 30 seconds',
  openGraph: {
    images: 'https://callmi.vercel.app/group.png',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
