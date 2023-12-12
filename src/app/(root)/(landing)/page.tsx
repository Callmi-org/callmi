'use client'
// import { motion } from 'framer-motion'
// import useShuffleCategories from '@/hooks/useShuffleCategories'
import { categoryData, featuresData, faqData } from '@/data/landing'
import FaqItem from '@/components/landing/faq'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ClientNavbar from '@/components/layout/client-navbar'
import Link from 'next/link'
import Features from './features'
import Hero from './hero'

export default function LandingPage() {
  // redirect('/waitlist')
  // const { categories } = useShuffleCategories(categoryData)
  const categories = categoryData

  return (
    <main className='flex flex-col items-center justify-center bg-white'>
      <Hero />
      <Features />
    </main>
  )
}
