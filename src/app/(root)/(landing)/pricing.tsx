import LandingButton from '@/components/landing/landing-button'
import NavLogo from '@/components/layout/nav-logo'
import Image from 'next/image'
import { Linkedin, LucideIcon, Mail } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/utils'
import NavLink from '@/components/layout/navigation/navlink'

export default function Pricing() {
  return (
    <section
      id='pricing'
      className=' w-full bg-[#FF3347] px-4  pb-0 pt-16 text-white  md:pb-16'
    >
      <div className='mx-auto flex w-full max-w-9xl flex-col items-center gap-8 text-center'>
        <h1
          className='max-w-xl text-3xl leading-tight md:text-[3rem] '
          style={{
            textWrap: 'balance',
          }}
        >
          Pricing? What pricing? Callmi is <span className='italic'>free</span>{' '}
          for experts
        </h1>
        <p className='max-w-4xl text-white'>
          There’s no registration fees to use our services. We only deduct 5%
          credit card processing upon withdrawal. We make money by charging your
          clients a 20% fee on top your fee per call.
        </p>
        <LandingButton className='bg-[#080808]'>
          Get Started For Free
        </LandingButton>
        <div className='relative'>
          <Image
            src='/landing/dashboard.png'
            width={1400}
            height={838}
            alt='dashboard'
            className='w-full max-w-7xl'
            priority
          />
          <div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-[#FF3347] from-25% to-transparent'></div>
        </div>
        <Footer />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <div className='z-20 -mt-[30%] w-full bg-transparent py-10 md:-mt-52'>
      <div className='mx-auto flex w-full max-w-9xl flex-col gap-16 rounded-[3.5rem] bg-[#080808] p-10 md:p-16'>
        <div className='just flex flex-wrap gap-8 md:justify-between'>
          <div className='flex flex-col gap-6'>
            <NavLogo />
            <small
              className='max-w-xs text-start font-light text-gray-400'
              style={{
                textWrap: 'balance',
              }}
            >
              <span className='font-bold'>Our goal: </span> give professionals
              1:1 access to experts that are otherwise inaccessible
            </small>
            <div className='flex gap-4'>
              <ContactIcon
                Icon={Linkedin}
                href='https://linkedin.com/in/mo-shawa'
                fill
              />
              <ContactIcon
                href='mailto:w@callmi.co'
                Icon={Mail}
              />
            </div>
          </div>
          <div className='max-w-xxs flex w-full justify-between gap-8 text-xs'>
            <ul className='flex flex-col gap-2 text-left'>
              <span className='text-gray-600'>Product</span>
              <NavLink href='#features'>Features</NavLink>
              <NavLink href='#pricing'>Pricing</NavLink>
              <NavLink href='#faq'>FAQs</NavLink>
            </ul>
            <ul className='flex flex-col gap-2 text-left'>
              <span className='text-gray-600'>Pages</span>
              <NavLink href='/terms'>Terms & Conditions</NavLink>
              <NavLink href='/privacy'>Privacy Policy</NavLink>
            </ul>
          </div>
        </div>
        <Separator className='bg-gray-800' />
        <small className='text-center text-gray-500'>
          © CALLMI 2023. ALL RIGHTS RESERVED
        </small>
      </div>
    </div>
  )
}

type ContactIconProps = { Icon: LucideIcon; href: string; fill?: boolean }

function ContactIcon({ Icon, href, fill }: ContactIconProps) {
  return (
    <Link
      href={href}
      className='rounded-full border-none bg-brand p-2 transition-all duration-700 hover:scale-125 hover:bg-black'
    >
      <Icon
        size={25}
        className={cn(
          'cursor-pointer  p-0.5',
          fill && 'fill-white  stroke-none'
        )}
      />
    </Link>
  )
}
