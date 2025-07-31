'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './QuestionCardList.module.css';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useTranslation } from 'react-i18next';

type FaqItem = {
  id: number;
  faq_id: number;
  lang: string;
  question: string;
  answer: string;
};

function RedLineWithAnimatedArrow() {
  return (
    <div className={styles.redLineWrapper}>
      <DoubleArrowIcon sx={{ fontSize: '30px' }} className={styles.animatedArrow} />
    </div>
  );
}

const FaqSection: React.FC = () => {
  const { i18n } = useTranslation();
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const lang = i18n.language as 'en' | 'tr' | 'ar';
  const isArabic = lang === 'ar';

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch('/api/faq');
        const data = await res.json();
        setFaqData(data);
      } catch (error) {
        console.error('Erreur FAQ:', error);
      }
    };
    fetchFAQs();
  }, []);

  const toggleAnswer = (id: number) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  const filteredFaqs = faqData.filter(item => item.lang === lang);

  const arabicStyle = isArabic
    ? {
        fontFamily: "'Noto Kufi Arabic', sans-serif",
        direction: 'rtl' as const,
        textAlign: 'right' as const,
      }
    : {
        direction: 'ltr' as const,
      };

  return (
    <section className={styles.faqSection} style={arabicStyle}>
      {/* Titre et sous-titre dynamiques */}
      <div className={styles.headerText}>
        <h2 className={styles.title}>
          {lang === 'ar'
            ? 'الأسئلة الشائعة'
            : lang === 'tr'
            ? 'Sıkça Sorulan Sorular'
            : 'Frequently Asked Questions'}
        </h2>
        <p className={styles.subtitle}>
          {lang === 'ar'
            ? 'نقدم لك هنا إجابات على أكثر الأسئلة شيوعًا حول خدماتنا.'
            : lang === 'tr'
            ? 'Hizmetlerimiz hakkında sık sorulan soruların cevaplarını burada bulabilirsiniz.'
            : 'Here you’ll find answers to the most common questions about our services.'}
        </p>
        <RedLineWithAnimatedArrow />
      </div>

      <div className={styles.header}>
        <div className={styles.textContent} ref={divRef}>
          <div className={styles.questionsList}>
          {filteredFaqs.slice(0, 5).map(({ id, question, answer }) => (

              <div
                key={id}
                className={`${styles.questionItem} ${activeId === id ? styles.active : ''}`}
                onClick={() => toggleAnswer(id)}
              >
                <div className={styles.questionHeader}>
                  <span className={styles.questionText}>{question}</span>
                  <span className={styles.toggleIcon}>
                    {activeId === id ? '−' : '+'}
                  </span>
                </div>
                <div
                  className={styles.answerWrapper}
                  style={{ maxHeight: activeId === id ? '500px' : '0' }}
                >
                  <div className={styles.answer}>{answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/img/Entshars-FAQ.png"
            alt="Illustration FAQ"
          />
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        {/* Optional "voir plus" button */}
      </div>
    </section>
  );
};

export default FaqSection;
