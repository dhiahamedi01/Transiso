import React from 'react'
import styles from '../Service.module.css'
import Image from 'next/image';


function page() {
  return (
    <>
    <div className={styles.Paper} >
      <div className={styles.Paper_g} >
        <div className={styles.partie} >
          Partie 1
        </div>
        <div className={styles.partie} >
          partie 2
        </div>
      </div>
      <div className={styles.Paper_d} >
        <div className={styles.Image} >
          <Image className={styles.icon} src="/img/Service/homme.avif"
          alt="cargo" width={550}  height={300}/>
        </div>
        <h1 className={styles.sectionHeading} >
        ملابس رجالية جاهزة
        </h1>
        <div className={styles.description}>
        على مدى سنوات من العمل في قطاع الخدمات اللوجستية في الدول العربية ومختلف أنحاء العالم، حرصت شركة ترانسيسو على تقديم خدمات شحن جوي وبحري متكاملة في تركيا، مع الالتزام بتلبية احتياجات العملاء بكفاءة واحترافية. وتسعى الشركة باستمرار إلى تعزيز مكانتها كشريك لوجستي موثوق ومفضل في هذا البلد، من خلال تقديم حلول عالية الجودة وخدمة متميزة.
        </div>
        <div className={styles.description}>
        على مدى سنوات من العمل في قطاع الخدمات اللوجستية في الدول العربية ومختلف أنحاء العالم، حرصت شركة ترانسيسو على تقديم خدمات شحن جوي وبحري متكاملة في تركيا، مع الالتزام بتلبية احتياجات العملاء بكفاءة واحترافية. وتسعى الشركة باستمرار إلى تعزيز مكانتها كشريك لوجستي موثوق ومفضل في هذا البلد، من خلال تقديم حلول عالية الجودة وخدمة متميزة.
        </div>
      </div>
    </div>
    </>
  )
}

export default page