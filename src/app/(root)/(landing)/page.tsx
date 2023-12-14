'use client'
import { categoryData, faqData } from '@/data/landing'
import PrimaryFeatures from './main-features'
import Hero from './hero'
import React from 'react'
import SecondaryFeatures from './secondary-features'
import FAQ from './faq'
import Pricing from './pricing'

export default function LandingPage() {
  // redirect('/waitlist')
  const categories = categoryData

  return (
    <main className='flex flex-col items-center justify-center bg-white'>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <FAQ />
      <Pricing />
    </main>
  )
}
