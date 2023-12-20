'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ClientSubmitButton } from '@/components/form/client-submit-button'
import OnboardingSkeleton from '../../onboarding-skeleton'
import BackButton from '@/components/form/back-button'
import InputWithLabel from '@/components/form/input-with-label'
import TextareaWithLabel from '@/components/form/textarea-with-label'
import { handleSubmit } from './handlers'
import { useState } from 'react'
import { formatCurrency } from '@/utils/utils'
import Loading from '@/components/layout/loading'

export default function OnboardingStep3() {
  const { data: session, status } = useSession({ required: true })
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const [costPerHour, setCostPerHour] = useState<number>(250)
  const [bio, setBio] = useState<string>(session?.user?.bio!)

  if (session?.user.onboarded) push(`/expert/${session.user.username}`)

  const children =
    status === 'loading' ? (
      <Loading />
    ) : (
      <Form
        user={session?.user}
        loading={loading}
        setLoading={setLoading}
        costPerHour={costPerHour}
        setCostPerHour={setCostPerHour}
        bio={bio}
        setBio={setBio}
        push={push}
      />
    )

  return <OnboardingSkeleton step={3}>{children}</OnboardingSkeleton>
}

type FormProps = {
  user: User
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  push: (url: string) => void
  setCostPerHour: React.Dispatch<React.SetStateAction<number>>
  setBio: React.Dispatch<React.SetStateAction<string>>
  loading: boolean
  costPerHour: number
  bio: string
}

function Form({
  user,
  loading,
  setLoading,
  costPerHour,
  setCostPerHour,
  bio,
  setBio,
  push,
}: FormProps) {
  return (
    <>
      <BackButton href='/onboarding/2'>Back</BackButton>
      <p className='onboarding-step'>Step 3/5</p>
      <h1 className='onboarding'>Next up...</h1>
      <form className='flex flex-col justify-center gap-8'>
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
          defaultValue={bio}
          value={bio}
          labelAlt='Add a personal touch by talking about your skills. Feel free to show off!'
          onChange={e => setBio((e.currentTarget as any).value)}
        />
        <ClientSubmitButton
          loading={loading}
          onClick={() =>
            handleSubmit({
              costPerHour,
              bio,
              setLoading,
              push,
              userId: user.id!,
            })
          }
        >
          Continue
        </ClientSubmitButton>
      </form>
    </>
  )
}
