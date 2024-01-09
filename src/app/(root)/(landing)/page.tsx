'use client'
import PrimaryFeatures from './main-features'
import Hero from './hero'
import React from 'react'
import SecondaryFeatures from './secondary-features'
import FAQ from './faq'
import Pricing from './pricing'
import dayjs from 'dayjs'
export default function LandingPage() {
  // redirect('/waitlist')
  dayjs().minute()
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
