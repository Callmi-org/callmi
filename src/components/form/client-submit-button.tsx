'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

type Props = {
  children?: React.ReactNode
  onClick?: () => void
  loading?: boolean
  hasSkip?: boolean
  skipHref?: string
}

export function ClientSubmitButton({
  children,
  onClick,
  loading,
  hasSkip,
  skipHref,
}: Props) {
  return (
    <>
      <Button
        className='hidden h-12 w-full rounded-xl md:block'
        type='button'
        onClick={onClick}
        aria-disabled={loading}
        variant='default'
      >
        {loading ? (
          <Loader2 className='mx-auto h-4 w-4 animate-spin text-white' />
        ) : (
          children
        )}
      </Button>
      <Button
        className='fixed bottom-6 left-1/2 mx-auto block h-12 w-full max-w-[92vw] -translate-x-1/2 rounded-xl md:hidden'
        type='button'
        onClick={onClick}
        aria-disabled={loading}
      >
        {loading ? (
          <Loader2 className='mx-auto h-4 w-4 animate-spin text-white' />
        ) : (
          children
        )}
      </Button>
      {hasSkip && (
        <Link href={skipHref!}>
          <Button
            variant='link'
            type='button'
            className='w-full'
          >
            Skip
          </Button>
        </Link>
      )}
    </>
  )
}
