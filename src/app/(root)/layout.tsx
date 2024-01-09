import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/layout/expert-navbar'
import Footer from '@/components/layout/footer'
import Providers from '../providers'
const dmSans = DM_Sans({ subsets: ['latin'] })
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  metadataBase: new URL('https://callmi.co'),
  title: 'Callmi',
  description:
    "Book MENA's most in-demand startup experts over a 1:1 video call.",
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
          <Toaster />
        </body>
      </Providers>
    </html>
  )
}
