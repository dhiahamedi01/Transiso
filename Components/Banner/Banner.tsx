import React from 'react'
import Image from 'next/image'
import styles from './Banner.module.css'

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.imageWrapper}>
        <Image 
          src="/img/element/shape-image.png" 
          alt="Shape" 
          layout="fill" 
          objectFit="cover" 
          className={styles.shapeImage} 
          priority
        />
      </div>

      <div className={styles.textWrapper}>
        <h2 className={styles.title}>نخلق الفرص لتحقيق الإمكانات</h2>
        <p className={styles.subtitle}>نحن نؤمن بأن كل خطوة تنقل عملك نحو مستقبل أفضل</p>
        <div className={styles.footerWrapper}>
           <button className={styles.button}>إكتشف المزيد</button>
        </div>
      </div>

    </div>
  )
}

export default Banner
