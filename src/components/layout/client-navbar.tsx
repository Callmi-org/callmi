'use client'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import NavLogo from './nav-logo'
import Avatar from '@/components/general/avatar'
import { useSession } from 'next-auth/react'
import NavLink from './navigation/navlink'
import LandingButton from '../landing/landing-button'
export default function ClientNavbar() {
  const { data: session } = useSession()
  return (
    <nav className=' top-0 z-50 w-screen  backdrop-blur-sm'>
      <div className='mx-auto flex w-full max-w-9xl items-center justify-between p-4'>
        <div id='left'>
          <NavLogo />
        </div>
        <div
          className='hidden md:block'
          id='center'
        >
          <ul className='grid grid-cols-3 gap-16'>
            <NavLink href='#features'>Features</NavLink>
            <NavLink href='#pricing'>Pricing</NavLink>
            <NavLink href='#faq'>FAQs</NavLink>
          </ul>
        </div>

        <div id='right'>
          <LandingButton className='bg-gray-700'>Get Started</LandingButton>
        </div>
      </div>
    </nav>
  )
}
