"use client";
import { Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
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
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Image from "next/image";
import styles from "./StepperArabic.module.css";

/* ---------- Données ---------- */
const steps = [
    { label: "الخطوة الأولى",  icon: "/img/icon/step1.svg" },
    { label: "الخطوة الثانية", icon: "/img/icon/step2.svg" },
    { label: "الخطوة الثالثة", icon: "/img/icon/step3.svg" },
    { label: "الخطوة الرابعة", icon: "/img/icon/step4.svg" },
    { label: "الخطوة الخامسة", icon: "/img/icon/step5.svg" },
];

const services = [
  "الشحن البحري",
  "الشحن التجاري",
  "الشحن الجوي",
  "شحن السيارات",
];

/* ---------- Connecteur RTL (déjà expliqué) ---------- */
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

/* ---------- Composant ---------- */
export default function StepperArabic() {
  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = useState<string>("");



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
      };

  return (
    <ThemeProvider theme={rtlTheme}>
      <Box className={styles.stepperContainer} dir="rtl">
        {/* --- Stepper --- */}
        <Stepper activeStep={activeStep} alternativeLabel connector={<RtlConnector />}>
          {steps.map(({ label, icon }, idx) => {
            const done   = idx <  activeStep;
            const active = idx === activeStep;

            return (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontFamily: "Noto Kufi Arabic, sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: active || done ? "#000" : "#9e9e9e",
                    },
                  }}
                  icon={
                    <Box
                      className={styles.stepIcon}
                      sx={{
                        borderColor: active || done ? "#DE1E27" : "#BDBDBD",
                      }}
                    >
                      <Image
                        src={icon}
                        alt={`step-${idx + 1}`}
                        width={24}
                        height={24}
                        style={{
                          filter:
                            active || done
                              ? "none"
                              : "grayscale(1) brightness(1.8)",
                          opacity: active || done ? 1 : 0.45,
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

        {/* --- Contenu de la première étape --- */}
        {activeStep === 0 && (
    <RadioGroup
      value={selected}
      onChange={handleChange}
      sx={{
        mt: 4,
        gap: 1.5,
        color:'#0C3547',

        fontFamily: '"Noto Kufi Arabic", sans-serif !important',
      }}
    >
      {services.map((srv, idx) => (
        <Box
          key={srv}
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
            "&:hover": {
              bgcolor: "#f9f9f9",
            },
          }}
          onClick={() => setSelected(srv)}
        >
          <FormControlLabel
            value={srv}
            control={
              <Radio
                sx={{
                  color: "#BDBDBD",
                  "&.Mui-checked": {
                    color: "#DE1E27",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
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
    </RadioGroup>  )}

        {/* --- Boutons --- */}
        <Box className={styles.buttons}>
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((s) => Math.max(s - 1, 0))}
            className={styles.backButton}
          >
            السابق
          </Button>
          <Button
            variant="contained"
            onClick={() => setActiveStep((s) => Math.min(s + 1, steps.length - 1))}
            className={styles.nextButton}
          >
            التالي
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
