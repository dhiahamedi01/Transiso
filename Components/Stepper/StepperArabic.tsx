"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ar";

import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  stepConnectorClasses,
  ThemeProvider,
  createTheme,
  styled,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./StepperArabic.module.css";

/* ---------- Données ---------- */
const steps = [
  { label: "الخطوة الأولى", icon: "/img/icon/step1.svg" },
  { label: "الخطوة الثانية", icon: "/img/icon/step2.svg" },
  { label: "الخطوة الثالثة", icon: "/img/icon/step4.svg" },
  { label: "الخطوة الرابعة", icon: "/img/icon/step5.svg" },
];

const services = [
  "الشحن البحري",
  "الشحن التجاري",
  "الشحن الجوي",
  "شحن السيارات",
  "شحن الاثاث",
  "شحن الطرود",
  "التخليص الجمركي",
  "أخرى",
];

/* ---------- Connecteur RTL ---------- */
const ICON = 48;
const BORDER = 2;

const RtlConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: (ICON + BORDER * 2) / 2,
    ...(theme.direction === "rtl"
      ? {
          left: `calc(50% + ${ICON / 2 + BORDER}px)`,
          right: `calc(-50% + ${ICON / 2 + BORDER}px)`,
        }
      : {
          left: `calc(-50% + ${ICON / 2 + BORDER}px)`,
          right: `calc(50% + ${ICON / 2 + BORDER}px)`,
        }),
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#BDBDBD",
    borderTopWidth: 2,
  },
}));

/* ---------- Thème RTL ---------- */
const rtlTheme = createTheme({ direction: "rtl" });

/* ---------- Types ---------- */
type FormData = {
  name: string;
  email: string;
  phone: string;
  date: Dayjs | null;
  weight: string;
  volume: string;
  cargoDetails: string;
  notes: string;
  file: File | null;
};

