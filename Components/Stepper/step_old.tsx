"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ar";
import { useTranslation } from "react-i18next";

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
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import styles from "./StepperArabic.module.css";
import { useCreateDemande } from "@/hooks/useCreateDemande";
import useSendMail from "@/hooks/useSendMail";

/* ---------- Connecteur personnalisé avec direction dynamique ---------- */
const ICON = 48;
const BORDER = 2;

const DirectionalConnector = styled(StepConnector)(({ theme }) => ({
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

type ServiceType = {
  id: number;
  name: string;
};

/* ---------- Composant principal ---------- */
export default function StepperArabic() {
  const { t, i18n } = useTranslation();

  // Détecte la direction en fonction de la langue actuelle
  const direction = i18n.dir(); // renvoie "rtl" ou "ltr"

  // Crée dynamiquement le thème MUI avec la direction correcte
  const theme = React.useMemo(
    () =>
      createTheme({
        direction,
        typography: {
          fontFamily:
            direction === "rtl"
              ? '"Noto Kufi Arabic", "Roboto", "Helvetica", "Arial", sans-serif'
              : '"Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [direction]
  );

  // Si tu utilises dayjs en arabe, applique la locale seulement si rtl
  useEffect(() => {
    if (direction === "rtl") {
      dayjs.locale("ar");
    } else {
      dayjs.locale("en"); // ou la locale par défaut
    }
  }, [direction]);

  const steps = [
    { label: t("step1"), icon: "/img/icon/step1.svg" },
    { label: t("step2"), icon: "/img/icon/step2.svg" },
    { label: t("step3"), icon: "/img/icon/step4.svg" },
    { label: t("step4"), icon: "/img/icon/step5.svg" },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [shippingFrom, setShippingFrom] = useState("");
  const [shippingTo, setShippingTo] = useState("");
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

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

  const {
    mutate: createDemande,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateDemande();

  const {
    sendMail,
    sending: sendingMail,
    error: mailError,
  } = useSendMail();

  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      setFetchError(null);
      try {
        const res = await fetch("/api/fields/");
        if (!res.ok) throw new Error(`Erreur: ${res.status}`);
        const data: ServiceType[] = await res.json();
        setServices(data);
      } catch {
        setFetchError("Erreur lors du chargement des services.");
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

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

  const handleNext = () =>
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    const formPayload = new FormData();
    formPayload.append("service", selected);
    formPayload.append("from", shippingFrom);
    formPayload.append("to", shippingTo);
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("date", formData.date?.toISOString() || "");
    formPayload.append("weight", formData.weight);
    formPayload.append("volume", formData.volume);
    formPayload.append("cargoDetails", formData.cargoDetails);
    formPayload.append("notes", formData.notes);
    if (formData.file) {
      formPayload.append("file", formData.file);
    }

    try {
      await createDemande(formPayload);
      await sendMail({
        to: formData.email,
        subject: t("email2.subject"),
        text: t("email2.body", { name: formData.name }),
      });
    } catch (err) {
      console.error("Erreur lors de l'envoi du formulaire ou du mail:", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={direction === "rtl" ? "ar" : "en"}>
        <Box className={styles.stepperContainer} dir={direction}>
          <Stepper activeStep={activeStep} alternativeLabel connector={<DirectionalConnector />}>
            {steps.map(({ label, icon }, idx) => {
              const done = idx < activeStep;
              const current = idx === activeStep;
              return (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontFamily:
                          direction === "rtl"
                            ? "Noto Kufi Arabic, sans-serif"
                            : "Roboto, sans-serif",
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
                    <span className={styles.text_step}>{label}</span>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {activeStep === 0 && (
            <Step1
              services={services}
              selected={selected}
              loadingServices={loadingServices}
              fetchError={fetchError}
              handleRadioChange={handleRadioChange}
              setSelected={setSelected}
            />
          )}

          {activeStep === 1 && (
            <Step2 shippingFrom={shippingFrom} setShippingFrom={setShippingFrom} />
          )}

          {activeStep === 2 && (
            <Step3 shippingTo={shippingTo} setShippingTo={setShippingTo} />
          )}

          {activeStep === 3 && (
            <Step4
              formData={formData}
              handleInputChange={handleInputChange}
              handleDateChange={handleDateChange}
              handleFileChange={handleFileChange}
            />
          )}

          <Box
            sx={{
              mt: 6,
              display: "flex",
              justifyContent: "space-between",
              px: 1,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{
                fontFamily: direction === "rtl" ? '"Noto Kufi Arabic", sans-serif' : undefined,
                fontWeight: 700,
                color: "#DE1E27",
                borderColor: "#DE1E27",
              }}
            >
              {t("previous")}
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                  fontFamily: direction === "rtl" ? '"Noto Kufi Arabic", sans-serif' : undefined,
                  fontWeight: 700,
                  backgroundColor: "#DE1E27",
                }}
                disabled={activeStep === 0 && !selected}
              >
                {t("next")}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  fontFamily: direction === "rtl" ? '"Noto Kufi Arabic", sans-serif' : undefined,
                  fontWeight: 700,
                  backgroundColor: "#DE1E27",
                }}
                disabled={isPending || sendingMail}
              >
                {isPending || sendingMail ? t("sending") : t("submit")}
              </Button>
            )}
          </Box>

          {(isSuccess || isError || mailError) && (
            <Box
              sx={{
                mt: 4,
                textAlign: "center",
                fontFamily: direction === "rtl" ? '"Noto Kufi Arabic", sans-serif' : undefined,
              }}
            >
              {isSuccess && (
                <Typography className={styles.arabica} sx={{ color: "success.main" }}>
                  {t("form2.success")}
                </Typography>
              )}
              {isError && (
                <Typography sx={{ color: "error.main" }}>
                  {error?.message}
                </Typography>
              )}
              {mailError && (
                <Typography sx={{ color: "error.main" }}>
                  {t("form2.mail_error")}: {mailError}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
