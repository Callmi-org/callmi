import { AlertCircleIcon, Check } from 'lucide-react'
import { profile } from '@/data/general'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import Email from 'next-auth/providers/email'
export default function BookingSuccess({
  searchParams,
}: {
  searchParams: any
}) {
  if (!searchParams.expert_name || !searchParams.session_id) {
    return (
      <main className='flex flex-1 items-center justify-center px-4 py-8 text-center  md:px-12 2xl:pb-4'>
        <div>
          <h1 className='text-2xl font-bold'>Something went wrong</h1>
          <p>
            We couldn't find the meeting you were looking for. It might have
            been cancelled or rescheduled.
          </p>
          <p>
            If it wasn't, please get in touch with Walid via <EmailButton /> or{' '}
            <WhatsappButton />
          </p>
          <small>
            Include the link to this page in your message so we can help you
            faster
          </small>
        </div>
      </main>
    )
  }
  return (
    <main className='flex-1 px-4 py-8 md:px-12 2xl:pb-4'>
      <div className='mx-auto max-w-md rounded-3xl p-6 '>
        <div className='flex flex-col items-center gap-8'>
          <div className='flex items-center gap-2 whitespace-nowrap rounded-2xl border border-red-700 bg-red-100 px-4 py-3 text-sm text-red-900'>
            <AlertCircleIcon /> <span className='font-bold'>Important</span> -
            please bookmark this page
          </div>
          <Check className='h-20 w-20 rounded-full bg-brand stroke-[4px] p-4 text-white' />
          <h1 className='text-center text-2xl font-bold'>
            Your meeting has been scheduled with {searchParams.expert_name}!
          </h1>
          <p className='text-center text-sm text-gray-500'>
            You should receive a calendar invite within the next 12 hours.
          </p>
          <Separator />
          {/* <div className='grid grid-cols-6 gap-12 self-start text-sm'>
            <span className='col-span-2 font-semibold'>Amount Paid</span>
            <div className='col-span-4 flex flex-col'>
              <span>$120 via Stripe</span>
              <span className='font-light text-gray-600'>
                Confirmed on {new Date().toDateString()}
              </span>
            </div>
          </div>
          <div className='grid grid-cols-6 gap-12 self-start text-sm'>
            <span className='col-span-2 font-semibold'>Meet Details</span>
            <div className='col-span-4 flex flex-col'>
              <span>{new Date().toDateString()}</span>
              <span className='font-light text-gray-600'>
                9:30 AM - 10:30 AM (PST)
              </span>
            </div>
          </div>
          <div className='grid grid-cols-6 gap-12 self-start text-sm'>
            <span className='col-span-2 font-semibold'>Expert Details</span>
            <div className='col-span-4 flex flex-col'>
              <span>{profile.name}</span>
              <span className='font-light text-gray-600'>{profile.email}</span>
            </div>
          </div> */}
          <Link
            className='w-full'
            href='/'
          >
            <Button
              variant='outline'
              className='w-full border-gray-300 bg-transparent'
            >
              Go to homepage
            </Button>
          </Link>
          <small className='text-center text-gray-600'>
            Need to make a change? <EmailButton /> or <WhatsappButton />
          </small>
        </div>
      </div>
    </main>
  )
}

export function EmailButton() {
  return (
    <a
      className='font-semibold text-brand'
      href='mailto:w@callmi.co'
    >
      {' '}
      email (w@callmi.co)
    </a>
  )
}
export function WhatsappButton() {
  return (
    <a
      className='inline-flex items-center gap-1 font-semibold text-green-600'
      href='https://wa.me/971585985161'
    >
      {' '}
      WhatsApp
      <Image
        src='/svg/whatsapp.svg'
        width={20}
        height={20}
        alt='WhatsApp'
      />
    </a>
  )
}
