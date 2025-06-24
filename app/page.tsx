import React from 'react'
import Avis from '@/Components/Avis_client/Avis'
import HeroSlider from '@/Components/HeroSlider/HeroSlider'
import Service from '@/Components/Service/Banner_service/Service'
import  Card  from '@/Components/Feauture/Card_liste/Card'
import Section from '@/Components/Section/Section1'
import Blog from '@/Components/Blog/Blog'
import HeroSection from '@/Components/Section/HeroSection'
import ScrollToTopButton from '@/Components/ScrollToTopButton'
import WhatsappButtons from '@/Components/WhatsappButtons'
import TrendingCarousel from '@/Components/Produit/TrendingCarousel/TrendingCarousel'

const page = () => {
  return (
    <>
    <HeroSlider/>
    <Card/>
    <Section/>
    <br /><br /><br />
    <TrendingCarousel/>
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