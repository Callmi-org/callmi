'use client'
import { formatCurrency } from '@/utils/utils'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

type Props = {
  clientCostPerHour: number
  selectedDuration: [string, string]
}

export default function BookButton({
  clientCostPerHour,
  selectedDuration,
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      className='relative flex w-full items-center justify-center gap-2 bg-brand'
      disabled={pending}
    >
      {pending ? (
        <Loader2 className='mx-auto h-4 w-4 animate-spin text-white' />
      ) : (
        <>
          Proceed to checkout{' '}
          {formatCurrency((clientCostPerHour * +selectedDuration[0]) / 60)}
          <ArrowRight className='absolute right-4 hidden xl:block' />
        </>
      )}
    </Button>
  )
}