/* ---------- Composant principal ---------- */
export default function StepperArabic() {
  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [shippingFrom, setShippingFrom] = useState("");
  const [shippingTo, setShippingTo] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: dayjs(),
    weight: "",
    volume: "",
    cargoDetails: "",
    notes: "",
    file: null,
  });

  /* ---------- Handlers ---------- */
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSelected(e.target.value);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setFormData((prev) => ({ ...prev, date: newDate }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({
      ...prev,
      file: e.target.files ? e.target.files[0] : null,
    }));

  const handleNext = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  /* ---------- Render ---------- */
  return (
    <ThemeProvider theme={rtlTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
        <Box className={styles.stepperContainer} dir="rtl">
          {/* --- STEPPER --- */}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<RtlConnector />}
          >
            {steps.map(({ label, icon }, idx) => {
              const done = idx < activeStep;
              const current = idx === activeStep;
              return (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontFamily: "Noto Kufi Arabic, sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: current || done ? "#000" : "#9e9e9e",
                      },
                    }}
                    icon={
                      <Box
                        className={styles.stepIcon}
                        sx={{
                          borderColor: current || done ? "#DE1E27" : "#BDBDBD",
                        }}
                      >
                        <Image
                          src={icon}
                          alt={`step-${idx + 1}`}
                          width={24}
                          height={24}
                          style={{
                            filter:
                              current || done
                                ? "none"
                                : "grayscale(1) brightness(1.8)",
                            opacity: current || done ? 1 : 0.45,
                          }}
                        />
                      </Box>
                    }
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {/* --- ÉTAPE 1 : Service --- */}
          {activeStep === 0 && (
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
                  key={srv}
                  onClick={() => setSelected(srv)}
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
                    value={srv}
                    control={
                      <Radio
                        sx={{
                          color: "#BDBDBD",
                          "&.Mui-checked": { color: "#DE1E27" },
                          "& .MuiSvgIcon-root": { fontSize: 28 },
                        }}
                      />
                    }
                    label={srv}
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
          )}

          {/* --- ÉTAPE 2 : الشحن من ؟ --- */}
          {activeStep === 1 && (
            <Box sx={{ mt: 6 }}>
              <label
                htmlFor="shipping-from"
                className={styles.Arabic2}
                style={{ marginBottom: 20, color: "#0C3547" }}
              >
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
          )}

          {/* --- ÉTAPE 3 : الشحن إلى ؟ --- */}
          {activeStep === 2 && (
            <Box sx={{ mt: 6 }}>
              <label
                htmlFor="shipping-to"
                className={styles.Arabic2}
                style={{ marginBottom: 20 }}
              >
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
          )}

          {/* --- ÉTAPE 4 : Formulaire final avec téléphone + date --- */}
          {activeStep === 3 && (
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

             {/* Email, Phone, Date on the same row */}
<div
  className={styles.formRow}
  style={{
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  {/* Email */}
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

  {/* Phone */}
  <div style={{ flex: 1 }}>
    <label className={styles.formLabel}>رقم الهاتف *</label>
    <input
      type="tel"
      name="phone"
      className={styles.formInput}
      placeholder="أدخل رقم الهاتف"
      value={formData.phone}
      onChange={handleInputChange}
      required
    />
  </div>

  
</div>
{/* Date - ligne seule */}
<div style={{ marginTop: 24, width: "100%" }}>
  <label className={styles.formLabel} style={{ display: "block", marginBottom: 8 }}>
    تاريخ الشحن
  </label>
  <DatePicker
    value={formData.date}
    onChange={handleDateChange}
    slotProps={{
      textField: {
        variant: "outlined",
        sx: {
          fontFamily: '"Noto Kufi Arabic", sans-serif',
          width: "100%",
          marginBottom:'20px',
          borderRadius: "8px",
          direction:'ltr',
          borderColor: "#ccc",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            padding: 0,
            minHeight: "48px",
            // نزيد padding من جهة اليمين باش يبعد الآيكون
            paddingRight: "40px",
          },
          "& .MuiInputBase-input": {
            padding: "15px",
            fontSize: "16px",
            color: "#0c3547",
            fontFamily: '"Noto Kufi Arabic", sans-serif',
          },
          "& fieldset": {
            borderColor: "#ccc",
          },
          "&:hover fieldset": {
            borderColor: "#de1e27",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#de1e27",
            borderWidth: 2,
          },
        },
        placeholder: "اختر التاريخ",
      },
    }}
  />
</div>


              {/* Poids & Volume */}
              <div className={styles.formRow}>
                <div className={styles.formColumn}>
                  <label className={styles.formLabel}>الوزن (كغ)</label>
                  <input
                    name="weight"
                    className={styles.formInput}
                    placeholder="أدخل الوزن"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formColumn}>
                  <label className={styles.formLabel}>الحجم (م³)</label>
                  <input
                    name="volume"
                    className={styles.formInput}
                    placeholder="أدخل الحجم"
                    value={formData.volume}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Détails du cargo */}
              <div className={styles.formRow}>
                <label className={styles.formLabel}>تفاصيل البضاعة</label>
                <textarea
                  name="cargoDetails"
                  className={styles.formTextArea}
                  placeholder="أدخل تفاصيل البضاعة"
                  value={formData.cargoDetails}
                  onChange={handleInputChange}
                />
              </div>

              {/* Notes */}
              <div className={styles.formRow}>
                <label className={styles.formLabel}>ملاحظات</label>
                <textarea
                  name="notes"
                  className={styles.formTextArea}
                  placeholder="ملاحظات إضافية"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

              {/* Fichier */}
              <div className={styles.formRow}>
                <label className={styles.formLabel}>ارفاق ملف</label>
                <input
                 className={styles.formFile}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />
              </div>
            </Box>
          )}

          {/* --- Boutons navigation --- */}
          <Box className={styles.buttons}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              className={styles.backButton}
            >
              السابق
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              className={styles.nextButton}
            >
              {activeStep === steps.length - 1 ? "إرسال" : "التالي"}
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
