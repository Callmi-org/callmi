import { Menu } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import NavLogo from './NavLogo'
import options from '@/app/api/auth/[...nextauth]/options'
import Avatar from '../General/Avatar'
export default async function Navbar() {
  const session = await getServerSession(options)
  return (
    <nav className='fixed top-0 z-50 w-screen shadow bg-white/80  backdrop-blur-md'>
      <div className='mx-auto flex w-full items-center justify-between px-4'>
        <div>
          <NavLogo />
        </div>
        <ul
          id='desktop-menu'
          className=' gap-4'
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


// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
// client_id=869656362729-4i0gf61lff61itkc6r0fe77e0qvddbkq.apps.googleusercontent.com&
// scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&response_type=code&
// redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=oEEYBHaGpnVBvp28-Egnlxwmo1m3SZUHASXP4B8ljLY&
// code_challenge=4UsD0Xoq2Q5DF3fRF3xFoeM8wK2SJVhU2zo2NsGUpkU&code_challenge_method=S256&service=lso&o2v=2&
// theme=glif&flowName=GeneralOAuthFlow