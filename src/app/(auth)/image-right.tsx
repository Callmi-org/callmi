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
          <div className='mt-8 flex w-full flex-wrap justify-center gap-12 px-12'>
            <Image
              src='/onboarding/companies/talabat.png'
              alt='google logo'
              width='110'
              height='110'
              className='object-contain'
            />
            <Image
              src='/onboarding/companies/eyewa.png'
              alt='amazon logo'
              width='110'
              height='110'
              className='object-contain'
            />
            <Image
              src='/onboarding/companies/pluto.png'
              alt='credly logo'
              width='128'
              height='128'
              className='object-contain'
            />
            <Image
              src='/onboarding/companies/careem.png'
              alt='meta logo'
              width='124'
              height='124'
              className='object-contain'
            />
            <Image
              src='/onboarding/companies/justlife.png'
              alt='Jira logo'
              width='110'
              height='110'
              className='object-contain'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
