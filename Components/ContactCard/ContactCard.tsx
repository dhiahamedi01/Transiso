'use client';

import React from 'react';
import styles from './ContactCard.module.css';
import Image from 'next/image';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contactCard}>
        <div className={styles.topSection}>
          <Image
            src="/img/service-details-sidebar-img.png"
            alt="Support"
            width={200}
            height={150}
            className={styles.contactImage}
          />
        </div>

        <div className={styles.orangeBar}>
          <div className={styles.iconWrapper}>
            <PhoneIcon sx={{ color: '#ffffff', fontSize: 18 }} />
          </div>
        </div>

        <div className={styles.bottomSection}>
          <h3 className={styles.phoneNumber}>5377671027 (90 +)</h3>
          <p className={styles.helpText}>
            إذا كنت بحاجة إلى أي مساعدة<br />تواصل معنا
          </p>
          <button className={styles.callButton}>اتصل الآن !</button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
