'use client'
import NavLogo from './nav-logo'
import Avatar from '@/components/general/avatar'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

export default function LandingNavbar() {
  const { data: session } = useSession()
  const { toast } = useToast()

  function copyEmail() {
    navigator.clipboard.writeText('w@callmi.co')
    toast({
      title: 'w@callmi.co copied to clipboard',
    })
  }

  return (
    <nav className=' top-0 z-50 w-full border-b  backdrop-blur-sm'>
      <div className='mx-auto flex w-full max-w-10xl items-center justify-between p-4'>
        <div id='left'>
          <NavLogo />
        </div>

        <div
          className='flex items-center justify-center gap-5'
          id='right'
        >
          <a href='mailto:w@callmi.co'>
            <Button
              onClick={copyEmail}
              variant='outline'
            >
              Report A Problem
            </Button>
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
