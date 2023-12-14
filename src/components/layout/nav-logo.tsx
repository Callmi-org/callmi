'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function NavLogo() {
  return (
    <Link
      href='/'
      className='flex items-center gap-1'
    >
      <motion.div whileHover={{ rotate: 180, scale: 1.1 }}>
        <Image
          src='/logo.png'
          alt='logo'
          height={32}
          width={32}
        />
      </motion.div>
      <h1 className='text-3xl tracking-wide'>Callmi</h1>
    </Link>
  )
}
