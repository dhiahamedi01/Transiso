'use client';
import React from 'react';
import Image from 'next/image';
import styles from './Service.module.css';


const Service = () => {
  return (
    <section className={styles['services-section']}>
      <div
        className={styles.service_tout}
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="300"
      >
        <div className={styles['Service-logistic']}>
          <div className={styles.part1}>
            <div className={styles['service-title']}>
            ضمان النقل الآمن !<br />
            والتسليم السريع
            </div>
            <div className={styles['footer-servcie']}>
              <button className={styles['service-btn']}><Image
        src="/img/icon/customer-service.svg"
        alt="customer"
        width={25}
        height={25}
      />&ensp; تواصل معنا</button>
            </div>
          </div>
          <div className={styles.part2}>
            <Image
              src="/img/delivery-men.png"
              alt="Delivery men"
              width={400}  
              height={300} 
              priority
            />
          </div>
        </div>

        <div className={styles['Service-etape']}>
  <div className={styles.etape1}>
    <div className={styles.icon}>
      <Image
        src="/img/icon/truck_icon.png"
        alt="رمز الشاحنة"
        width={40}
        height={40}
      />
    </div>
    <div className={styles['etape-text']}>
      <div className={styles['etape-titre']}>نقل البضائع</div>
      <div className={styles['etape-desc']}>
        نوفر لك نقلًا آمنًا وسريعًا لجميع بضائعك مع خدماتنا المميزة.
      </div>
    </div>
  </div>

  <div className={styles.etape2}>
    <div className={styles.icon}>
      <Image
        src="/img/icon/real-time.png"
        alt="التتبع الفوري"
        width={40}
        height={40}
      />
    </div>
    <div className={styles['etape-text']}>
      <div className={styles['etape-titre2']}>التتبع الفوري</div>
      <div className={styles['etape-desc2']}>
        تتبع حالة شحنتك في كل مرحلة من مراحل النقل.
      </div>
    </div>
  </div>

  <div className={styles.etape3}>
    <div className={styles.icon}>
      <Image
        src="/img/icon/service_client.png"
        alt="دعم العملاء"
        width={40}
        height={40}
      />
    </div>
    <div className={styles['etape-text']}>
      <div className={styles['etape-titre2']}>دعم على مدار الساعة</div>
      <div className={styles['etape-desc2']}>
        استفد من خدمة عملاء متاحة 24 ساعة طوال أيام الأسبوع.
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default Service;
