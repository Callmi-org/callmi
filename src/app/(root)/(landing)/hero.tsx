import LandingNavbar from '@/components/layout/landing-navbar'
import Image from 'next/image'
import LandingButton from '@/components/landing/landing-button'
import { companyIconsData } from '@/data/landing'
import HighlightSpan from '@/components/landing/highlight-span'

export default function Hero() {
  return (
    <section
      id='hero'
      className='w-full pb-16 text-center shadow-sm md:pb-24'
      style={{
        backgroundImage: `url('/landing/overlay-light.jpg')`,
        backgroundSize: '100% 100%',
      }}
    >
      <LandingNavbar />
      <div className='flex flex-col items-center justify-center gap-8 px-4 pt-20'>
        <h1
          className='max-w-6xl text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl'
          style={{
            textWrap: 'balance',
          }}
        >
          Your time is valuable. Schedule and bill expert 1:1 calls in a blink⚡
        </h1>
        <p>
          Connect with those who seek your knowledge and get paid for your
          expertise.
        </p>
        <LandingButton>Join as an Expert</LandingButton>
        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <p className='font-normal tracking-wide text-black'>
            Join other experts and leaders from
          </p>
          <div className='grid w-full max-w-3xl grid-cols-5 items-center justify-center gap-4 px-4 '>
            {companyIconsData.map(({ src, alt }) => (
              <Image
                key={alt}
                src={src}
                alt={alt}
                width={100}
                height={100}
                className='object-contain'
              />
            ))}
          </div>
        </div>
        <Image
          src='/landing/booking.png'
          alt='booking'
          width={1920}
          height={1080}
          className='w-full max-w-9xl object-contain'
          priority
        />
      </div>
    </section>
  )
}
