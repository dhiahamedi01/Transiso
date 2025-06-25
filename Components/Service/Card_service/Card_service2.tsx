"use client";

import React from "react";
import Link from "next/link";
import styles from "./Card_service.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

function RedLineWithAnimatedArrow() {
  return (
    <div className={styles.redLineWrapper}>
      <DoubleArrowIcon sx={{ fontSize: "30px" }} className={styles.animatedArrow} />
    </div>
  );
}

const services = [
  { title: "قطع غيار سيارات", slug: "2", image: "/img/service/img5.jpg" },
  { title: "آلات زراعية", slug: "6", image: "/img/service/img8.avif" },
  { title: "ملابس رجالية", slug: "7", image: "/img/service/img7.avif" },
  { title: "ملابس نسائية", slug: "8", image: "/img/service/img6.jpg" },
  { title: "شحن مفروشات واثاث من تركيا", slug: "1", image: "/img/service/img2.webp" },
  { title: "مستلزمات طبية", slug: "5", image: "/img/service/img9.avif" },
  { title: "منتجات تجميل وعناية", slug: "3", image: "/img/service/img4.jpg" },
  { title: "مواد غذائية معلبة", slug: "4", image: "/img/service/img3.webp" }

];

export default function CardService() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionSubheading}>نوفر خدمات شحن احترافية ومخصصة داخل تركيا</h4>
        <h2 className={styles.sectionHeading}>الخدمات الفرعية المتوفرة</h2>
        <RedLineWithAnimatedArrow />
      </div>

      <div className={styles.Liste_card}>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/Services/${service.slug}`}
            className={styles.card}
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          >
            <div className={styles.contenue}>
              <span className={styles.span}>{service.title}</span>
            </div>
            <div className={styles.description}>هذا هو وصف صغير يظهر عند المرور بالماوس</div>
          </Link>
        ))}
      </div>
    </>
  );
}
