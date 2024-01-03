import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/utils/utils'
import { VariantProps } from 'class-variance-authority'

type Props = {
  children: React.ReactNode
  className?: string
} & VariantProps<typeof buttonVariants>

export default function LandingButton({
  children,
  className = 'bg-brand font-normal text-white',
  variant,
  size,
  ...props
}: Props) {
  return (
    <Link href='/onboarding/1'>
      <Button className={cn(buttonVariants({ variant, size, className }))}>
        {children}
      </Button>
    </Link>
  )
}
