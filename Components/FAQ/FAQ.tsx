'use client';

import React, { useState } from 'react';
import styles from './FAQ.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const faqData = [
    {
      question: 'ما هي النقل واللوجستيات؟',
      answer: 'النقل واللوجستيات تشمل تخطيط وتنفيذ ومراقبة حركة وتخزين البضائع لضمان وصول المنتجات إلى العملاء بكفاءة. وهي تُعتبر جزءًا حيويًا من سلسلة التوريد، حيث تساهم في تقليل التكاليف وتحسين مستوى الخدمة.',
    },
    {
      question: 'ما هي أنواع وسائل النقل الرئيسية؟',
      answer: 'الأنواع الرئيسية تشمل النقل البري، الجوي، البحري والسكك الحديدية. يختلف اختيار الوسيلة حسب نوع البضائع، التكلفة، والوقت المطلوب للتوصيل. غالبًا ما يتم استخدام مزيج منها لتحقيق الكفاءة.',
    },
    {
      question: 'ما هو إدارة سلسلة الإمداد؟',
      answer: 'هي إدارة تدفق السلع والخدمات من المورد إلى المستهلك، وتشمل جميع العمليات التي تحول المواد الخام إلى منتجات نهائية. تتطلب تنسيقًا دقيقًا بين الموردين والمصنعين والموزعين لضمان توفر المنتجات بالجودة والكمية المناسبة في الوقت المناسب.',
    },
    {
      question: 'ما هو الشحن التوكيل؟',
      answer: 'هو عملية تنسيق شحن البضائع نيابة عن المرسل، حيث يقوم وكيل الشحن بترتيب جميع الإجراءات اللوجستية مثل الحجز، التوثيق، التأمين، والتخليص الجمركي. يهدف هذا إلى تسهيل وتسريع عملية الشحن وتقليل العبء على العميل.',
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
