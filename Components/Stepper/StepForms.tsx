"use client";

import React, { ChangeEvent } from "react";
import { Box, CircularProgress, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

import styles from "./StepperArabic.module.css";
import { ServiceType, FormData } from "./types";

type Props = {
  activeStep: number;
  selected: string;
  loadingServices: boolean;
  fetchError: string | null;
  services: ServiceType[];
  shippingFrom: string;
  shippingTo: string;
  formData: FormData;
  handleRadioChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSelected: (value: string) => void;
  setShippingFrom: (value: string) => void;
  setShippingTo: (value: string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateChange: (newDate: Dayjs | null) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function StepForms({
  activeStep,
  selected,
  loadingServices,
  fetchError,
  services,
  shippingFrom,
  shippingTo,
  formData,
  handleRadioChange,
  setSelected,
  setShippingFrom,
  setShippingTo,
  handleInputChange,
  handleDateChange,
  handleFileChange,
}: Props) {
  if (activeStep === 0)
    return loadingServices ? (
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    ) : fetchError ? (
      <Typography
        sx={{
          mt: 6,
          color: "error.main",
          textAlign: "center",
          fontFamily: '"Noto Kufi Arabic", sans-serif',
        }}
      >
        {fetchError}
      </Typography>
    ) : (
      <RadioGroup
        value={selected}
        onChange={handleRadioChange}
        sx={{
          mt: 4,
          gap: 1.5,
          color: "#0C3547",
          fontFamily: '"Noto Kufi Arabic", sans-serif !important',
        }}
      >
        {services.map((srv, idx) => (
          <Box
            key={srv.id}
            onClick={() => setSelected(srv.name)}
            sx={{
              width: "100%",
              bgcolor: "#fff",
              borderRadius: 2,
              border: "1px solid #ddd",
              padding: 1.5,
              mb: idx === services.length - 1 ? 0 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
              cursor: "pointer",
              transition: "background-color 0.3s",
              "&:hover": { bgcolor: "#f9f9f9" },
            }}
          >
            <FormControlLabel
              value={srv.name}
              control={
                <Radio
                  sx={{
                    color: "#BDBDBD",
                    "&.Mui-checked": { color: "#DE1E27" },
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
              }
              label={srv.name}
              sx={{
                flexGrow: 1,
                ".MuiFormControlLabel-label": {
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  fontFamily: '"Noto Kufi Arabic", sans-serif !important',
                },
              }}
            />
          </Box>
        ))}
      </RadioGroup>
    );

  if (activeStep === 1)
    return (
      <Box sx={{ mt: 6 }}>
        <label htmlFor="shipping-from" className={styles.Arabic2}>
          الشحن من ؟
        </label>
        <input
          id="shipping-from"
          className={styles.basicInput}
          placeholder="أدخل مكان الشحن"
          value={shippingFrom}
          onChange={(e) => setShippingFrom(e.target.value)}
        />
      </Box>
    );

  if (activeStep === 2)
    return (
      <Box sx={{ mt: 6 }}>
        <label htmlFor="shipping-to" className={styles.Arabic2}>
          الشحن إلى ؟
        </label>
        <input
          id="shipping-to"
          className={styles.basicInput}
          placeholder="أدخل وجهة الشحن"
          value={shippingTo}
          onChange={(e) => setShippingTo(e.target.value)}
        />
      </Box>
    );

  if (activeStep === 3)
    return (
      <Box sx={{ mt: 4 }}>
        {/* Nom */}
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <label className={styles.formLabel}>الاسم *</label>
            <input
              name="name"
              className={styles.formInput}
              placeholder="أدخل اسمك"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Email - Phone */}
        <div className={styles.formRow} style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label className={styles.formLabel}>البريد الإلكتروني *</label>
            <input
              type="email"
              name="email"
              className={styles.formInput}
              placeholder="أدخل بريدك الإلكتروني"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className={styles.formLabel}>رقم الهاتف *</label>
            <input
              type="tel"
              name="phone"
              className={styles.formInput}
              placeholder="أدخل رقم هاتفك"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Date */}
        <div className={styles.formRow}>
          <label className={styles.formLabel}>تاريخ الشحن *</label>
          <DatePicker
            value={formData.date}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  width: "100%",
                  fontFamily: '"Noto Kufi Arabic", sans-serif',
                },
              },
            }}
          />
        </div>

        {/* Poids & Volume */}
        <div className={styles.formRow} style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label className={styles.formLabel}>الوزن (كغ)</label>
            <input
              name="weight"
              className={styles.formInput}
              placeholder="مثال: 10"
              value={formData.weight}
              onChange={handleInputChange}
              inputMode="numeric"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className={styles.formLabel}>الحجم (م³)</label>
            <input
              name="volume"
              className={styles.formInput}
              placeholder="مثال: 2.5"
              value={formData.volume}
              onChange={handleInputChange}
              inputMode="numeric"
            />
          </div>
        </div>

        {/* Cargo Details */}
        <div className={styles.formRow}>
          <label className={styles.formLabel}>تفاصيل البضائع</label>
          <textarea
            name="cargoDetails"
            className={styles.formTextArea}
            placeholder="أدخل تفاصيل عن البضائع"
            value={formData.cargoDetails}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        {/* Notes */}
        <div className={styles.formRow}>
          <label className={styles.formLabel}>ملاحظات إضافية</label>
          <textarea
            name="notes"
            className={styles.formTextArea}
            placeholder="أدخل أي ملاحظات إضافية"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        {/* File Upload */}
        <div className={styles.formRow}>
          <label className={styles.formLabel}>رفع ملف (اختياري)</label>
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

  return null;
}
