import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Input from '@/components/form/input-with-label'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/form/submit-button'
import { timeZones } from '@/data/general'
import Select from '@/components/form/select-with-label'
import formAction from './action'
import OnboardingSkeleton from '../../onboarding-skeleton'

export default async function OnboardingStep1() {
  const session = await getServerSession(options)
  if (!session) redirect('/api/auth/signin')

  return (
    <OnboardingSkeleton step={1}>
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
          value={session?.user?.name!}
          required
        />
        <Input
          label='Email'
          name='email-visible'
          type='email'
          value={session?.user?.email!}
          disabled
          required
        />
        <Input
          label='Company'
          name='company'
          type='string'
          placeholder='Enter your company name'
          value={session?.user?.company!}
        />
        <Input
          label='Position'
          name='position'
          type='string'
          placeholder='Enter your position at the company'
          value={session?.user?.position!}
          required
        />
        <Select
          name='timezone'
          label='Time Zone'
          options={timeZones}
          required
          placeholder='Select your time zone'
          value={session?.user?.timezone!}
        />
        <input
          type='hidden'
          name='email'
          value={session.user.email!}
        />
        <input
          type='hidden'
          name='originalName'
          value={session.user.name!}
        />
        <input
          type='hidden'
          name='userId'
          value={session.user.id}
        />
        <SubmitButton>Continue</SubmitButton>
      </form>
    </OnboardingSkeleton>
  )
}
