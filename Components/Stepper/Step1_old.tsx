"use client";

import { Box, CircularProgress, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import styles from "./StepperArabic.module.css";

type ServiceType = {
  id: number;
  name: string;
};

type Step1Props = {
  services: ServiceType[];
  selected: string;
  loadingServices: boolean;
  fetchError: string | null;
  handleRadioChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSelected: (val: string) => void;
};

export default function Step1({
  services,
  selected,
  loadingServices,
  fetchError,
  handleRadioChange,
  setSelected,
}: Step1Props) {
  if (loadingServices) {
    return (
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (fetchError) {
    return (
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
    );
  }

  return (
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
}
