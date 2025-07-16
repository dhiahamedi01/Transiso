"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./Card_service2.module.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";  // <-- import MUI loading spinner
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
  title: string;
  description: string;
  icon_path: string;
}

export default function CardService() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/services")
      .then((res) => {
        setServices(res.data.services);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement services:", err);
        setError("Impossible de charger les services");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px", // ou la hauteur que tu veux pour centrer verticalement
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <p>{error}</p>;

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
            key={service.id}
            href={`/Services/${service.id}`}
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
    </>
  );
}
