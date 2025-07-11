import React from 'react'
import Avis from '@/Components/Avis_client/Avis'
import HeroSlider from '@/Components/HeroSlider/HeroSlider'
import Service from '@/Components/Service/Banner_service/Service'
import  Card  from '@/Components/Feauture/Card_liste/Card'
import Section from '@/Components/Section/Section1'
import Blog from '@/Components/Blog/Blog'
import HeroSection from '@/Components/Section/HeroSection'
import Nav from '@/Components/Navbar/Nav';
import Footer from '@/Components/Footer/Footer';
import WhatsappButtons from '@/Components/WhatsappButtons';
import ScrollToTopButton from '@/Components/ScrollToTopButton';
import TrendingCarousel from '@/Components/Produit/TrendingCarousel/TrendingCarousel'
import Carousel from '@/Components/Carrousel/carrousel'

const page = () => {
  return (
    <>
    <Nav/>
    <HeroSlider/>
    <Card/>
    <Section/>
    <br /><br /><br />
    <Carousel/>
    <TrendingCarousel/>
    <br /><br /><br />
    <HeroSection/>
    <Avis/>
    <Service/>
    <Blog/>
    <WhatsappButtons/>
    <ScrollToTopButton/>
    <Footer/>
    </>

  )
}

export default page