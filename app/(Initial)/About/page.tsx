import React from 'react'
import Hero from '@/Components/Feauture/Hero/Hero'
import Card  from '@/Components/Card/Card'
import ScrollToTopButton from '@/Components/ScrollToTopButton'
import WhatsappButtons from '@/Components/WhatsappButtons'
import Banner from '@/Components/Banner/Banner'
import Banner2 from '@/Components/Banner/Banner2'
import Localisation from '@/Components/Localisation/Localisation'
import Expertise from '@/Components/Information_section/about_info'
function index() {
  return (
    <div>
      <Hero/>
      <Expertise/>
      <Banner/><br /><br />
      <Card/>

      <Localisation/>
    </div>
  )
}

export default index