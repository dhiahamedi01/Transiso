'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './Avis.module.css';
import { useTranslation } from 'react-i18next';

interface Review {
  id: number;
  name: string;
  position: string;
  comment: string;
  image: string;
  rating: number;
  lang: string;
}

const VISIBLE_CARDS = 3;

const Avis = () => {
  const { t, i18n } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des avis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(r => r.lang === i18n.language);

  const triggerAnimation = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    triggerAnimation(() => {
      setStartIndex((prev) =>
        prev === 0 ? Math.max(filteredReviews.length - VISIBLE_CARDS, 0) : prev - 1
      );
    });
  };

  const handleNext = () => {
    triggerAnimation(() => {
      setStartIndex((prev) =>
        prev + VISIBLE_CARDS >= filteredReviews.length ? 0 : prev + 1
      );
    });
  };

  const visibleReviews = filteredReviews.slice(startIndex, startIndex + VISIBLE_CARDS);

  const isArabic = i18n.language === 'ar';

  if (loading) return <p style={{ textAlign: 'center' }}>{t('loading') || 'جار التحميل...'}</p>;
  if (!filteredReviews.length) return <p style={{ textAlign: 'center' }}>{t('no_reviews') || 'لا توجد شهادات حالياً.'}</p>;

  return (
    <section
      className={styles.testimonials}
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{ textAlign: isArabic ? 'right' : 'left' }}
    >
      <div className={styles.title}>
        <div className={styles['bar-about']}>
          <div className={styles['sous-titre-testimonials']}>
            <StarIcon className={styles.filled} />&ensp;{t('rating_client')}&ensp;
            <StarIcon className={styles.filled} />
          </div>
        </div>

        <h2 className={styles['section-title']}>
          <div className={styles.comment}>
            <Image
              className={styles.img_comment}
              src="/img/icon/comment.svg"
              alt=""
              width={40}
              height={40}
            />
            &ensp;&ensp;
            {t('vrai_review')}
            &ensp;&ensp;
            <Image
              className={styles.img_comment}
              src="/img/icon/comment.svg"
              alt=""
              width={40}
              height={40}
            />
          </div>
        </h2>
      </div>

      <div className={styles['slider-container']}>
        <button
          onClick={handleNext}
          className={styles['slider-button']}
          aria-label={t('next') || 'التالي'}
        >
          {isArabic ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        </button>

        <div className={`${styles['Card-liste']} ${isAnimating ? styles.fade : styles['fade-in']}`}>
          {visibleReviews.map((t) => (
            <div key={t.id} className={styles['testimonial-box']}>
              <div className={styles.user}>
                <Image
                  src={t.image}
                  alt={t.name}
                  width={90}
                  height={90}
                  className={styles['img-user']}
                />
             <div className={styles['testimonials-poste']}
                    style={{
                      textAlign: isArabic ? 'right' : 'left',
                      direction: isArabic ? 'rtl' : 'ltr',
                    }}
                  >
                <h3 className={ isArabic
                                ? styles['testimonials-nom']
                                : styles['testimonials-nom-ltr'] }>{t.name}</h3>
                <p className={ isArabic
                                ? styles['testimonials-sous-nom']
                                : styles['testimonials-sous-nom-ltr'] }>
                  {t.position}</p>
              </div>

              </div>
              <p className={styles['description']}>{t.comment}</p>
              <div className={styles.footer}>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) =>
                    i < t.rating ? (
                      <StarIcon key={i} className={styles.filled} />
                    ) : (
                      <StarBorderIcon key={i} />
                    )
                  )}
                </div>
                <div className={styles['testimonial-footer-img']}></div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className={styles['slider-button']}
          aria-label={t('prev') || 'السابق'}
        >
          {isArabic ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </button>
      </div>
    </section>
  );
};

export default Avis;
