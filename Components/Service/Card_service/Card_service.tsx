import React from 'react'
import styles from './Card_service.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';  


function RedLineWithAnimatedArrow() {
    return (
      <div className={styles.redLineWrapper}>
      <DoubleArrowIcon  sx={{fontSize:'30px'}} className={styles.animatedArrow} />
    </div>
    
    )
  }

function Card_service() {
  return (
    <>
       <div className={styles.sectionHeader} >
        <h4 className={styles.sectionSubheading}>خبرة عالمية في خدمـة شحناتك</h4>
        <h2 className={styles.sectionHeading}>حلول الشحن العالمية من ترانسيسو</h2>
        <p className={styles.sectionDescription}>
        توفر ترانسيسو خدمات شحن جوي وبحري موثوقة من تركيا، بدعم من فريق محترف وشبكة فروع عالمية، لضمان سرعة التنفيذ ودقة التسليم.
        </p>
      </div>
    </>
  )
}

export default Card_service