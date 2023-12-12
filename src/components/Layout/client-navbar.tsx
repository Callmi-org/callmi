'use client'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import NavLogo from './nav-logo'
import Avatar from '@/components/general/avatar'
import { useSession } from 'next-auth/react'
export default function ClientNavbar() {
  const { data: session } = useSession()
  return (
    <nav className=' top-0 z-50 w-screen  backdrop-blur-sm'>
      <div className='mx-auto flex w-full max-w-9xl items-center justify-between px-4'>
        <div>
          <NavLogo />
        </div>
        <ul
          id='desktop-menu'
          className='hidden gap-4'
        >
          {!session && (
            <>
              <li>
                <Link
                  href='/api/auth/signin'
                  className='btn col-span-1 w-full bg-white text-black'
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href='/api/auth/signin'
                  className='btn col-span-1 w-full'
                >
                  Sign up for free
                </Link>
              </li>
            </>
          )}
          {session && (
            <li>
              <Link href={`/u/${session?.user?.id}`}>
                <Avatar
                  size='sm'
                  src={session.user?.image}
                  name={session.user?.name}
                />
              </Link>
            </li>
          )}
        </ul>
        <div
          id='mobile-menu'
          className='hidden'
        >
          <div className=''>
            <Menu className='h-7 w-7 text-black' />
          </div>
        </div>
      </div>
    </nav>
  )
}
