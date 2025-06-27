import React from 'react'
import styles from './Demande.module.css'
import Image from 'next/image';
import FAQ from '@/Components/FAQ/FAQ';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactInfoCard from '@/Components/Service/Side_card/ContactInfoCard';
import { Typography} from "@mui/material";
import OtherServices from '@/Components/Service/Side_card/OtherServices';
import Hero from '@/Components/Feauture/Hero/Hero';
import StepperArabic from '@/Components/Stepper/StepperArabic';


function page() {
  return (
    <>
    <Hero/>
    <div className={styles.Paper} >
      <div className={styles.Paper_g} >
      <div className={styles.partie3} >
          <Typography variant="h5" fontWeight={700} className={styles.Arabic2}>
          الخدمات الرئيسية
          <div className={styles.titleUnderline} />
          </Typography>

          <OtherServices/>
        </div>
 

   
      </div>
      <div className={styles.Paper_d} >
      <div className={styles.header} >
      <div className={styles.image_demande} >
                <Image className={styles.imagec} src="/img/icon/liste.png"
                    alt="msg" width={50}  height={50}/>
        </div>
        <Typography variant="h5" fontWeight={700} className={styles.titre_form}>
        خذ لحظة واتبع الخطوات للحصول على أسعار الشحن بسهولة، سيتم الرد عليكم في أقرب وقت ممكن.
        </Typography>

       </div>

       <StepperArabic/>
      </div>
    </div>

    </>
  )
}

export default page