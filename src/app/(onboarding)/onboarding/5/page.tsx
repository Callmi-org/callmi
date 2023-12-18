'use client'

import BackButton from '@/components/form/back-button'
import OnboardingSkeleton from '../../onboarding-skeleton'
import InputWithLabel from '@/components/form/input-with-label'
import handleSubmit from './handlers'
import { useSession } from 'next-auth/react'
import { ClientSubmitButton } from '@/components/form/client-submit-button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingStep5() {
  const { data: session } = useSession({ required: true })
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [charityName, setCharityName] = useState('')
  const [charityUrl, setCharityUrl] = useState('')

  if (session?.user.onboarded) push(`/expert/${session.user.id}`)

  return (
    <OnboardingSkeleton step={5}>
      <BackButton href='/onboarding/4'>Back</BackButton>
      <p className='onboarding-step'>Step 5/5</p>
      <h1 className='onboarding'>Donating to a charity? (Optional)</h1>
      <p className='text-base font-light text-gray-400'>
        Want to donate a part of your earnings to a cause? Let your clients
        know! <br /> P.S.: Callmi does not facilitate charitable transactions.
        You are responsible for forwarding the funds to the charity you have
        chosen.
      </p>
      <form className='flex flex-col justify-center gap-8'>
        <InputWithLabel
          label='Charity Name'
          name='charityName'
          type='text'
          placeholder='Enter the charity name here please'
          value={charityName}
          onChange={e => setCharityName((e.currentTarget as any).value)}
        />

        <InputWithLabel
          label='Charity Website'
          name='charityUrl'
          type='url'
          placeholder="Enter the URL of the charity's website"
          value={charityUrl}
          onChange={e => setCharityUrl((e.currentTarget as any).value)}
        />

        <ClientSubmitButton
          hasSkip
          skipHref='/expert/123'
          loading={loading}
          onClick={() =>
            handleSubmit({
              id: session?.user.id!,
              username: session?.user.username!,
              charityName,
              charityUrl,
              setLoading,
              push,
            })
          }
        >
          Finish
        </ClientSubmitButton>
      </form>
    </OnboardingSkeleton>
  )
}
