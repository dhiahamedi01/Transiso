'use client';

import React, { useState } from 'react';
import styles from './FAQ.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const faqData = [
  {
    question: 'ما هي خدمات الشحن الجوي التي تقدمها ترانسيسو؟',
    answer: 'توفر ترانسيسو خدمات شحن جوي سريعة وآمنة تشمل الاستلام من المصدر، تجهيز الوثائق، التخليص الجمركي، والتوصيل إلى مطار الوجهة أو مقر العميل، بالتعاون مع أهم شركات الطيران العالمية.',
  },
  {
    question: 'هل يمكن تتبع الشحنات الخاصة بي في الوقت الحقيقي؟',
    answer: 'نعم، توفر ترانسيسو نظام تتبع متطور يتيح لك متابعة حالة شحنتك لحظة بلحظة، من وقت الإرسال حتى التسليم النهائي، مع إشعارات فورية لأي تحديثات.',
  },
  {
    question: 'كيف تضمن ترانسيسو سلامة الشحنات؟',
    answer: 'نستخدم تغليفًا احترافيًا، وتقنيات مراقبة حديثة، بالإضافة إلى خيارات تأمين شاملة على الشحنات لضمان أقصى درجات الحماية ضد أي تلف أو فقدان.',
  },
  {
    question: 'ما هي المناطق التي تغطيها خدماتكم؟',
    answer: 'تغطي خدمات ترانسيسو معظم دول العالم عبر شبكة قوية من الشركاء الدوليين، مع إمكانية توصيل مباشر أو عبر مراكز لوجستية معتمدة، مما يضمن مرونة وتنوعاً في الحلول.',
  },
];

  

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0); // Premier élément ouvert par défaut

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className={styles.faqContainer}>
    
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={`${styles.faqHeader} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <span className={styles.icon}>
                {activeIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </span>
            </div>
            <div className={`${styles.faqAnswerWrapper} ${activeIndex === index ? styles.open : ''}`}>
              <div className={styles.faqAnswer}>
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
