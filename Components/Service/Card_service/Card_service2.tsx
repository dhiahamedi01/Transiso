import React from 'react'
import styles from './Card_service.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';  
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Image from 'next/image';

function RedLineWithAnimatedArrow() {
    return (
      <div className={styles.redLineWrapper}>
      <DoubleArrowIcon  sx={{fontSize:'30px'}} className={styles.animatedArrow} />
    </div>
    
    )
  }

function Card_service2() {
  return (
    <>
       <div className={styles.sectionHeader} >
       <h4 className={styles.sectionSubheading}>نوفر خدمات شحن احترافية ومخصصة داخل تركيا</h4>
       <h2 className={styles.sectionHeading}>الخدمات الفرعية المتوفرة</h2>
        <RedLineWithAnimatedArrow />
      </div>
      <div className={styles.Liste_card}>
        <div className={styles.card} data-aos="fade-up">
        <div className={styles.contenue}>
          <span className={styles.span}>الشحن الجزئي</span>
        </div>

          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>

        <div className={styles.card1} data-aos="fade-up" data-aos-delay="100">
          <div className={styles.contenue}>
            <span className={styles.span}>الشحن الجوي</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>

        <div className={styles.card2} data-aos="fade-up" data-aos-delay="200">
          <div className={styles.contenue}>
            <span className={styles.span}>الشحن البحري</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>

        <div className={styles.card3} data-aos="fade-up" data-aos-delay="300">
          <div className={styles.contenue}>
            <span className={styles.span}>الشحن البري</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>
        <div className={styles.card3} data-aos="fade-up" data-aos-delay="300">
          <div className={styles.contenue}>
            <span className={styles.span}>الشحن البري</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>
        <div className={styles.card3} data-aos="fade-up" data-aos-delay="300">
          <div className={styles.contenue}>
            <span className={styles.span}>الشحن البري</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>
        <div className={styles.card3} data-aos="fade-up" data-aos-delay="300">
          <div className={styles.contenue}>
            <span className={styles.span}>الشحن البري</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>
        <div className={styles.card3} data-aos="fade-up" data-aos-delay="300">
          <div className={styles.contenue}>
            <span className={styles.span}>الشحن البري</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>
      </div>
    </>
  )
}

export default Card_service2