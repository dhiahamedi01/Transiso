import React from 'react'
import Hero from '../Components/Hero/Hero'
import Card  from '../Components/Card/Card'
import ScrollToTopButton from '../Components/ScrollToTopButton'
import WhatsappButtons from '../Components/WhatsappButtons'
import Banner from '../Components/Banner/Banner'
import Banner2 from '../Components/Banner/Banner2'
function index() {
  return (
    <div>
      <Hero/>
      <Card/>
      <Banner/>
      <Banner2/>
      <ScrollToTopButton />
      <WhatsappButtons/>
    </div>
  )
}

export default index