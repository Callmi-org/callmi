import ClientNavbar from '@/components/layout/client-navbar'
import Image from 'next/image'
import LandingButton from '@/components/landing/landing-button'
import { companyIconsData } from '@/data/landing'

export default function Hero() {
  return (
    <section
      id='hero'
      className='min-h-screen bg-lime-50 pb-16 text-center md:pb-24'
      style={{
        backgroundImage: `url('/landing/overlay-light.jpg')`,
        backgroundSize: 'cover',
      }}
    >
      <ClientNavbar />
      <div className='flex flex-col items-center justify-center gap-8 px-4 pt-20'>
        <h1 className='max-w-9xl text-5xl font-medium md:text-7xl xl:text-8xl 2xl:text-[6.5rem]'>
          Your time is valuable. Schedule and bill your 1:1 calls in a blink ⚡
        </h1>
        <p>
          Connect with those who seek your knowledge and get paid for your
          expertise.
        </p>
        <LandingButton>Get Started For Free</LandingButton>
        <div className='flex w-full flex-col items-center justify-center gap-4'>
          <p className='font-normal tracking-wide text-black'>
            Trusted by leaders from
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
        />
      </div>
    </section>
  )
}
