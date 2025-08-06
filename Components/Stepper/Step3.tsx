"use client";

import { Box } from "@mui/material";
import styles from "./StepperArabic.module.css";
import { useTranslation } from "next-i18next";
import i18n from "i18next";

type Step3Props = {
  shippingTo: string;
  setShippingTo: (val: string) => void;
};

export default function Step3({ shippingTo, setShippingTo }: Step3Props) {
  const { t } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <Box sx={{ mt: 6 }} dir={dir}>
      <label htmlFor="shipping-to" className={styles.Arabic2}>
        {t("form2.shipping_to", "Where are you shipping to?")}
      </label>
      <input
        id="shipping-to"
        className={styles.basicInput}
        placeholder={t("form2.shipping_placeholder", "Enter shipping destination")}
        value={shippingTo}
        onChange={(e) => setShippingTo(e.target.value)}
      />
    </Box>
  );
}
