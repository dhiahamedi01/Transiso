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
          <h1 className={styles.sectionHeading2}>خدمات الشحن البري بالشاحنات مع ترانسيسو</h1>

          <div className={styles.description}>
  يُعد الشحن البري من أهم وسائل النقل اللوجستي داخل تركيا وبين الدول المجاورة، نظراً لمرونته العالية وإمكانية الوصول المباشر إلى الوجهات دون الحاجة إلى محطات وسيطة أو وسائط نقل إضافية. إن القدرة على التنقل السريع والفعال عبر الطرق البرية تمنح العملاء ميزة كبيرة في توصيل البضائع إلى المناطق الحضرية والريفية على حد سواء، مع تقليل زمن التسليم والتكاليف اللوجستية.
</div>

<div className={styles.description}>
  تقدم ترانسيسو خدمات شحن بري احترافية ومتكاملة، مدعومة بأسطول واسع من الشاحنات الحديثة والمجهزة بأحدث تقنيات الأمان والسلامة، بما في ذلك الشاحنات المغلقة والمبردة والمسطحة، لتناسب جميع أنواع البضائع المختلفة مثل السلع الجافة، المواد القابلة للتلف، والبضائع ذات الأحجام الثقيلة والكبيرة. نحن نؤمن بأهمية الحفاظ على جودة البضائع وسلامتها طوال رحلة النقل، لذا نعمل بشكل دؤوب على تطبيق أعلى معايير الصيانة والفحص الدوري لجميع مركباتنا.
</div>

<div className={styles.description}>
  تشمل خدماتنا نقل البضائع داخلياً ضمن جميع الولايات التركية، وكذلك النقل الدولي إلى الدول المجاورة مثل العراق، سوريا، جورجيا، بلغاريا، وغيرها، مع تقديم حلول مخصصة تناسب متطلبات كل عميل ونوع شحنته. نعتمد على نظام متطور لتتبع الشحنات لحظياً، مما يتيح لعملائنا الاطلاع المستمر على حالة بضائعهم وضمان وصولها في الوقت المحدد.
</div>

<div className={styles.description}>
  بالإضافة إلى النقل، نحرص في ترانسيسو على تقديم خدمات متكاملة تشمل تجهيز كافة الوثائق والإجراءات الجمركية اللازمة، والتنسيق مع الجهات الرسمية لتسهيل عملية التخليص دون أي تأخير. كما نوفر تغطية تأمينية شاملة على البضائع، مما يضمن حماية شاملة ضد أي خسائر أو أضرار محتملة أثناء النقل.
</div>

<div className={styles.description}>
  نفخر بفريق عملنا المتخصص من السائقين المهرة وموظفي الدعم اللوجستي، الذين يمتلكون خبرات واسعة في مجال النقل البري ويحرصون على تقديم خدمات عالية الجودة مع الالتزام التام بمواعيد التسليم ومتطلبات السلامة. كما نعمل باستمرار على تطوير عملياتنا وتحسينها باستخدام أحدث التقنيات وأنظمة الإدارة الحديثة، لضمان تقديم أفضل تجربة لعملائنا.
</div>

<div className={styles.description}>
  سواء كانت شحناتكم كبيرة الحجم، أو حساسة تحتاج إلى عناية خاصة، أو تسليم عاجل يتطلب سرعة ومرونة، فإن ترانسيسو توفر لكم الحلول المثلى التي تلبي جميع احتياجاتكم اللوجستية بفعالية واقتصادية. اختاروا ترانسيسو لشحناتكم البرية وتمتعوا بثقة الخدمات العالية، الدعم المستمر، والأسعار التنافسية.
</div>


          <div className={styles.Card}>
            <div className={styles.sous_Card1}>
              <div className={styles.texts_card}>
                <div className={styles.titre_card}>
                  <LocalShippingIcon className={styles.icon_card} />
                  مرونة وسرعة في التسليم
                </div>
                <div className={styles.desc_card}>
                  نقدم حلول شحن بري مرنة تشمل خدمات التحميل، التفريغ، والتوصيل المباشر داخل المدن وخارجها، مع الالتزام الكامل بالجداول الزمنية.
                </div>
              </div>
            </div>

            <div className={styles.sous_Card1}>
              <div className={styles.texts_card}>
                <div className={styles.titre_card}>
                  <SecurityIcon className={styles.icon_card} />
                  سلامة ومتابعة دقيقة
                </div>
                <div className={styles.desc_card}>
                  نعتمد على أنظمة تتبع متقدمة ونوفر تغطية تأمينية كاملة، لضمان حماية الشحنات ومتابعة موقعها بدقة طوال الرحلة البرية.
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
