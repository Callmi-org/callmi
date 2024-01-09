import Image from 'next/image'
import HighlightSpan from '@/components/landing/highlight-span'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default function MainFeatures() {
  return (
    <section
      id='features'
      className='mx-auto flex w-full max-w-9xl flex-col items-center gap-16 px-4 pb-8 pt-12'
    >
      <h1
        className='max-w-xl text-center text-3xl leading-tight md:text-[3rem]'
        style={{
          textWrap: 'balance',
        }}
      >
        Join MENA&apos;s biggest community of{' '}
        <HighlightSpan>experts</HighlightSpan>
      </h1>
      <Feature image='/landing/features/1.png'>
        <FeatureTitle>Turn expertise into income</FeatureTitle>
        <FeatureDescription>
          Sign up in less than 3 minutes. Price your sessions as you see fit and
          help professionals avoid “expensive learnings” you&apos;ve made
          earlier in your career. Flexibly add sessions to your calendar, free
          from any minimum session obligations.
        </FeatureDescription>
      </Feature>
      <Feature
        flipOrder
        image='/landing/features/2.png'
      >
        <FeatureTitle>
          <HighlightSpan>Feature-rich</HighlightSpan> booking built for busy
          people
        </FeatureTitle>
        <FeatureDescription>
          Callmi&apos;s expert booking tool syncs with your calendar for
          hassle-free scheduling. If you&apos;re feeling charitable, you can
          inform your clients that you&apos;re supporting a cause with each
          session.
        </FeatureDescription>
      </Feature>

      <Feature image='/landing/features/3.png'>
        <FeatureTitle>Dedicated dashboard to manage your workflow</FeatureTitle>
        <FeatureDescription>
          As soon as you&apos;re booked, appointments are automatically synced
          to your calendar, with Google Meet video calls. Got busy? Change your
          availability. Want to update your pricing? You can do that in a couple
          of clicks. Feel like withdrawing your earnings? We&apos;re here to
          help.
        </FeatureDescription>
        <Link
          href='/waitlist'
          className='mx-auto md:mx-0'
        >
          <Button className='w-min bg-brand px-8 font-normal text-white'>
            Join as an Expert
          </Button>
        </Link>
      </Feature>
    </section>
  )
}

type FeatureProps = {
  children?: React.ReactNode
  image: string
  flipOrder?: boolean
}

function Feature({ children, image, flipOrder = false }: FeatureProps) {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      <div className={flipOrder ? 'md:order-last' : ''}>
        <div className='flex h-full w-full items-center'>
          <Image
            src={image}
            alt='feature'
            width={750}
            height={550}
          />
        </div>
      </div>
      <div className='flex flex-col justify-center gap-8'>{children}</div>
    </div>
  )
}

function FeatureTitle({ children }: { children: React.ReactNode }) {
  return <h1 className='max-w-xl text-2xl md:text-5xl'>{children}</h1>
}

function FeatureDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className='max-w-2xl text-base font-light md:text-[1.08rem]'>
      {children}
    </p>
  )
}
