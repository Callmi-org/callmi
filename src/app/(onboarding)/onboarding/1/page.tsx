'use client'
import Input from '@/components/form/input-with-label'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/form/submit-button'
import Select from '@/components/form/select-with-label'
import formAction from './action'
import OnboardingSkeleton from '../../onboarding-skeleton'
import { useSession } from 'next-auth/react'
import Loading from '@/components/layout/loading'

export default function OnboardingStep1() {
  const { data: session, status } = useSession({ required: true })
  if (session?.user.onboarded) redirect(`/expert/${session.user.username}`)

  const children =
    status === 'loading' ? <Loading /> : <Form user={session.user} />

  return <OnboardingSkeleton step={1}>{children}</OnboardingSkeleton>
}

type FormProps = {
  user: User
}

function Form({ user }: FormProps) {
  return (
    <>
      <p className='onboarding-step'>Step 1/5</p>
      <h1 className='onboarding'>Welcome To Callmi</h1>
      <form
        action={formAction}
        className='relative flex flex-col gap-4'
      >
        <Input
          label='Name'
          name='name'
          type='text'
          value={user.name}
          required
        />
        <Input
          label='Email'
          name='email-visible'
          type='email'
          value={user.email}
          disabled
          required
        />
        <Input
          label='Company'
          name='company'
          type='string'
          placeholder='Enter your company name'
          value={user.company}
        />
        <Input
          label='Position'
          name='position'
          type='string'
          placeholder='Enter your position at the company'
          value={user.position}
          required
        />
        <Select
          name='timezone'
          label='Time Zone'
          options={Intl.supportedValuesOf('timeZone')}
          required
          placeholder='Select your time zone'
          value={Intl.DateTimeFormat().resolvedOptions().timeZone}
        />
        <input
          type='hidden'
          name='email'
          value={user.email}
        />
        <input
          type='hidden'
          name='originalName'
          value={user.name}
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
