import React from 'react'
import styles from '../Service.module.css'
import Image from 'next/image';
import FAQ from '@/Components/FAQ/FAQ';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import OtherServices from '@/Components/Service/Side_card/OtherServices';
import ContactInfoCard from '@/Components/Service/Side_card/ContactInfoCard';
import { Typography} from "@mui/material";


function page() {
  return (
    <>
    <div className={styles.Paper} >
      <div className={styles.Paper_g} >
      <div className={styles.partie3} >
          <Typography variant="h5" fontWeight={700} className={styles.Arabic2}>
          الخدمات الرئيسية
          <div className={styles.titleUnderline} />
          </Typography>

          <OtherServices/>
        </div>
        <div className={styles.partie1} >
          <div className={styles.contenue} >
              <div className={styles.image_demande} >
              <Image className={styles.imagec} src="/img/Background/quote.svg"
                alt="msg" width={50}  height={50}/>
              </div>
              <h2 className={styles.titre_demande} >
              طلب المساعدة
              </h2>
              <div className={styles.Description_demande} >
              لطلب المساعدة يرجى النقر على استفسر الآن وملء المعلومات المطلوبة
              </div>
              <div className={styles.button_demande}>
                <button className={styles.btn_arabic}>
                <Image 
                    src="/img/Background/email.svg" 
                    alt="icon" 
                    className={styles.btn_icon} 
                    width={20} 
                    height={20} 
                  />
                  استفسر الآن
                </button>
              </div>
          </div>
          <div className={styles.bottom_image_container}>
          <Image
            src="/img/Background/user.png"
            alt="footer decoration"
            width={220}
            height={250}
            className={styles.bottom_image}
          />
        </div>
        </div>

   
      </div>
      <div className={styles.Paper_d} >
        <div className={styles.Image} >
          <Image className={styles.imagec} src="/img/Service/homme.avif"
          alt="cargo" width={900}  height={530}/>
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
        <div className={styles.Card}>
          <div className={styles.sous_Card1}>
            <div className={styles.texts_card}>
              <div className={styles.titre_card}><LocationOnIcon className={styles.icon_card} />تتبع بسيط وفعال</div>
              <div className={styles.desc_card}>
                أنظمة تتبع متقدمة، تحليلات لحظية، وخبراء لوجستيين متخصصين لضمان سهولة إدارة الشحنات.
              </div>
            </div>
          </div>

          <div className={styles.sous_Card1}>
            <div className={styles.texts_card}>
              <div className={styles.titre_card}><SupportAgentIcon className={styles.icon_card} />دعم سريع</div>
              <div className={styles.desc_card}>
                نحن متخصصون في تنسيق المستودعات، التوصيل النهائي، والتحكم في المخزون بكفاءة عالية.
              </div>
            </div>
          </div>
       </div>



        <FAQ/>
      </div>
    </div>

    </>
  )
}

export default page