'use client'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import NavLogo from './nav-logo'
import Avatar from '@/components/general/avatar'
import { useSession } from 'next-auth/react'
import { NavLink } from './navlink'
import LandingButton from '../landing/landing-button'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'

export default function LandingNavbar() {
  const { data: session } = useSession()
  return (
    <nav className=' top-0 z-50 w-full border-b  backdrop-blur-sm'>
      <div className='mx-auto flex w-full max-w-9xl items-center justify-between p-4'>
        <div id='left'>
          <NavLogo />
        </div>

        <div
          className='flex items-center justify-center gap-5'
          id='right'
        >
          <a href='mailto:w@callmi.co'>
            <Button variant='outline'>Report A Problem</Button>
          </a>
          {/* {session ? (
            <Link href={`/u/${session?.user?.id}`}>
              <Avatar
                size='sm'
                src={session.user?.image}
                name={session.user?.name}
              />
            </Link>
          ) : (
            <LandingButton className='bg-gray-700'>Get Started</LandingButton>
          )} */}
        </div>
      </div>
    </nav>
  )
}
