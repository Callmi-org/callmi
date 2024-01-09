import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import '../globals.css'
import Providers from '../providers'
import { Toaster } from '@/components/ui/toaster'
const dmSans = DM_Sans({ subsets: ['latin'] })

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
    <Providers>
      <html lang='en'>
        <body
          className={`flex min-h-screen flex-col text-black  ${dmSans.className}`}
        >
          {children}
          {/* <Footer /> */}
          <Toaster />
        </body>
      </html>
    </Providers>
  )
}
