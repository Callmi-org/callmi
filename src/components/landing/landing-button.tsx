import Link from 'next/link'
import { Button } from '../ui/button'
import { cn } from '@/utils/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function LandingButton({ children, className }: Props) {
  return (
    <Link href='/waitlist'>
      <Button className={cn('bg-brand font-normal text-white', className)}>
        {children}
      </Button>
    </Link>
  )
}
