'use client'

import BookingForm from '@/components/expert/booking-form'
import Loading from '@/components/layout/loading'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Book() {
  const { username } = useParams()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const [profile, setProfile] = useState<User>()
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/expert/${username}`)
      const data = await res.json()
      if (data.message === 'no user found') {
        setError(data.message)
        return
      }
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
    <main className='min-h-screen px-4  py-8 md:px-12 2xl:pb-4'>
      <div className='mx-auto max-w-md'>
        <BookingForm
          profile={profile}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </main>
  )
}
