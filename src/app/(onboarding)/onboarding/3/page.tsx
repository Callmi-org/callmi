'use client'

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import OnboardingSkeleton from '../../onboarding-skeleton'
import BackButton from '@/components/onboarding-form/back-button'
import InputWithLabel from '@/components/onboarding-form/input-with-label'
import TextareaWithLabel from '@/components/onboarding-form/textarea-with-label'
import { useState } from 'react'
import { formatCurrency } from '@/utils/utils'
import Loading from '@/components/layout/loading'
import formAction from './action'
import { SubmitButton } from '@/components/onboarding-form/submit-button'
import { toast } from '@/components/ui/use-toast'

export default function OnboardingStep3() {
  const { data: session, status } = useSession({ required: true })
  const [costPerHour, setCostPerHour] = useState<number>(
    session?.user.costPerHour || 250
  )
  // if (session?.user.onboarded) push(`/expert/${session.user.username}`)

  const children =
    status === 'loading' ? (
      <Loading />
    ) : (
      <Form
        user={session?.user}
        costPerHour={costPerHour}
        setCostPerHour={setCostPerHour}
        bio={session?.user?.bio!}
      />
    )

  return <OnboardingSkeleton step={3}>{children}</OnboardingSkeleton>
}

type FormProps = {
  user: User
  setCostPerHour: React.Dispatch<React.SetStateAction<number>>
  costPerHour: number
  bio: string
}

function Form({ user, costPerHour, setCostPerHour, bio }: FormProps) {
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
    redirect(`/onboarding/4`)
  }
  return (
    <>
      <BackButton href='/onboarding/2'>Back</BackButton>
      <p className='onboarding-step'>Step 3/5</p>
      <h1 className='onboarding'>Next up...</h1>
      <form
        action={clientAction}
        className='flex flex-col justify-center gap-8'
      >
        <InputWithLabel
          label='What are your fees per hour?'
          name='costPerHour'
          type='number'
          placeholder='Enter your rate here'
          required
          value={costPerHour}
          isCurrency
          min={5}
          step={5}
          max={1500}
          pattern='[0-9]+'
          onChange={e => setCostPerHour((e.currentTarget as any).value)}
        />
        {!!costPerHour && (
          <div className='flex gap-8'>
            <div className='col-span-1 flex flex-col gap-3'>
              <p className='text-base'>Client pays</p>
              <h1 className='onboarding'>
                {formatCurrency(costPerHour * 1.2)}
              </h1>
              <p className='max-w-[10rem] text-base text-gray-400'>
                Callmi charges the client a 20% fee
              </p>
            </div>
            <div className='col-span-1 flex flex-col gap-3'>
              <p className='text-base'>You Get</p>
              <h1 className='onboarding'>{formatCurrency(costPerHour)}</h1>
              <p className='max-w-[10rem] text-base text-gray-400'>
                Callmi doesn&apos;t charge you a single penny!
              </p>
            </div>
          </div>
        )}
        <TextareaWithLabel
          label='Customize your bio'
          name='bio'
          placeholder='e.g.: Founded three B2B SaaS businesses, hit 20% MoM growth, and exited at series C.'
          required
          minLength={150}
          maxLength={600}
          defaultValue={bio}
          labelAlt='Add a personal touch by talking about your skills. Feel free to show off!'
        />

        <input
          type='hidden'
          name='userId'
          value={user.id}
        />
        <SubmitButton>Continue</SubmitButton>
      </form>
    </>
  )
}
