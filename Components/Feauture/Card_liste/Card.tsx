'use client';
import React from 'react';
import Image from 'next/image';
import styles from './Card.module.css';
import WestIcon from '@mui/icons-material/West';

const Card = () => {
  return (
    <>
      <div className={styles.Liste_card}>
        <div className={styles.card} data-aos="fade-up">
          <div className={styles.contenue}>
            <Image
              className={styles.icon}
              src="/img/icon/cargo.svg"
              alt="cargo"
              width={80}
              height={80}
            />
            <span className={styles.span}>الشحن الجزئي</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>

        <div className={styles.card1} data-aos="fade-up" data-aos-delay="100">
          <div className={styles.contenue}>
            <Image
              className={styles.icon}
              src="/img/icon/departures.svg"
              alt="cargo"
              width={80}
              height={80}
            />
            <span className={styles.span}>الشحن الجوي</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>

        <div className={styles.card2} data-aos="fade-up" data-aos-delay="200">
          <div className={styles.contenue}>
            <Image
              className={styles.icon}
              src="/img/icon/cargo-ship.svg"
              alt="cargo"
              width={80}
              height={80}
            />
            <span className={styles.span}>الشحن البحري</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>

        <div className={styles.card3} data-aos="fade-up" data-aos-delay="300">
          <div className={styles.contenue}>
            <Image
              className={styles.icon}
              src="/img/icon/exhibitor.svg"
              alt="cargo"
              width={80}
              height={80}
            />
            <span className={styles.span}>الشحن البري</span>
          </div>
          <div className={styles.description}>
            هذا هو وصف صغير يظهر عند المرور بالماوس
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
