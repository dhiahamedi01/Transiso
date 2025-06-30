import React from 'react'
import styles from './Card.module.css'
import Groups2Icon from '@mui/icons-material/Groups2';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Image from 'next/image';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';  

function RedLineWithAnimatedArrow() {
  return (
    <div className={styles.redLineWrapper}>
    <DoubleArrowIcon  sx={{fontSize:'30px'}} className={styles.animatedArrow} />
  </div>
  
  )
}

function Card() {
  return (
    <>
      <div className={styles.sectionHeader} >
        <h4 className={styles.sectionSubheading}>لماذا نحن؟</h4>
        <h2 className={styles.sectionHeading}>مزايا العمل مع ترانسيسو</h2>
        <p className={styles.sectionDescription}>
          نقدم في ترانسيسو خدمات نقل ذكية وموثوقة، مدعومة بفريق خبير وتقنيات حديثة، لنضمن رضاكم الكامل.
        </p>

        
        <RedLineWithAnimatedArrow />
      </div>

      <section className={styles.infoSection}>
        <div className={styles.card} >
          <div className={`${styles.icon} ${styles.redBg}`}>
          <Image src="/img/icon/groupe.png" alt="about"width={40}height={40}className={styles.icon_about}/>
          </div>
          <h3 className={styles.heading}>فريقنا المتميز</h3>
          <p className={styles.text}>
            فريق ترانسيسو يتكون من خبراء متخصصين يسعون دائمًا لتقديم أفضل الخدمات وتحقيق رضا العملاء.
          </p>
        </div>

        <div className={`${styles.card} ${styles.darkBg}`} >
          <div className={`${styles.icon} ${styles.redBorder}`}>
          <Image src="/img/icon/Rapide.svg" alt="about"width={40}height={40} className={styles.icon_about2}/>
          </div>
          <h3 className={styles.heading}>توصيل سريع وفعال</h3>
          <p className={styles.text}>
            نعتمد على أحدث تقنيات النقل واللوجستيك لتقديم حلول ذكية تضمن سرعة وأمان الشحنات.
          </p>
        </div>

        <div className={styles.card} >
          <div className={`${styles.icon} ${styles.redBg}`}>
          <Image src="/img/icon/client.svg" alt="about"width={40}height={40}className={styles.icon_about}/>
          </div>
          <h3 className={styles.heading}>خدمة العملاء المتميزة</h3>
          <p className={styles.text}>
            نضع العميل في قلب عملنا، ونوفر دعمًا متواصلًا واستجابة سريعة لجميع استفساراتكم.
          </p>
        </div>
      </section>
    </>
  )
}

export default Card
