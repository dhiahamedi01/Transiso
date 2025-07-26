"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./Card_service2.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function RedLineWithAnimatedArrow() {
  return (
    <div className={styles.redLineWrapper}>
      <DoubleArrowIcon sx={{ fontSize: "30px" }} className={styles.animatedArrow} />
    </div>
  );
}

interface Service {
  id: number;
  service_id: string;
  title: string;
  description: string;
  icon_path: string;
  lang: string;
}

export default function CardService() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const lang = i18n.language || "en";
        const res = await axios.get(`/api/services?lang=${lang}`);
        setServices(res.data.services);
      } catch (err) {
        console.error("Erreur chargement services:", err);
        setError(t("errors.loading_services") || "Impossible de charger les services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();

    i18n.on("languageChanged", fetchServices);

    return () => {
      i18n.off("languageChanged", fetchServices);
    };
  }, [i18n, t]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <p>{error}</p>;

  // Détecter direction selon la langue (ar -> rtl, sinon ltr)
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <div style={{ direction, textAlign: direction === "rtl" ? "right" : "left" }}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionSubheading}>{t("sub_services.subheading")}</h4>
        <h2 className={styles.sectionHeading}>{t("sub_services.heading")}</h2>
        <RedLineWithAnimatedArrow />
      </div>

      <div className={styles.Liste_card}>
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/Services/${service.service_id}`} // <-- utilise service_id ici
            className={styles.card}
            style={{
              backgroundImage: `url(${service.icon_path})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className={styles.contenue}>
              <span className={styles.span}>
                {t(`sub_services.services.${service.title}`, service.title)}
              </span>
            </div>
            <div className={styles.description}>{service.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
