import PricingSection from '@/components/landing/PricingSection'
import Header from '../components/landing/Header'
import HowItWorks from '../components/landing/HowItWorks'
import WhatToAsk from '../components/landing/WhatToAsk'
import CTA from '../components/landing/CTA'
import React from 'react'
import Footer from '@/components/landing/Footer'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Home = () => {
  // const user = currentUser()
  // if(user) redirect('/dashboard')
  return (
    <div>
    <Header/>
    <HowItWorks/>
    <WhatToAsk/>
    <PricingSection/>
    <CTA/>
    <Footer/>
    </div>
  )
}

export default Home
