
import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import styles from './HeroSecion.module.css'; 

const HeroSection = () => {
  return (
    <>
    <div className={styles.heroContainer}>
       <div className={styles.backgroundImage}>
      <Image
        src="/img/banner1.jpg" 
        alt="Air freight cargo"
        width={190} height={60} 
        className={styles.img}
      />
    </div>
      <div className={styles.contentBox} dir="rtl"> 
        <h1 className={styles.title}>
          هل ترغب بإرسال شحنة جوية؟
        </h1>
        <p className={styles.description}>
        تقدم ترانسيسو لوجستيك خدمات الشحن الجوي السريع من إسطنبول وتركيا إلى مختلف مدن وعواصم العالم، مهما كانت نوعية الشحنات. يتولى فريق ترانسيسو استلام الشحنات وتجميعها وإنهاء الوثائق والإجراءات اللازمة لتصل بسرعة وتكلفة مناسبة إلى وجهتكم، مما يضمن توريدًا سريعًا من المصانع والشركات في تركيا.

ندرك في ترانسيسو أهمية الوقت والدقة في الشحن الجوي، لذلك لا تترددوا بالتواصل معنا للاستفسار عن خدماتنا المتنوعة.        </p>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            endIcon={<ArrowBackIcon />} 
            className={styles.btn}
          >
            استكشف الآن
          </Button>
        </div>
      </div>
    </div>
    <div className={styles.heroContainer2}>
      <div className={styles.contentBox} dir="rtl"> 
        <h1 className={styles.title}>
        هل ترغب بارسال حاوية بحرية؟
        </h1>
        <p className={styles.description}>
        نحن في ترانسيسو لوجستيك، نوفر خدمات الشحن البحري من جميع المدن التركية إلى الدول العربية، ودول الاتحاد الأوروبي، ومختلف أنحاء العالم، عبر حاويات بحرية بمقاسات وأنواع متعددة.

يكفيكم التواصل معنا وتحديد معلومات الشحنة، نوع الحاوية، وموقع التحميل والوجهة، ليتولى فريقنا إجراءات الشحن وتنسيق الاستلام من المورد بكفاءة واحترافية تلبي متطلبات أعمالكم.
       </p>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            endIcon={<ArrowBackIcon />} 
            className={styles.btn}
          >
            استكشف الآن
          </Button>
        </div>
      </div>
      <div className={styles.backgroundImage}>
      <Image
        src="/img/Slide/hero5.jpg" 
        alt="Air freight cargo"
        width={190} height={60} 
        className={styles.img}
      />
    </div>
    </div>
    </>
  );
};

export default HeroSection;