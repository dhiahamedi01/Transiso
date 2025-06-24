"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import styles from './Avis.module.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Testimonial {
  nom: string;
  poste: string;
  description: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    nom: 'سامي سليم',
    poste: 'مدير الخدمات اللوجستية',
    description:
      'قام Mon Transporteur بتبسيط عمليات النقل لدينا. المتابعة في الوقت الحقيقي تشكل ميزة كبيرة لشركتنا.',
    image: '/img/user.jpg',
    rating: 5,
  },
  {
    nom: 'أحمد الغربي',
    poste: 'مدير الأسطول',
    description:
      'أنصح بشدة باستخدام Mon Transporteur لسهولة استخدامه وخدمة العملاء الممتازة.',
    image: '/img/user2.jpg',
    rating: 5,
  },
  {
    nom: 'محمد بن علي',
    poste: 'مسؤول النقل',
    description:
      'قمنا بتقليل تكاليف النقل بفضل كفاءة Mon Transporteur. إنه خيار لا غنى عنه لأي شركة.',
    image: '/img/user3.jpg',
    rating: 5,
  },
  // Ajoute ici d'autres témoignages si tu veux
  {
    nom: 'ليلى بن عبد الله',
    poste: 'مديرة الموارد البشرية',
    description:
      'خدمة ممتازة وسهلة الاستخدام مع دعم متميز من الفريق.',
    image: '/img/user4.webp',
    rating: 4,
  },
  {
    nom: 'خالد محمود',
    poste: 'رئيس قسم النقل',
    description:
      'نظام متكامل يسهل علينا متابعة كل العمليات بدقة.',
    image: '/img/user5.jpg',
    rating: 5,
  },
];

const VISIBLE_CARDS = 3;

const Avis = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
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
        prev === 0 ? testimonials.length - VISIBLE_CARDS : prev - 1
      );
    });
  };
  
  const handleNext = () => {
    triggerAnimation(() => {
      setStartIndex((prev) =>
        prev + VISIBLE_CARDS >= testimonials.length ? 0 : prev + 1
      );
    });
  };
  

  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + VISIBLE_CARDS
  );

  // Pour gérer le cas où on arrive en fin et on a moins de 3 cartes
  if (visibleTestimonials.length < VISIBLE_CARDS) {
    visibleTestimonials.push(
      ...testimonials.slice(0, VISIBLE_CARDS - visibleTestimonials.length)
    );
  }

  return (
    <section className={styles.testimonials}>
      <div
        className={styles.title}
      >
        <div className={styles['bar-about']}>
          <div className={styles['sous-titre-testimonials']}>
            <StarIcon className={styles.filled} />&ensp;شهادات العملاء&ensp;
            <StarIcon className={styles.filled} />
          </div>
        </div>
        <h2 className={styles['section-title']}>
        <div className={styles.comment}>
         <Image className={styles.img_comment} src='/img/icon/comment.svg' alt="" width={40} height={40}/>&ensp;&ensp;
          تقييمات العملاء الحقيقية !&ensp;&ensp;
          <Image className={styles.img_comment} src='/img/icon/comment.svg' alt="" width={40} height={40}/>
        </div>
        </h2>
      </div>

      <div className={styles['slider-container']} >
      <button
  onClick={handleNext}
  className={styles['slider-button']}
  aria-label="Suivant"
>
  <ArrowForwardIcon />
</button>

        <div className={`${styles['Card-liste']} ${isAnimating ? styles.fade : styles['fade-in']}`}>
          {visibleTestimonials.map((t, index) => (
            <div key={t.nom} className={styles['testimonial-box']} >
              <div className={styles.user}>
                <Image
                  src={t.image}
                  alt={t.nom}
                  width={90}
                  height={90}
                  className={styles['img-user']}
                />
                <div className={styles['testimonials-poste']}>
                  <h3 className={styles['testimonials-nom']}>{t.nom}</h3>
                  <p className={styles['testimonials-sous-nom']}>{t.poste}</p>
                </div>
              </div>
              <p className={styles['description']}>{t.description}</p>
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
  aria-label="Précédent"
>
  <ArrowBackIcon />
</button>
      </div>
    </section>
  );
};

export default Avis;
