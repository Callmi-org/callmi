import Link from 'next/link'
import { Button } from '../ui/button'

export default function LandingButton({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Link href='/waitlist'>
      <Button className='bg-brand font-normal text-white'>{children}</Button>
    </Link>
  )
}
