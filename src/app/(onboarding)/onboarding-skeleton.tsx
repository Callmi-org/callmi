import Image from 'next/image'
import ImageRight from './image-right'
import { cn } from '@/utils/utils'

type Props = {
  children: React.ReactNode
  step: number
  wide?: boolean
}

const stepWidthClasses: Record<number, string> = {
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
  5: 'w-full',
}

export default function OnboardingSkeleton({
  children,
  step,
  wide = false,
}: Props) {
  return (
    <main className='grid w-full flex-1 grid-cols-1 bg-white md:grid-cols-2'>
      <div
        id='left'
        className='col-span-1'
      >
        <div className='relative flex items-center p-2 md:p-4'>
          <Image
            src='/logo.png'
            alt='Callmi logo'
            width={64}
            height={64}
            className='w-8 md:w-14'
          />
          <h1 className='text-3xl md:text-4xl'>Callmi</h1>
          <div
            className={cn(
              'absolute bottom-0 left-0 h-1 rounded-r bg-brand',
              stepWidthClasses[step]
            )}
          ></div>
        </div>
        <div
          className={cn(
            'mx-auto flex w-full flex-col gap-6 px-4 py-8 pb-24 md:gap-8 md:pb-8',
            wide ? 'max-w-3xl' : 'max-w-xl'
          )}
        >
          {children}
        </div>
      </div>
      <ImageRight />
    </main>
  )
}
