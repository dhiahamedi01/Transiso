import Card from '@/Components/Feauture/Card_liste/Card'
import Hero from '@/Components/Feauture/Hero/Hero'
import HeroSection from '@/Components/Section/HeroSection'
import Card_service from '@/Components/Service/Card_service/Card_service'
import Card_service2 from '@/Components/Service/Card_service/Card_service2'
import TurkishAgencySection from '@/Components/Service/TurkishAgencySection'
import React from 'react'

function page() {
  return (
    <>
    <Hero/>
    <TurkishAgencySection/>
    <Card_service/>
    <Card/>
    <br /><br />
    <Card_service2/>
    <br /><br />
    </>
  )
}

export default page