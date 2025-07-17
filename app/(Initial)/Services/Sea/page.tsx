'use client'

import Hero_service from '@/Components/Feauture/Hero/Hero_service'
import React from 'react'
import styles from '../Service.module.css'
import Image from 'next/image'
import FAQ from '@/Components/FAQ/FAQ'
import LocalShippingIcon from '@mui/icons-material/LocationOn'
import SecurityIcon from '@mui/icons-material/SupportAgent'
import ContactInfoCard from '@/Components/Service/Side_card/ContactInfoCard'
import { Typography } from '@mui/material'
import OtherServices from '@/Components/Service/Side_card/OtherServices'

function page() {
  return (
    <>
      <Hero_service />
      <div className={styles.Paper}>
        <div className={styles.Paper_g}>
          <div className={styles.partie3}>
            <Typography variant="h5" fontWeight={700} className={styles.Arabic2}>
              الخدمات الرئيسية
              <div className={styles.titleUnderline} />
            </Typography>

            <OtherServices />
          </div>

          <div className={styles.partie1}>
            <div className={styles.contenue}>
              <div className={styles.image_demande}>
                <Image
                  className={styles.imagec}
                  src="/img/Background/quote.svg"
                  alt="msg"
                  width={50}
                  height={50}
                />
              </div>
              <h2 className={styles.titre_demande}>طلب المساعدة</h2>
              <div className={styles.Description_demande}>
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

        <div className={styles.Paper_d}>
          <h1 className={styles.sectionHeading2}>خدمات الشحن البحري مع ترانسيسو</h1>

          <div className={styles.description}>
  يُعتبر الشحن البحري من أكثر حلول النقل كفاءةً واقتصاديةً لنقل البضائع على نطاق واسع وعالمي، حيث يوفر قدرة عالية على استيعاب كميات ضخمة من البضائع بتكلفة تنافسية. من خلال شبكة واسعة من الموانئ التركية والدولية التي تتعاون معها ترانسيسو، نقدم لعملائنا خدمات شحن بحري موثوقة، دقيقة، وآمنة تلبي احتياجات الشركات الكبيرة والصغيرة، بالإضافة إلى الأفراد.
</div>

<div className={styles.description}>
  سواءً كنتم بحاجة إلى شحن حاويات كاملة (Full Container Load - FCL) أو شحنات مجمعة (Less than Container Load - LCL)، يعمل فريقنا المحترف على إدارة كافة مراحل العملية اللوجستية بكل دقة واحترافية. بدءًا من استلام البضائع من المصدر، تجهيز الوثائق اللازمة، التخليص الجمركي السريع، مرورًا بحجز السفن، وصولاً إلى التسليم النهائي في الوجهة المحددة. نعتمد على أحدث الأنظمة التقنية في مراقبة وتتبع الشحنات لحظة بلحظة، مما يضمن الشفافية والاطمئنان التام للعملاء طوال فترة النقل.
</div>

<div className={styles.description}>
  بالإضافة إلى ذلك، نوفر خيارات تأمينية متعددة مرنة تحمي البضائع من المخاطر المحتملة أثناء الشحن، مع فريق دعم متاح على مدار الساعة للتعامل مع أي استفسارات أو مستجدات. تهدف ترانسيسو إلى تقديم حلول متكاملة تجعل تجربة الشحن البحري سهلة وآمنة، مع التزام صارم بالمواعيد وجودة الخدمة لضمان رضا العملاء وتحقيق أهداف أعمالهم بنجاح.
</div>


          <div className={styles.Card}>
            <div className={styles.sous_Card1}>
              <div className={styles.texts_card}>
                <div className={styles.titre_card}>
                  <LocalShippingIcon className={styles.icon_card} />
                  خدمات شاملة تناسب احتياجاتك
                </div>
                <div className={styles.desc_card}>
                  نحن نلبي مختلف أنواع الشحنات التجارية والشخصية، مع إمكانية تخصيص حلول الشحن حسب نوع البضاعة، المدة الزمنية، والميزانية.
                </div>
              </div>
            </div>

            <div className={styles.sous_Card1}>
              <div className={styles.texts_card}>
                <div className={styles.titre_card}>
                  <SecurityIcon className={styles.icon_card} />
                  موثوقية وأمان عالي المستوى
                </div>
                <div className={styles.desc_card}>
                  نعتمد في ترانسيسو على معايير عالمية في التعامل مع الشحنات، ونوفر تغطية تأمينية كاملة لحماية البضائع من أي مخاطر محتملة أثناء الرحلة البحرية.
                </div>
              </div>
            </div>
          </div>

          <FAQ />
        </div>
      </div>
    </>
  )
}

export default page
