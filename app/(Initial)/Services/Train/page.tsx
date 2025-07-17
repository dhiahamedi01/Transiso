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
          <h1 className={styles.sectionHeading2}>خدمات الشحن بالقطار مع ترانسيسو</h1>

          <div className={styles.description}>
  يُعتبر الشحن بالقطار من أبرز وسائل النقل التي تجمع بين الفعالية الاقتصادية والسرعة في نقل البضائع لمسافات طويلة داخل تركيا وبين الدول المجاورة. مع التطور الكبير في شبكة السكك الحديدية التركية وتوسع خطوط النقل، توفر هذه الوسيلة حلاً متكاملاً للشركات والأفراد الراغبين في تقليل تكاليف النقل مع الحفاظ على مستوى عالٍ من الأمان والدقة في مواعيد التسليم. كما أن الشحن بالقطار يتيح سهولة نقل أنواع مختلفة من البضائع، بما في ذلك البضائع الثقيلة والحاويات الكبيرة، مع مرونة كبيرة في التخطيط اللوجستي مقارنة بوسائل النقل البرية التقليدية.
</div>

<div className={styles.description}>
  في شركة ترانسيسو، نقدم حلول شحن بالقطار مصممة خصيصًا لتلبية احتياجات السوق المحلي والدولي. تشمل خدماتنا تنسيق كافة مراحل النقل بدءًا من استلام الشحنة من المخازن، مرورًا بعمليات التحميل والتفريغ في محطات القطارات، مرورًا بإجراءات التخليص الجمركي المعقدة والتي نقوم بتبسيطها لضمان سرعة التدفق اللوجستي، وصولًا إلى التسليم النهائي في الموقع المطلوب بدقة عالية. نعتمد على أحدث أنظمة تتبع الشحنات عبر الأقمار الصناعية والتقنيات الرقمية لمراقبة حالة الشحنة في الوقت الفعلي، مما يسمح لعملائنا بالحصول على تحديثات مستمرة وتقارير مفصلة لضمان الشفافية والموثوقية في كل خطوة من خطوات النقل.
</div>

<div className={styles.description}>
  بالإضافة إلى ذلك، تلتزم ترانسيسو بتوفير حلول تأمينية شاملة لحماية البضائع من كافة المخاطر المحتملة، بما في ذلك التلف، الفقدان، أو التأخير، مما يضمن راحة بال كاملة لعملائنا. كما يرافق خدماتنا فريق دعم فني متخصص متاح على مدار الساعة لتقديم الاستشارات والدعم اللازمين في جميع جوانب الشحن بالقطار. بفضل خبرتنا الواسعة وشبكتنا القوية من الشركاء المحليين والدوليين، نضمن تقديم خدمات نقل عالية الجودة تلبي تطلعات عملائنا وتدعم نمو أعمالهم في الأسواق المتغيرة باستمرار.
</div>


          <div className={styles.Card}>
            <div className={styles.sous_Card1}>
              <div className={styles.texts_card}>
                <div className={styles.titre_card}>
                  <LocalShippingIcon className={styles.icon_card} />
                  نقل اقتصادي وفعال
                </div>
                <div className={styles.desc_card}>
                  نوفر خدمات شحن بالقطار منخفضة التكلفة للمسافات الطويلة، مع مرونة عالية في جدولة الرحلات واختيار خطوط السير المناسبة.
                </div>
              </div>
            </div>

            <div className={styles.sous_Card1}>
              <div className={styles.texts_card}>
                <div className={styles.titre_card}>
                  <SecurityIcon className={styles.icon_card} />
                  سلامة مضمونة للشحنات
                </div>
                <div className={styles.desc_card}>
                  نحرص على مراقبة عمليات الشحن من البداية حتى النهاية، ونقدم تغطية تأمينية شاملة تضمن راحة بال العملاء.
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
