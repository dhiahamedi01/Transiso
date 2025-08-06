"use client";

import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import styles from "./StepperArabic.module.css";
import { useTranslation } from "next-i18next";
import i18n from "i18next";

type Step4Props = {
  formData: any;
  handleInputChange: any;
  handleDateChange: (d: Dayjs | null) => void;
  handleFileChange: any;
};

export default function Step4({
  formData,
  handleInputChange,
  handleDateChange,
  handleFileChange,
}: Step4Props) {
  const { t } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <Box sx={{ mt: 4 }} dir={dir}>
      {/* Nom */}
      <div className={styles.formRow}>
        <div className={styles.formColumn}>
          <label className={styles.formLabel}>{t("form4.name", "Name *")}</label>
          <input
            name="name"
            className={styles.formInput}
            placeholder={t("form4.name_placeholder", "Enter your name")}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      {/* Email - Phone */}
      <div className={styles.formRow} style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <label className={styles.formLabel}>{t("form4.email", "Email *")}</label>
          <input
            type="email"
            name="email"
            className={styles.formInput}
            placeholder={t("form4.email_placeholder", "Enter your email")}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.formLabel}>{t("form4.phone", "Phone *")}</label>
          <input
            type="tel"
            name="phone"
            className={styles.formInput}
            placeholder={t("form4.phone_placeholder", "Enter your phone number")}
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      {/* Date */}
      <div className={styles.formRow}>
        <label className={styles.formLabel}>{t("form4.shipping_date", "Shipping Date *")}</label>
        <DatePicker
          value={formData.date}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              size: "small",
              sx: {
                width: "100%",
                fontFamily: dir === "rtl" ? '"Noto Kufi Arabic", sans-serif' : undefined,
              },
            },
          }}
        />
      </div>

      {/* Poids & Volume */}
      <div className={styles.formRow} style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <label className={styles.formLabel}>{t("form4.weight", "Weight (kg)")}</label>
          <input
            name="weight"
            className={styles.formInput}
            placeholder={t("form4.weight_placeholder", "e.g., 10")}
            value={formData.weight}
            onChange={handleInputChange}
            inputMode="numeric"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.formLabel}>{t("form4.volume", "Volume (m³)")}</label>
          <input
            name="volume"
            className={styles.formInput}
            placeholder={t("form4.volume_placeholder", "e.g., 2.5")}
            value={formData.volume}
            onChange={handleInputChange}
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Cargo Details */}
      <div className={styles.formRow}>
        <label className={styles.formLabel}>{t("form4.cargo_details", "Cargo Details")}</label>
        <textarea
          name="cargoDetails"
          className={styles.formTextArea}
          placeholder={t("form4.cargo_placeholder", "Enter details about the cargo")}
          value={formData.cargoDetails}
          onChange={handleInputChange}
          rows={3}
        />
      </div>

      {/* Notes */}
      <div className={styles.formRow}>
        <label className={styles.formLabel}>{t("form4.notes", "Additional Notes")}</label>
        <textarea
          name="notes"
          className={styles.formTextArea}
          placeholder={t("form4.notes_placeholder", "Enter any additional notes")}
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
        />
      </div>

      {/* File Upload */}
      <div className={styles.formRow}>
        <label className={styles.formLabel}>{t("form4.file_upload", "Upload File (optional)")}</label>
        <input
          className={styles.formFile}
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ width: "100%" }}
        />
      </div>
    </Box>
  );
}
