import Link from 'next/link'

type Props = {
  children: React.ReactNode
  href: string
}

export function NavLink({ children, href }: Props) {
  return (
    <li className='whitespace-nowrap rounded-2xl transition-all hover:-translate-y-0.5'>
      <Link href={href}>{children}</Link>
    </li>
  )
}

export function FooterNavLink({ children, href }: Props) {
  return (
    <li className='whitespace-nowrap transition-transform hover:translate-x-1'>
      <Link href={href}>{children}</Link>
    </li>
  )
}
