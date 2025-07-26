'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FAQ.module.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Faq() {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const rawQuestions = t('faq.questions', { returnObjects: true });
  const questions = Array.isArray(rawQuestions) ? rawQuestions : [];

  const rawAnswers = t('faq.answers', { returnObjects: true });
  const answers = Array.isArray(rawAnswers) ? rawAnswers : [];

  return (
    <div className={styles.faqContainer} dir={direction}>
      <div className={styles.faqList}>
        {questions.map((question, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={`${styles.faqHeader} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {question}
              <span className={styles.icon}>
                {activeIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </span>
            </div>
            <div className={`${styles.faqAnswerWrapper} ${activeIndex === index ? styles.open : ''}`}>
              <div className={styles.faqAnswer}>{answers[index]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
