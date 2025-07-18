"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./Login.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error } = useLogin();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await handleLogin(email, password);
      if (result?.success && result.user) {
        const role = result.user.role?.toLowerCase() || "";
        if (role === "user") {
          router.push("/");
        } else {
          router.push("/Dashboard");
        }
      } else {
 
        console.log("Login failed or user data missing");
      }
    } catch (err) {
      console.error("Erreur login:", err);
    }
  };
  
  

  return (
    <div className={styles.Page} dir={isRTL ? "rtl" : "ltr"}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.formBox}>
            <h1 className={styles.title}>{t("login.title")}</h1>
            <p className={styles.subtitle}>
              {t("login.new")}{" "}
              <Link href="/Inscription" className={styles.link}>
                {t("login.createAccount")}
              </Link>
            </p>

            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.label}>{t("login.emailLabel")}</label>
              <input
                type="email"
                placeholder={t("login.emailPlaceholder")}
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className={styles.label}>{t("login.passwordLabel")}</label>
              <input
                type="password"
                placeholder={t("login.passwordPlaceholder")}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">{t("login.remember")}</label>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? t("login.loading") : t("login.loginButton")}
              </button>

              <div className={styles.divider}>{t("login.orLoginWith")}</div>

              <div className={styles.socialGroup}>
                <button className={`${styles.socialButton} ${styles.facebook}`}>
                  <FacebookIcon fontSize="small" /> {t("login.facebook")}
                </button>
                <button className={`${styles.socialButton} ${styles.google}`}>
                  <GoogleIcon fontSize="small" /> {t("login.google")}
                </button>
                <button className={`${styles.socialButton} ${styles.twitter}`}>
                  <TwitterIcon fontSize="small" /> {t("login.twitter")}
                </button>
              </div>

              <p className={styles.bottomText}>
                {t("login.forgot")} <a href="#">{t("login.username")}</a>{" "}
                {t("login.or")} <a href="#">{t("login.password")}</a>?
              </p>
            </form>
          </div>
        </div>

        <div className={styles.right}>
          <img
            src="/img/container.jpg"
            alt={t("login.imageAlt")}
            className={styles.image}
          />
          <div className={styles.overlay}></div>
        </div>
      </div>
    </div>
  );
}
