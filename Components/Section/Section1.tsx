'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Section.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const Section = () => {
  return (
    <div className={styles.about}>
      <div className={styles.block12} >
        <Image
          src="/img/about_img01.png"
          alt="about"
          width={500}
          height={500}
          style={{ height: 'auto', width: '100%', maxWidth: '500px' }}
        />
      </div>

      <div className={styles.block13} >
        <div className={styles.text}>
          <div className={styles.titre}>
            <h4 className={styles.section_title2}>الخدمات الفرعية</h4>
            <span className={styles.sous_titre}>
              هل تبحث عن خدمات شحن متخصصة في تركيا؟
            </span>
          </div>
          <p className={styles.desc}>
          على مدى سنوات من العمل في قطاع الخدمات اللوجستية في الدول العربية ومختلف أنحاء العالم، حرصت شركة ترانسيسو على تقديم خدمات شحن جوي وبحري متكاملة في تركيا، مع الالتزام بتلبية احتياجات العملاء بكفاءة واحترافية. وتسعى الشركة باستمرار إلى تعزيز مكانتها كشريك لوجستي موثوق ومفضل في هذا البلد، من خلال تقديم حلول عالية الجودة وخدمة متميزة.          </p>
        </div>
        <br />
        <div className={styles.liste2} >
          <div className={styles.partie1AR}>
            <ul>
              {[
                'خدمة عالية الجودة',
                'دعم فني على مدار الساعة',
                'خبرة تزيد عن 25 سنة',
                'رضا العملاء مضمون',
              ].map((item, index) => (
                <li key={index}>
                  <CheckCircleIcon style={{ color: '#E71D26', fontSize: '21px' }} />
                  &ensp;{item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.partie2}>
            <div className={styles['text-rating']}>
              <div className={styles['liste-user']}>
                {['avatar-1.jpg', 'avatar-2.jpg', 'avatar-3.jpg', 'avatar-7.jpg'].map((img, index) => (
                  <div className={styles.user} key={index}>
                    <Image
                      src={`/img/Avatar/${img}`}
                      alt={`user-${index + 1}`}
                      width={30}
                      height={30}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    style={{ color: '#fca208', marginRight: '5px', fontSize: '1.2rem' }}
                  />
                ))}
              </div>
              <span className={styles.text_mini}>4.7 (1,567 مراجعة من العملاء)</span>
            </div>
            <div className={styles.experience}>
              <div className={styles.nbr}>
                <span>25</span>
              </div>
              <div className={styles.anne}>
                <span>سنة خبرة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
