'use client'
import BookingSidebar from '@/components/expert/booking-sidebar'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Top from './Top'
import HowItWorks from './HowItWorks'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Loading from '@/components/layout/loading'

export default function UserPage() {
  const { username } = useParams()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const [profile, setProfile] = useState<UserAPIResponse>()
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/expert/${username}`)
      const data = await res.json()
      if (data.message === 'no user found') {
        setError(data.message)
        return
      }

      console.log({ data })
      setProfile(data)
    }

    fetchUser()
  }, [username])

  if (error) {
    return (
      <main className='flex flex-1 flex-col items-center justify-center'>
        <h1 className='text-center text-2xl font-bold'>
          No user found with username: {username} <br />
        </h1>
        <p>They may have changed their username or deleted their account.</p>
      </main>
    )
  }
  if (!profile) {
    return (
      <main className='flex flex-1 items-center justify-center'>
        <Loading />
      </main>
    )
  }

  if (profile && !profile.onboarded) {
    return (
      <main className='flex flex-1 items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          {profile.name}&apos;s profile is under construction <br />
          Check back soon!
        </h1>
      </main>
    )
  }

  return (
    <main className='min-h-screen px-4 pb-20 pt-8 md:px-12 2xl:pb-4'>
      <div className='mx-auto grid w-full max-w-10xl flex-1 grid-cols-3 grid-rows-3 gap-8'>
        <div className='col-span-3 row-span-3 flex flex-col gap-4 xl:col-span-2'>
          <Top {...profile} />
          <HowItWorks {...profile} />
        </div>
        <BookingSidebar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          profile={profile}
          availability={profile.availability}
        />
      </div>
      <BookButton userId={username as string}>Book</BookButton>
    </main>
  )
}

type BookButtonProps = {
  children?: React.ReactNode
  userId?: string
}

function BookButton({ children, userId }: BookButtonProps) {
  return (
    <Link
      className='fixed bottom-6 left-1/2 flex w-full max-w-[92vw] -translate-x-1/2 justify-center sm:hidden'
      href={`/expert/${userId}/book`}
    >
      <Button
        className='w-full max-w-xl rounded-xl bg-brand '
        type='button'
      >
        {children}
      </Button>
    </Link>
  )
}
