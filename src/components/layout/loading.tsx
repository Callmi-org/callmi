import Image from 'next/image'
export default function Loading() {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='animate-bounce'>
        <Image
          src='/logo.png'
          alt='logo'
          height={64}
          width={64}
        />
      </div>
    </div>
  )
}
