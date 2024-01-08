'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
export default function SigninPage() {
  const queryParams = useSearchParams()
  const error = queryParams.get('error')
  return (
    <main
      className='flex flex-1 items-center justify-center p-4'
      style={{
        backgroundImage: 'url(/landing/overlay-light.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='flex w-full max-w-md flex-col gap-8 rounded-3xl border bg-white/75 p-8 text-center shadow'>
        <Image
          src='/logo.png'
          width={80}
          height={80}
          alt='Callmi Logo'
          className='mx-auto'
        />
        {error && (
          <div className='relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-800'>
            <span className='block sm:inline'>Error: {error}</span>
          </div>
        )}
        <Separator />
        <h1 className='text-2xl font-normal'>Welcome to Callmi!</h1>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className='justify-start gap-2 py-8 text-lg'
          variant='outline'
        >
          <Image
            src='/svg/google.svg'
            width={24}
            height={24}
            alt='Google Logo'
          />
          <span className='flex-1'>Login with Google</span>
        </Button>
        <Button
          onClick={() => signIn('google', { callbackUrl: '/onboarding/1' })}
          className='justify-start gap-2 bg-stone-50 py-8 text-lg'
          variant='outline'
        >
          <Image
            src='/svg/google.svg'
            width={24}
            height={24}
            alt='Google Logo'
          />
          <span className='flex-1'>Signup with Google</span>
        </Button>
      </div>
    </main>
  )
}
