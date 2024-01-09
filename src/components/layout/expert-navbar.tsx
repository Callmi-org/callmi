'use client'
import NavLogo from './nav-logo'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import Link from 'next/link'
import LandingButton from '../landing/landing-button'

export default function LandingNavbar() {
  const { data: session } = useSession()
  // const { toast } = useToast()

  // function copyEmail() {
  //   navigator.clipboard.writeText('w@callmi.co')
  //   toast({
  //     title: 'w@callmi.co copied to clipboard',
  //   })
  // }

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
          {/* <a href='mailto:w@callmi.co'>
            <Button
              // onClick={copyEmail}
              variant='outline'
            >
              Report A Problem
            </Button>
          </a> */}
          {session ? (
            <Link
              href={`mailto:w@callmi.co?subject=${encodeURIComponent(
                'Reporting a problem'
              )}`}
            >
              <Button variant='outline'>Contact Admin</Button>
            </Link>
          ) : (
            <LandingButton size='sm'>Become an expert</LandingButton>
          )}
        </div>
      </div>
    </nav>
  )
}
