'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../Question/QuestionCardList.module.css';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
  const [loading, setLoading] = useState<boolean>(true);
  const divRef = useRef<HTMLDivElement>(null);

  const lang = i18n.language as 'en' | 'tr' | 'ar';
  const isArabic = lang === 'ar';

  // Met à jour la direction globale du document HTML
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    }
  }, [isArabic]);

  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/faq');
        const data = await res.json();
        setFaqData(data);
      } catch (error) {
        console.error('Erreur FAQ:', error);
      } finally {
        setLoading(false);
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
      <div className={styles.headerText}>
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
            {loading ? (
              <Box display="flex" justifyContent="center" py={5}>
                <CircularProgress />
              </Box>
            ) : filteredFaqs.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem' }}>
                {lang === 'ar' ? 'لا توجد أسئلة.' : lang === 'tr' ? 'Soru yok.' : 'No questions found.'}
              </p>
            ) : (
              filteredFaqs.map(({ id, question, answer }) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
