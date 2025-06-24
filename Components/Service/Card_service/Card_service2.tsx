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
  { title: "ماكينات تعبئة وتغليف", slug: "1" },
  { title: "قطع غيار سيارات", slug: "2" },
  { title: "منتجات تجميل وعناية", slug: "3" },
  { title: "مواد غذائية معلبة", slug: "4" },
  { title: "مستلزمات طبية", slug: "5" },
  { title: "آلات زراعية", slug: "6" },
  { title: "ملابس رجالية", slug: "7" },
  { title: "ملابس نسائية", slug: "8" }
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
        {services.map((service, index) => (
          <Link
            key={service.slug}
            href={`/Services/${service.slug}`}
            className={styles.card}
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
