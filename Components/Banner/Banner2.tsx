import React from 'react'
import styles from './Banner.module.css'
import Image from 'next/image'
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
function Banner2() {
  return (
    <div className={styles.banner2}>
      <div className={styles.partieTexte}>
      <div className={styles.abou_titre}>
          <Image src="/img/icon/droite.svg" alt="about"width={25}height={25}className={styles.icon_about}/>
          <span className={styles.sous_titre}>  نبذة عن الشركة</span>
          <Image src="/img/icon/gauche.svg" alt="droite"width={25}height={25}className={styles.icon_about}/>
      </div>
        <h1>ترانزيسو لوجستيك: شريكك اللوجستي الموثوق في تركيا والعالم</h1>
        <p className={styles.description}>
          عبر سنوات من العمل في قطاع الخدمات اللوجستية في الدول العربية و العالم سعت ترانزيسو لتوفير خدمات الشحن الجوي و البحري في تركيا و لأن تكون الداعم اللوجستي الموثوق لعملائها في تركيا.
          إن موظفينا المدربين و امتداد فروعنا في العالم هم المصدر الرئيسي لخدمة العملاء و المعرفة و التطوير مع الثقة التي منحها لها عملاؤها , جعلت من شركة ترانزيسو شركة عالمية تسابق الزمن من أجل الحفاظ على ثقة عملائها و احتياجاتهم في الشحن العالمي.
        </p>

        <div className={styles.card_about}>
  {/* Colonne gauche : icône, titre, sous‑titre */}
  <div className={styles.left_about}>
    {/* Icône SVG principale déjà existante */}
    <Image
      src="/img/icon/about-icon1.png"      /* remplace par ton nom de fichier */
      alt="Package icon"
      width={48}
      height={48}
      className={styles.mainIcon_about}
    />
 <div className={styles.text_about}>
      <h3 className={styles.title_about}>التتبع عبر الإنترنت</h3>
      <p className={styles.subtitle_about}>
      هناك حقيقة ثابتة منذ فترة طويلة وهي أن القارئ.
      </p>
    </div>
  </div>

  {/* Colonne droite : liste avec coches MUI */}
  <ul className={styles.list_about}>
    <li className={styles.item_about}>
      <CheckCircleIcon className={styles.check_about} />
      تحسين معدل التسليم في الوقت المحدد
    </li>

    <li className={styles.item_about}>
      <CheckCircleIcon className={styles.check_about} />
      توسيع الأسطول وتحديثه
    </li>

    <li className={styles.item_about}>
      <CheckCircleIcon className={styles.check_about} />
      تكامل التكنولوجيا المتقدمة
    </li>
  </ul>
</div>

<div className={styles.Footer_about}>
<button>اكتشف المزيد<KeyboardBackspaceIcon/></button>
</div>
      </div>
      <div className={styles.partieImage}>
        <Image 
          src="/img/Untitled-1.png" 
          alt="about"
          width={750}
          height={790}
          className={styles.Image}
        />
      </div>
    </div>
  )
}

export default Banner2
