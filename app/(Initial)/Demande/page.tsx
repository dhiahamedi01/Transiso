"use client"; 
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Demande.module.css";
import Image from "next/image";
import { Typography } from "@mui/material";
import OtherServices from "@/Components/Service/Side_card/OtherServices";
import Hero from "@/Components/Feauture/Hero/Hero";
import StepperArabic from "@/Components/Stepper/StepperArabic";

function Page() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();

  return (
    <>
      <Hero />
      <div className={styles.Paper} dir={direction}>
        <div className={styles.Paper_g}>
          <div className={styles.partie3}>
            <Typography
              variant="h5"
              fontWeight={700}
              className={styles.Arabic2}
              sx={{ textAlign: direction === "rtl" ? "right" : "left" }}
            >
              {t("main_services")}
              <div className={styles.titleUnderline} />
            </Typography>

            <OtherServices />
          </div>
        </div>

        <div className={styles.Paper_d}>
          <div className={styles.header}>
            <div className={styles.image_demande}>
              <Image
                className={styles.imagec}
                src="/img/icon/liste.png"
                alt={t("list_icon_alt")}
                width={50}
                height={50}
              />
            </div>
            <Typography
              variant="h5"
              fontWeight={700}
              className={styles.titre_form}
              sx={{ textAlign: direction === "rtl" ? "right" : "left" }}
            >
              {t("shipping_instructions")}
            </Typography>
          </div>

          <StepperArabic />
        </div>
      </div>
    </>
  );
}

export default Page;
