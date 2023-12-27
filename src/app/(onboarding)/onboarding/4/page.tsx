'use client'
import Availability from '@/components/form/availability'
import { SubmitButton } from '@/components/form/submit-button'
import { daysOfWeek, defaultAvailabilities } from '@/data/general'
import { formAction } from './action'
import OnboardingSkeleton from '../../onboarding-skeleton'
import BackButton from '@/components/form/back-button'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import Loading from '@/components/layout/loading'

export default function OnboardingStep4() {
  const { data: session, status } = useSession({ required: true })
  const [fetching, setFetching] = useState(true)
  const [availabilities, setAvailabilities] = useState<Availability[]>(
    defaultAvailabilities
  )

  useEffect(() => {
    if (status === 'loading') return
    async function getAvailabilities() {
      const res = await fetch(`/api/onboarding/${session?.user.id}/4`)
      const data = await res.json()
      if (data.length) setAvailabilities(data)
      setFetching(false)
    }

    getAvailabilities()
  }, [status, session?.user.id])

  // if (session.user.onboarded) redirect(`/expert/${session.user.username}`)

  const children =
    status === 'loading' || fetching ? (
      <Loading />
    ) : (
      <Form
        availabilities={availabilities}
        setAvailabilities={setAvailabilities}
        user={session?.user!}
      />
    )

  return <OnboardingSkeleton step={4}>{children}</OnboardingSkeleton>
}

type FormProps = {
  availabilities: Availability[]
  setAvailabilities: React.Dispatch<React.SetStateAction<Availability[]>>
  user: User
}

function Form({ availabilities, setAvailabilities, user }: FormProps) {
  const { toast } = useToast()

  async function clientAction() {
    try {
      const enabledAvailabilities = availabilities.filter(
        availability => availability.enabled
      )
      const res = await formAction(enabledAvailabilities, user.id!)
      console.log({ res })
      if (res.error) {
        throw new Error(res.error)
      }
    } catch (error) {
      const { message } = error as Error
      console.log(error)
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
      return
    }
    redirect('/onboarding/5')
  }
  return (
    <>
      <BackButton href='/onboarding/3'>Back</BackButton>
      <p className='onboarding-step'>Step 4/5</p>
      <h1 className='onboarding'>When are you available?</h1>
      <form
        action={clientAction}
        className='flex flex-col justify-center gap-8'
      >
        <div className='flex flex-col gap-6'>
          {availabilities.map(availability => (
            <Availability
              key={availability.dayOfWeek}
              dayOfWeek={daysOfWeek[availability.dayOfWeek]}
              availability={availability}
              setAvailabilities={setAvailabilities}
            />
          ))}
        </div>
        <SubmitButton>Continue</SubmitButton>
      </form>
    </>
  )
}
