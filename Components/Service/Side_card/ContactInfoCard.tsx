"use client";

import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

// ✅ Import d'un CSS module autorisé partout dans Next.js
import styles from "./ContactInfoCard.module.css";

interface ContactInfoCardProps {
  address?: string;
  phone?: string;
  email?: string;
}

/**
 * ContactInfoCard — Next.js 15 + MUI + TypeScript + CSS module
 * ------------------------------------------------------------
 * Tous les styles vivent dans `ContactInfoCard.module.css`, ce qui
 * respecte les règles de Next.js (global CSS uniquement dans root layout).
 */
const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  address = "اسنيورت، اسطنبول، تركيا",
  phone = "5377671027 (90+)",
  email = "info@transisologistic.com",
}) => {
  return (
    <Card elevation={0} className={styles.contactCard}>
      {/* Titre ---------------------------------------------------------- */}
      <Typography variant="h5" fontWeight={700} className={styles.Arabic2}>
      معلومات الاتصال
      </Typography>
      <div className={styles.titleUnderline} />

      {/* Adresse -------------------------------------------------------- */}
      <Box className={styles.globale}>
      <Box className={styles.row}>
        <Box className={styles.iconWrapper}>
          <LocationOnIcon fontSize="medium" />
        </Box>
        <Typography
          variant="body1"
          whiteSpace="pre-line"
          sx={{ flexGrow: 1 }}
          className={styles.Arabic}
        >
          {address}
        </Typography>
      </Box>

      <div className={styles['divider-gradient']} />


      {/* Téléphone ------------------------------------------------------- */}
      <Box className={styles.row}>
        <Box className={styles.iconWrapper}>
          <PhoneIcon fontSize="medium" />
        </Box>
        <Typography variant="body1" sx={{ flexGrow: 1 }} className={styles.Arabic}>
          {phone}
        </Typography>
      </Box>

      <div className={styles['divider-gradient']} />


      {/* Email ---------------------------------------------------------- */}
      <Box className={styles.row}>
        <Box className={styles.iconWrapper}>
          <EmailIcon fontSize="small" />
        </Box>
        <Typography variant="body1" sx={{ flexGrow: 1 }} className={styles.Arabic}>
          {email}
        </Typography>
      </Box>
      </Box>
    </Card>
  );
};

export default ContactInfoCard;
