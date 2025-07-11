'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await submitSignup(formData);
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

              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? t("signup.loading") || "Chargement..." : t("signup.button")}
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

              {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
              {success && <p style={{ color: "green", marginTop: "10px" }}>{t("signup.successMessage") || "Inscription réussie !"}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
