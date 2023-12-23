'use client'
import Availability from '@/components/form/availability'
import { SubmitButton } from '@/components/form/submit-button'
import { daysOfWeek } from '@/data/general'
import { formAction } from './action'
import OnboardingSkeleton from '../../onboarding-skeleton'
import BackButton from '@/components/form/back-button'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function OnboardingStep4() {
  // const session = await getServerSession(options)
  const { data: session, status } = useSession()
  if (status !== 'loading' && !session) redirect('/api/auth/signin')
  const [availabilities, setAvailabilities] = useState<Availability[]>(
    daysOfWeek.map((day, idx) => ({
      weekDay: idx,
      enabled: false,
      startTime: {
        hour: 9,
        minute: 0,
        ampm: 'am',
      },
      endTime: {
        hour: 5,
        minute: 0,
        ampm: 'pm',
      },
    }))
  )
  // if (session.user.onboarded) redirect(`/expert/${session.user.username}`)

  return (
    <OnboardingSkeleton step={4}>
      <BackButton href='/onboarding/3'>Back</BackButton>
      <p className='onboarding-step'>Step 4/5</p>
      <h1 className='onboarding'>When are you available?</h1>
      <form
        action={formAction}
        className='flex flex-col justify-center gap-8'
      >
        <div className='flex flex-col gap-6'>
          {availabilities.map(availability => (
            <Availability
              key={availability.weekDay}
              dayOfWeek={daysOfWeek[availability.weekDay]}
              availability={availability}
              setAvailabilities={setAvailabilities}
            />
          ))}
        </div>
        <SubmitButton>Continue</SubmitButton>
      </form>
    </OnboardingSkeleton>
  )
}
