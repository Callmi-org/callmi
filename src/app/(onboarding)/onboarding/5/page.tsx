'use client'

import BackButton from '@/components/onboarding-form/back-button'
import OnboardingSkeleton from '../../onboarding-skeleton'
import InputWithLabel from '@/components/onboarding-form/input-with-label'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import Loading from '@/components/layout/loading'
import { SubmitButton } from '@/components/onboarding-form/submit-button'
import { formAction } from './action'
import { toast } from '@/components/ui/use-toast'

export default function OnboardingStep5() {
  // const session = await getServerSession(options)
  const { data: session, status, update } = useSession({ required: true })

  // if (session?.user.onboarded) push(`/expert/${session.user.username}`)

  useEffect(() => {
    update() // I think redirecting to expert page was broken by stale username
  }, [])

  const children =
    status === 'loading' ? <Loading /> : <Form user={session?.user} />

  return <OnboardingSkeleton step={5}>{children}</OnboardingSkeleton>
}

type FormProps = {
  user: User
}

function Form({ user }: FormProps) {
  async function clientAction(data: FormData) {
    try {
      const res = await formAction(data)
      if (res.error) throw new Error(res.error)
    } catch (error) {
      const { message } = error as Error
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
      return
    }
    redirect(`/expert/${user.username}`)
  }
  return (
    <>
      <BackButton href='/onboarding/4'>Back</BackButton>
      <p className='onboarding-step'>Step 5/5</p>
      <h1 className='onboarding'>Donating to a charity? (Optional)</h1>
      <p className='text-base font-light text-gray-400'>
        Want to donate a part of your earnings to a cause? Let your clients
        know! <br /> P.S.: Callmi does not facilitate charitable transactions.
        You are responsible for forwarding the funds to the charity you have
        chosen.
      </p>
      <form
        action={clientAction}
        className='flex flex-col justify-center gap-8'
      >
        <InputWithLabel
          label='Charity Name'
          name='charityName'
          type='text'
          placeholder='Enter the charity name here please'
          value={user.charityName}
        />

        <InputWithLabel
          label='Charity Website'
          name='charityUrl'
          type='url'
          placeholder="Enter the URL of the charity's website"
          value={user.charityUrl}
          title='Please enter a valid URL'
          labelAlt='e.g. https://www.charity.com'
        />

        <input
          type='hidden'
          name='userId'
          value={user.id}
        />

        <SubmitButton
          hasSkip
          skipHref={`/expert/${user.username}`}
        >
          Finish
        </SubmitButton>
      </form>
    </>
  )
}
