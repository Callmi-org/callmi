import Availability from '@/components/form/availability'
import { SubmitButton } from '@/components/form/submit-button'
import { daysOfWeek } from '@/data/general'
import { formAction } from './action'
import OnboardingSkeleton from '../../onboarding-skeleton'
import BackButton from '@/components/form/back-button'
import { getServerSession } from 'next-auth/next'
import options from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

export default async function OnboardingStep4() {
  const session = await getServerSession(options)

  if (!session) redirect('/api/auth/signin')
  if (session.user.onboarded) redirect(`/expert/${session.user.username}`)

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
          {daysOfWeek.map(day => (
            <Availability
              key={day}
              dayOfWeek={day}
            />
          ))}
        </div>
        <SubmitButton>Continue</SubmitButton>
      </form>
    </OnboardingSkeleton>
  )
}
