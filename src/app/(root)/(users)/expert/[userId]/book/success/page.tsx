import { AlertCircleIcon, Check } from 'lucide-react'
import { profile } from '@/data/general'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function BookingSuccess() {
  return (
    <main className='min-h-screen px-4 pb-20 pt-28 md:px-12 2xl:pb-4'>
      <div className='mx-auto max-w-md rounded-3xl p-6 md:bg-gray-100'>
        <div className='flex flex-col items-center gap-8'>
          <div className='flex items-center gap-2 whitespace-nowrap rounded-2xl border border-red-700 bg-red-100 px-4 py-3 text-sm text-red-900'>
            <AlertCircleIcon /> <span className='font-bold'>Important</span> -
            please bookmark this page
          </div>
          <Check className='h-20 w-20 rounded-full bg-brand stroke-[4px] p-4 text-white' />
          <h1 className='text-center text-2xl font-bold'>
            Your meeting has been scheduled with {profile.name}!
          </h1>
          <p className='text-center text-sm text-gray-500'>
            Check your email for the calendar invitation link
          </p>
          <Separator />
          <div className='grid grid-cols-6 gap-12 self-start text-sm'>
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
          </div>
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
            Need to make a change?{' '}
            <Link
              href={`/expert/${profile.id}`}
              className='font-semibold'
            >
              Reschedule
            </Link>{' '}
            or email{' '}
            <a
              className='font-semibold'
              href={`mailto:w@callmi.co`}
            >
              w@callmi.co
            </a>
          </small>
        </div>
      </div>
    </main>
  )
}
