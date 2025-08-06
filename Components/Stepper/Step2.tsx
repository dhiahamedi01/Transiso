"use client";

import { Box } from "@mui/material";
import styles from "./StepperArabic.module.css";
import { useTranslation } from "next-i18next"; // i18n hook
import i18n from "i18next"; // To check current language

type Step2Props = {
  shippingFrom: string;
  setShippingFrom: (val: string) => void;
};

export default function Step2({ shippingFrom, setShippingFrom }: Step2Props) {
  const { t } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr"; // Determine text direction

  return (
    <Box sx={{ mt: 6 }} dir={dir}>
      <label htmlFor="shipping-from" className={styles.Arabic2}>
        {t("form2.shipping_from", "Where are you shipping from?")}
      </label>
      <input
        id="shipping-from"
        className={styles.basicInput}
        placeholder={t("form2.shipping_placeholder", "Enter shipping location")}
        value={shippingFrom}
        onChange={(e) => setShippingFrom(e.target.value)}
      />
    </Box>
  );
}
