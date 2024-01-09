import { onboardingCompanyIconsData } from '@/data/onboarding'
import Image from 'next/image'
export default function ImageRight() {
  return (
    <div className='relative col-span-1 hidden bg-brand lg:block'>
      <div className='sticky left-0 top-0 h-full max-h-screen w-full'>
        <Image
          src='/onboarding/onboarding.jpg'
          alt='Onboarding image 1'
          className='h-full w-full object-cover'
          width='1024'
          height='1024'
          priority
        />
        <div className='absolute bottom-16 left-1/2 w-full -translate-x-1/2'>
          <h1 className='whitespace-nowrap text-center text-3xl font-medium text-white'>
            Trusted by experts from
          </h1>
          <div className='mx-auto mt-8 grid w-full max-w-3xl grid-cols-5 items-center justify-center gap-4 px-4'>
            {onboardingCompanyIconsData.map(({ src, alt }, idx) => (
              <Image
                key={idx}
                src={src}
                alt={alt}
                width='96'
                height='96'
                className='mx-auto object-contain'
                priority
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
