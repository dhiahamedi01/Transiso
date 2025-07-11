'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import styles from "./Inscription.module.css";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { useSignup } from "@/hooks/useSignup";
import { SignupData } from "@/services/Signup";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import useSendMail from "@/hooks/useSendMail";

export default function SignupPage() {
  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";

  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    permission: "",
    password: "",
    role: "user",
  });

  const { loading, error, success, submitSignup } = useSignup();
  const { sendMail, sending: sendingMail, error: mailError } = useSendMail();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const mailSentRef = useRef(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError(null);
  }

  async function checkEmailExists(email: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Erreur lors de la vérification");
      const data = await res.json();
      return data.exists === true;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading || sendingMail) return; // منع إعادة الإرسال أثناء التحميل

    const exists = await checkEmailExists(formData.email);
    if (exists) {
      setLocalError(t("signup.emailExists") || "Cet email est déjà utilisé.");
      return;
    }

    mailSentRef.current = false; // إعادة تعيين الحالة قبل التسجيل جديد
    await submitSignup(formData);
  }

  useEffect(() => {
    if (success && !mailSentRef.current) {
      setOpenSuccessAlert(true);

      sendMail({
        to: formData.email,
        subject: t("signup.welcomeSubject") || "Bienvenue !",
        text: t("signup.welcomeText") || `Bonjour ${formData.firstName}, merci pour votre inscription !`,
      }).catch(console.error);

      mailSentRef.current = true; // تأكيد إرسال الميل

      setTimeout(() => {
        setShowThankYou(true);
      }, 3000);
    }
  }, [success, formData.email, formData.firstName, sendMail, t]);

  function handleCloseAlert(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") return;
    setOpenSuccessAlert(false);
  }

  if (showThankYou) {
    return (
      <div className={styles.Page} dir={isRTL ? "rtl" : "ltr"}>
        <div className={styles.container} dir={isRTL ? "rtl" : "ltr"}>
          <div className={styles.left} style={{ textAlign: isRTL ? "right" : "left" }}>
            <div className={styles.thankYouCard} style={{ padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
              <img
                src="/img/check.webp"
                alt="Merci"
                style={{ maxWidth: "100%", marginBottom: 20 }}
              />
              <h2>{t("signup.thankYouTitle") || "Merci pour votre inscription !"}</h2>
              <p>{t("signup.thankYouMessage") || "Votre inscription a été réalisée avec succès."}</p>
              <Link href="/Login">
                <button className={styles.button} style={{ marginTop: 20 }}>
                  {t("signup.goToLogin") || "Se connecter"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Page} dir={isRTL ? "rtl" : "ltr"}>
      <div className={styles.container} dir={isRTL ? "rtl" : "ltr"}>
        <div className={styles.left}>
          <div className={styles.formBox}>
            <br />
            <h1 className={styles.title}>{t("signup.title")}</h1>
            <p className={styles.subtitle}>
              {t("signup.hasAccount")}{" "}
              <Link href="/Login" className={styles.link}>
                {t("signup.loginLink")}
              </Link>
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* inputs */}
              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.label}>{t("signup.fullName")}</label>
                  <div className={styles.inputWrapper}>
                    <PersonIcon className={styles.inputIcon} />
                    <input
                      type="text"
                      name="firstName"
                      placeholder={t("signup.fullName")}
                      className={styles.input}
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.column}>
                  <label className={styles.label}>{t("signup.email")}</label>
                  <div className={styles.inputWrapper}>
                    <EmailIcon className={styles.inputIcon} />
                    <input
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.label}>{t("signup.phone")}</label>
                  <div className={styles.inputWrapper}>
                    <PhoneIcon className={styles.inputIcon} />
                    <input
                      type="text"
                      name="phone"
                      placeholder={t("signup.phone")}
                      className={styles.input}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.column}>
                  <label className={styles.label}>{t("signup.company")}</label>
                  <div className={styles.inputWrapper}>
                    <BusinessIcon className={styles.inputIcon} />
                    <input
                      type="text"
                      name="company"
                      placeholder={t("signup.company")}
                      className={styles.input}
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.label}>{t("signup.password")}</label>
                  <div className={styles.inputWrapper}>
                    <LockIcon className={styles.inputIcon} />
                    <input
                      type="password"
                      name="password"
                      placeholder="********"
                      className={styles.input}
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.column}>
                  <label className={styles.label}>{t("signup.address")}</label>
                  <div className={styles.inputWrapper}>
                    <HomeIcon className={styles.inputIcon} />
                    <input
                      type="text"
                      name="location"
                      placeholder={t("signup.address")}
                      className={styles.input}
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={styles.button}
                disabled={loading || sendingMail}
              >
                {loading || sendingMail
                  ? t("signup.loading") || "Chargement..."
                  : t("signup.button")}
              </button>

              <div className={styles.divider}>{t("signup.orWith")}</div>

              <div className={styles.socialGroup}>
                <button className={`${styles.socialButton} ${styles.facebook}`}>
                  <FacebookIcon fontSize="small" /> {t("signup.facebook")}
                </button>
                <button className={`${styles.socialButton} ${styles.google}`}>
                  <GoogleIcon fontSize="small" /> {t("signup.google")}
                </button>
                <button className={`${styles.socialButton} ${styles.twitter}`}>
                  <TwitterIcon fontSize="small" /> {t("signup.twitter")}
                </button>
              </div>

              {localError && <p style={{ color: "red", marginTop: 10 }}>{localError}</p>}
              {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
              {mailError && <p style={{ color: "red", marginTop: 10 }}>{mailError}</p>}
            </form>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
          {t("signup.successMessage") || "Inscription réussie !"}
        </Alert>
      </Snackbar>
    </div>
  );
}
