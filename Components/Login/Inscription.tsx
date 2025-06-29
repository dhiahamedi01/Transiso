"use client";

import React from "react";
import styles from "./Inscription.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className={styles.Page} dir="rtl">
      <div className={styles.container} dir="rtl">
        <div className={styles.left}>
          <div className={styles.formBox}>
            <br />
            <h1 className={styles.title}>إنشاء حساب</h1>
            <p className={styles.subtitle}>
              لديك حساب بالفعل ؟{" "}
              <Link href="/Login" className={styles.link}>
                تسجيل الدخول
              </Link>
            </p>

            <form className={styles.form}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.label}>الاسم الكامل</label>
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    className={styles.input}
                  />
                </div>
                <div className={styles.column}>
                  <label className={styles.label}>البريد الإلكتروني</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.label}>رقم الجوال</label>
                  <input
                    type="text"
                    placeholder="رقم الهاتف"
                    className={styles.input}
                  />
                </div>
                <div className={styles.column}>
                  <label className={styles.label}>اسم الشركة (اختياري)</label>
                  <input
                    type="text"
                    placeholder="اسم الشركة"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <label className={styles.label}>كلمة المرور</label>
                  <input
                    type="password"
                    placeholder="********"
                    className={styles.input}
                  />
                </div>
                <div className={styles.column}>
                  <label className={styles.label}>العنوان</label>
                  <input
                    type="text"
                    placeholder="العنوان الكامل"
                    className={styles.input}
                  />
                </div>
              </div>

              <button type="submit" className={styles.button}>
                إنشاء الحساب
              </button>

              <div className={styles.divider}>أو التسجيل باستخدام</div>

              <div className={styles.socialGroup}>
                <button
                  className={`${styles.socialButton} ${styles.facebook}`}
                >
                  <FacebookIcon fontSize="small" /> فيسبوك
                </button>
                <button className={`${styles.socialButton} ${styles.google}`}>
                  <GoogleIcon fontSize="small" /> جوجل
                </button>
                <button className={`${styles.socialButton} ${styles.twitter}`}>
                  <TwitterIcon fontSize="small" /> تويتر
                </button>
              </div>
              {/*
              <p className={styles.bottomText}>
                بالضغط على "إنشاء الحساب"، فإنك توافق على{" "}
                <a href="#">الشروط والأحكام</a>.
              </p>*/}
            </form>
          </div>
        </div>

        <div className={styles.right}>
          <img
            src="/img/hero2.jpg"
            alt="صورة التسجيل"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
