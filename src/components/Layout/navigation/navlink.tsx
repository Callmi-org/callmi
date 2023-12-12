import Link from 'next/link'

type NavLinkProps = {
  children: React.ReactNode
  href: string
}

export default function NavLink({ children, href }: NavLinkProps) {
  return (
    <li className='whitespace-nowrap transition-transform hover:translate-x-1'>
      <Link href={href}>{children}</Link>
    </li>
  )
}
