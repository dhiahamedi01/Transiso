import Hero_service from '@/Components/Feauture/Hero/Hero_service'
import React from 'react'
import styles from '../Service.module.css'
import Image from 'next/image';
import FAQ from '@/Components/FAQ/FAQ';
import LocalShippingIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/SupportAgent';
import OtherServices from '@/Components/Service/Side_card/OtherServices';
import ContactInfoCard from '@/Components/Service/Side_card/ContactInfoCard';
import { Typography} from "@mui/material";

function page() {
  return (
    <>
    <Hero_service/>
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

        <h1 className={styles.sectionHeading2} >
        خدمات الشحن الجوي المتقدمة مع ترانسيسو
        </h1>
        <div className={styles.description}>
        يُعد نظام الشحن الجوي في تركيا من أكثر الأنظمة تطوراً وفعالية في مجال الخدمات اللوجستية، حيث يوفر للعملاء خيارات مثالية للاستيراد السريع والآمن من تركيا. وتكمن أهمية الشحن الجوي في اختصار مدة التسليم مقارنةً بوسائل الشحن الأخرى، إضافةً إلى مرونته في التعامل مع شحنات ذات أحجام وكميات مختلفة، مع الحفاظ على تكلفة تنافسية تُميز تركيا عن العديد من الدول الأخرى.        </div>
        <div className={styles.description}>
        وقد تم تجهيز المطارات التركية بأحدث أنظمة وتقنيات الشحن العالمية، مما ساهم بشكل ملحوظ في ازدهار هذا القطاع في السنوات الأخيرة. وفي هذا السياق، تميزت شركة ترانسيسو في إسطنبول كواحدة من أبرز شركات الشحن الجوي، حيث قدّمت من خلال خبرتها الواسعة حلولاً ذكية ومتكاملة لنقل البضائع بين تركيا ومختلف دول العالم.

توفر ترانسيسو خدمات شحن جوي مرنة تتناسب مع احتياجات مختلف الأنشطة التجارية، بدءاً من استلام الشحنة من المصدر وحتى تسليمها في مطار الوجهة أو مباشرة في مقر العميل. وتشمل خدماتنا إعداداً دقيقاً لكافة الوثائق اللازمة لعمليات الشحن والتخليص الجمركي، بالإضافة إلى تقديم ترتيبات شاملة للتأمين على البضائع لضمان أقصى درجات الأمان.        </div>
<div className={styles.Card}>
  <div className={styles.sous_Card1}>
    <div className={styles.texts_card}>
      <div className={styles.titre_card}>
        <LocalShippingIcon className={styles.icon_card} />
        حلول شحن متكاملة
      </div>
      <div className={styles.desc_card}>
        نقدم في ترانسيسو خدمات شحن جوي مرنة وموثوقة، تشمل استلام البضائع، التعبئة، التوثيق، والتوصيل إلى مختلف أنحاء العالم.
      </div>
    </div>
  </div>

  <div className={styles.sous_Card1}>
    <div className={styles.texts_card}>
      <div className={styles.titre_card}>
        <SecurityIcon className={styles.icon_card} />
        أمان مضمون للشحنات
      </div>
      <div className={styles.desc_card}>
        نعتمد في ترانسيسو على أنظمة مراقبة دقيقة، وتغطية تأمينية شاملة، للحفاظ على سلامة شحناتكم من المصدر إلى الوجهة.
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