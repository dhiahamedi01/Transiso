"use client";

import React from "react";
import Link from "next/link";
import styles from "./Card_service.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useTranslation } from "react-i18next";

function RedLineWithAnimatedArrow() {
  return (
    <div className={styles.redLineWrapper}>
      <DoubleArrowIcon sx={{ fontSize: "30px" }} className={styles.animatedArrow} />
    </div>
  );
}

const services = [
  { titleKey: "2", slug: "2", image: "/img/Service/img5.jpg" },
  { titleKey: "6", slug: "6", image: "/img/Service/img8.avif" },
  { titleKey: "7", slug: "7", image: "/img/Service/img7.avif" },
  { titleKey: "8", slug: "8", image: "/img/Service/img6.jpg" },
  { titleKey: "1", slug: "1", image: "/img/Service/img2.webp" },
  { titleKey: "5", slug: "5", image: "/img/Service/img9.avif" },
  { titleKey: "3", slug: "3", image: "/img/Service/img4.jpg" },
  { titleKey: "4", slug: "4", image: "/img/Service/img3.webp" }
];

export default function CardService() {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionSubheading}>{t("sub_services.subheading")}</h4>
        <h2 className={styles.sectionHeading}>{t("sub_services.heading")}</h2>
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
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
            }}
          >
            <div className={styles.contenue}>
              <span className={styles.span}>{t(`sub_services.services.${service.titleKey}`)}</span>
            </div>
            <div className={styles.description}>{t("sub_services.description")}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
