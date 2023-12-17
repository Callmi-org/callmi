'use client'
import { useSession } from 'next-auth/react'
import SelectPill from '@/components/form/select-pill'
import { useEffect, useState } from 'react'
import { expertiseData, industryData } from '@/data/general'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { convertEnumToText } from '@/utils/prisma'
import BackButton from '@/components/form/back-button'
import { handleSubmit } from './handlers'
import { ClientSubmitButton } from '@/components/form/client-submit-button'
import OnboardingSkeleton from '../../onboarding-skeleton'

export default function OnboardingStep2() {
  const { data: session, status } = useSession({ required: true })
  const { push } = useRouter()
  const { toast } = useToast()
  if (session?.user.onboarded) push(`/expert/${session.user.id}`)

  const [selectedExpertises, setSelectedExpertises] = useState<Expertise[]>(
    (Array.isArray(session?.user?.expertise)
      ? (session?.user?.expertise.map(el =>
          convertEnumToText(el)
        ) as Expertise[])
      : []) || []
  )

  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>(
    (session?.user.industry.map(el => convertEnumToText(el)) as Industry[]) ||
      []
  )

  const [loading, setLoading] = useState(false)

  return (
    <OnboardingSkeleton
      wide
      step={2}
    >
      <BackButton href='/onboarding/1'>Back</BackButton>
      <p className='onboarding-step'>Step 2/5</p>
      <h1 className='onboarding'>Expertise (up to 3):</h1>

      <form
        // onSubmit={handleSubmit}
        className='flex flex-col justify-center gap-8'
      >
        <div className='flex flex-wrap gap-4'>
          {expertiseData.map(expertise => (
            <SelectPill
              key={expertise}
              isSelected={selectedExpertises.includes(expertise)}
              selected={selectedExpertises}
              setSelected={setSelectedExpertises}
              data={expertise}
              max={3}
            >
              {expertise}
            </SelectPill>
          ))}
        </div>
        <h1 className='onboarding'>Industry (up to 2):</h1>

        <div className='flex flex-wrap gap-4'>
          {industryData.map(industry => (
            <SelectPill
              key={industry}
              isSelected={selectedIndustries.includes(industry)}
              selected={selectedIndustries}
              setSelected={setSelectedIndustries}
              data={industry}
              max={2}
            >
              {industry}
            </SelectPill>
          ))}
        </div>

        <ClientSubmitButton
          loading={loading}
          onClick={() => {
            handleSubmit({
              selectedExpertises,
              selectedIndustries,
              userId: session?.user.id!,
              toast,
              setLoading,
              push,
            })
          }}
        >
          Continue
        </ClientSubmitButton>
      </form>
    </OnboardingSkeleton>
  )
}
