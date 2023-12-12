import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/layout/navigation/navbar'
import Footer from '@/components/layout/footer'
import Providers from '../providers'
const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://callmi.co'),
  title: 'Callmi - Fast online appointment scheduling',
  description:
    'Callmi – Get Paid for Your Time, Every Time: Schedule, Charge, and Call in 30 seconds',
  openGraph: {
    images: 'https://callmi.vercel.app/group.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Providers>
        <body
          className={` flex min-h-screen flex-col text-black  ${dmSans.className}`}
        >
          {children}
          {/* <Footer /> */}
        </body>
      </Providers>
    </html>
  )
}
