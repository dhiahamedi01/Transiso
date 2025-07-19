'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './Avis.module.css';

interface Review {
  id: number;
  name: string;
  position: string;
  comment: string;
  image: string;
  rating: number;
}

const VISIBLE_CARDS = 3;

const Avis = () => {
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
        prev === 0 ? reviews.length - VISIBLE_CARDS : prev - 1
      );
    });
  };

  const handleNext = () => {
    triggerAnimation(() => {
      setStartIndex((prev) =>
        prev + VISIBLE_CARDS >= reviews.length ? 0 : prev + 1
      );
    });
  };

  const visibleReviews = reviews.slice(startIndex, startIndex + VISIBLE_CARDS);

  if (visibleReviews.length < VISIBLE_CARDS) {
    visibleReviews.push(
      ...reviews.slice(0, VISIBLE_CARDS - visibleReviews.length)
    );
  }

  if (loading) return <p style={{ textAlign: 'center' }}>جار التحميل...</p>;
  if (!reviews.length) return <p style={{ textAlign: 'center' }}>لا توجد شهادات حالياً.</p>;

  return (
    <section className={styles.testimonials}>
      <div className={styles.title}>
        <div className={styles['bar-about']}>
          <div className={styles['sous-titre-testimonials']}>
            <StarIcon className={styles.filled} />&ensp;شهادات العملاء&ensp;
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
            تقييمات العملاء الحقيقية !
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
          aria-label="التالي"
        >
          <ArrowForwardIcon />
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
                <div className={styles['testimonials-poste']}>
                  <h3 className={styles['testimonials-nom']}>{t.name}</h3>
                  <p className={styles['testimonials-sous-nom']}>{t.position}</p>
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
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className={styles['slider-button']}
          aria-label="السابق"
        >
          <ArrowBackIcon />
        </button>
      </div>
    </section>
  );
};

export default Avis;
