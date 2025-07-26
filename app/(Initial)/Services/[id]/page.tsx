"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Service.module.css";
import { Typography, CircularProgress, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FAQ from "@/Components/FAQ/FAQ";
import OtherServices from "@/Components/Service/Side_card/OtherServices";
import { useTranslation } from "react-i18next";

interface Service {
  id: number;
  service_id: string;
  title: string;
  description: string;
  content: string;
  icon_path: string;
  lang: string;
}

export default function ServiceDetail() {
  const { id: service_id } = useParams() as { id: string };
  const router = useRouter();
  const { i18n, t } = useTranslation();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`/api/services/${service_id}?lang=${i18n.language}`);
        if (!res.ok) throw new Error(t("service.not_found") || "Service introuvable");
        const data = await res.json();
        setService(data);
      } catch (err: any) {
        setError(err.message || t("service.error_unknown") || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    if (service_id) fetchService();
  }, [service_id, i18n.language, t]);

  if (loading) {
    return (
      <div className={styles.center}>
        <CircularProgress color="error" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className={styles.center}>
        <Typography variant="h6" color="error">
          {error || t("service.not_found") || "Service non trouvé"}
        </Typography>
        <Button variant="contained" color="error" onClick={() => router.push("/Services")}>
          {t("service.back_to_services") || "Retour aux services"}
        </Button>
      </div>
    );
  }

  const isRtl = i18n.language === "ar";

  return (
    <div className={`${styles.Paper} ${isRtl ? styles.rtl : styles.ltr}`}>
      <div className={styles.Paper_g}>
        <div className={styles.partie3}>
          <Typography variant="h5" fontWeight={700} className={styles.Arabic2}>
            {t("service.main_services") || "الخدمات الرئيسية"}
            <div className={styles.titleUnderline} />
          </Typography>
          <OtherServices />
        </div>

        <div className={styles.partie1}>
          <div className={styles.contenue}>
            <div className={styles.image_demande}>
              <Image
                src="/img/Background/quote.svg"
                alt="msg"
                width={50}
                height={50}
                className={styles.imagec}
              />
            </div>
            <h2 className={styles.titre_demande}>{t("service.request_help_title") || "طلب المساعدة"}</h2>
            <div className={styles.Description_demande}>
              {t("service.request_help_description") ||
                "لطلب المساعدة يرجى النقر على استفسر الآن وملء المعلومات المطلوبة"}
            </div>
            <div className={styles.button_demande}>
              <Link href="/Demande">
                <button className={styles.btn_arabic}>
                  <Image
                    src="/img/Background/email.svg"
                    alt="icon"
                    width={20}
                    height={20}
                    className={styles.btn_icon}
                  />
                  {t("service.ask_now") || "استفسر الآن"}
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.bottom_image_container}>
            <Image
              src="/img/service-details-sidebar-img.png"
              alt="footer decoration"
              width={260}
              height={260}
              className={styles.bottom_image}
            />
          </div>
        </div>
      </div>

      <div className={styles.Paper_d}>
        <div className={styles.Image}>
          <Image
            src={service.icon_path}
            alt={service.title}
            width={900}
            height={530}
            priority
            style={{ objectFit: "cover" }}
            className={styles.imagec}
          />
        </div>

        <h1 className={styles.sectionHeading}>{service.title}</h1>
        <div className={styles.description}>{service.description}</div>
        <div className={styles.description} style={{ whiteSpace: "pre-line" }}>
          {service.content}
        </div>
        <div className={`${styles.Card} ${isRtl ? styles.rtl : styles.ltr}`}>
  <div className={styles.sous_Card1}>
    <div className={styles.texts_card}>
      <div className={styles.titre_card}>
        <LocationOnIcon className={styles.icon_card} />
        {t("service.tracking_title")}
      </div>
      <div className={styles.desc_card}>
        {t("service.tracking_description")}
      </div>
    </div>
  </div>

  <div className={styles.sous_Card1}>
    <div className={styles.texts_card}>
      <div className={styles.titre_card}>
        <SupportAgentIcon className={styles.icon_card} />
        {t("service.support_title")}
      </div>
      <div className={styles.desc_card}>
        {t("service.support_description")}
      </div>
    </div>
  </div>
</div>


        <FAQ />
      </div>
    </div>
  );
}
