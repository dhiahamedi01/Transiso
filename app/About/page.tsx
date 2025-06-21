import React from 'react'
import Hero from '../Components/Hero/Hero'
import Card  from '../Components/Card/Card'
import ScrollToTopButton from '../Components/ScrollToTopButton'
import WhatsappButtons from '../Components/WhatsappButtons'
import Banner from '../Components/Banner/Banner'
function index() {
  return (
    <div>
      <Hero/>
      <Card/>
      <Banner/>
      <ScrollToTopButton />
      <WhatsappButtons/>
    </div>
  )
}

export default index