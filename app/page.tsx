import React from 'react'
import Avis from './Components/Avis_client/Avis'
import HeroSlider from './Components/HeroSlider/HeroSlider'
import Service from './Components/Service/Service'
import  Card  from './Components/Card_liste/Card'
import Section from './Components/Section/Section1'
import Blog from './Components/Blog/Blog'
import HeroSection from './Components/Section/HeroSection'
import ScrollToTopButton from './Components/ScrollToTopButton'
import WhatsappButtons from './Components/WhatsappButtons'

const page = () => {
  return (
    <>
    <HeroSlider/>
    <Card/>
    <Section/>
    <br /><br /><br />
    <HeroSection/>
    <Avis/>
    <Service/>
    <Blog/>
    <ScrollToTopButton />
    <WhatsappButtons/>
    </>

  )
}

export default page