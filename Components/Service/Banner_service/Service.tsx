'use client';
import React from 'react';
import Image from 'next/image';
import styles from './Service.module.css';


const Service = () => {
  return (
    <section className={styles['services-section']}>
      <div
        className={styles.service_tout}
      >
        <div className={styles['Service-logistic']}>
          <div className={styles.part1}>
            <div className={styles['service-title']}>
            ضمان الشحن الآمن !<br />
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
      <div className={styles['etape-titre']}>خدمة الشحن</div>
      <div className={styles['etape-desc']}>
        نقدم لك حلول شحن موثوقة وآمنة تضمن وصول بضائعك بسرعة وكفاءة إلى وجهتها.
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
      <div className={styles['etape-titre2']}>تتبع مباشر</div>
      <div className={styles['etape-desc2']}>
        راقب شحنتك لحظة بلحظة من خلال نظام تتبع دقيق وسهل الاستخدام.
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
      <div className={styles['etape-titre2']}>دعم فني متواصل</div>
      <div className={styles['etape-desc2']}>
        فريق دعم متواجد على مدار الساعة لضمان تجربة شحن خالية من المتاعب.
      </div>
    </div>
  </div>
</div>


      </div>
    </section>
  );
};

export default Service;
