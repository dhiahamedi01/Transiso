import React from 'react'
import styles from './Banner.module.css'
import Image from 'next/image'
import DoneIcon from '@mui/icons-material/Done';

function Banner2() {
  return (
    <div className={styles.banner2}>
      <div className={styles.partieImage}>
      <Image 
  src="/img/about.png" 
  alt="about"
  width={600}
  height={600}
   className={styles.Image}
  style={{ display: 'block', margin: 0, padding: 0 }}
/>

      </div>
      <div className={styles.partieTexte}>
      <h1>لماذا تختار ترانزيسو لوجستيك؟</h1>
      <p className={styles.description}>
          عبر سنوات من العمل في قطاع الخدمات اللوجستية في الدول العربية و العالم سعت ترانزيسو لتوفير خدمات الشحن الجوي و البحري في تركيا و لأن تكون الداعم اللوجستي الموثوق لعملائها في تركيا.
          إن موظفينا المدربين و امتداد فروعنا في العالم هم المصدر الرئيسي لخدمة العملاء و المعرفة و التطوير مع الثقة التي منحها لها عملاؤها , جعلت من شركة ترانزيسو شركة عالمية تسابق الزمن من أجل الحفاظ على ثقة عملائها و احتياجاتهم في الشحن العالمي.
        </p>
        <ul className={styles.points}>
          <li>
            <DoneIcon className={styles.icon} />
            خبرة واسعة في الشحن الجوي والبحري من اسطنبول و تركيا
          </li>
          <li>
            <DoneIcon className={styles.icon} />
            شبكة فروع عالمية تربط الشرق بالغرب
          </li>
          <li>
            <DoneIcon className={styles.icon} />
            فريق عمل محترف مدرب لخدمة العملاء
          </li>
          <li>
            <DoneIcon className={styles.icon} />
            الالتزام بالدقة والموثوقية في تسليم الشحنات
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Banner2
