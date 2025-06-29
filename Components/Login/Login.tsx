
"use client";
import Link from "next/link";
import React from "react";
import styles from "./Login.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginPage() {
  return (
    <div className={styles.Page} dir="rtl">
    <div className={styles.container} dir="rtl">
      <div className={styles.left}> 
        <div className={styles.formBox}>
          <h1 className={styles.title}>تسجيل الدخول</h1>
          <p className={styles.subtitle}>
            جديد على Transiso؟ <Link href="/Inscription" className={styles.link}>إنشاء حساب</Link>
          </p>

          <form className={styles.form}>
            <label className={styles.label}>البريد الإلكتروني أو اسم المستخدم</label>
            <input type="email" placeholder="owner@githubit.com" className={styles.input} />

            <label className={styles.label}>كلمة المرور</label>
            <input type="password" placeholder="********" className={styles.input} />

            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">تذكرني</label>
            </div>

            <button type="submit" className={styles.button}>تسجيل الدخول</button>

            <div className={styles.divider}>أو تسجيل الدخول باستخدام</div>

            <div className={styles.socialGroup}>
              <button className={`${styles.socialButton} ${styles.facebook}`}>
                <FacebookIcon fontSize="small" /> فيسبوك
              </button>
              <button className={`${styles.socialButton} ${styles.google}`}>
                <GoogleIcon fontSize="small" /> جوجل
              </button>
              <button className={`${styles.socialButton} ${styles.twitter}`}>
                <TwitterIcon fontSize="small" /> تويتر
              </button>
            </div>

            <p className={styles.bottomText}>
              هل نسيت <a href="#">اسم المستخدم</a> أو <a href="#">كلمة المرور؟</a>
            </p>
          </form>
        </div>
      </div>

      <div className={styles.right}>
        <img src="/img/hero2.jpg" alt="صورة تسجيل الدخول" className={styles.image} />
      </div>
    </div>
    </div>
  );
}