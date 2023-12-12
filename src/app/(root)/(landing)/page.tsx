'use client'
import { categoryData, faqData } from '@/data/landing'
import FaqItem from '@/components/landing/faq'
import PrimaryFeatures from './main-features'
import Hero from './hero'
import React from 'react'
import { CreditCard, Globe2, Clock, CalendarRange } from 'lucide-react'
import SecondaryFeatures from './secondary-features'

export default function LandingPage() {
  // redirect('/waitlist')
  // const { categories } = useShuffleCategories(categoryData)
  const categories = categoryData

  return (
    <main className='flex flex-col items-center justify-center bg-white'>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <section></section>
    </main>
  )
}
