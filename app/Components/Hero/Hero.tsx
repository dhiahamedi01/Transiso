import React from 'react'
import Style from './Hero.module.css'

function Hero() {
  return (
    <div className={Style.hero}>
      <div className={Style['hero-content']} data-aos="fade-up">
        <h1>مرحباً بكم في ترانسيسكو لوجستيك</h1>
        <div className={Style.breadcrumb}>
          <a href="#">الرئيسية</a>
          <a href="#">عن الشركة</a>
        </div>
      </div>
    </div>
  )
}

export default Hero
