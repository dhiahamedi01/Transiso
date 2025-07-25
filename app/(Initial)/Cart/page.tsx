"use client";

import React from "react";
import CartTable from "./CartTable";
import Style from "./Panier.module.css";
import Link from 'next/link'
import { Box, Typography, Button, TextField } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Panier() {
  return (
    <div className={Style.globale}>
      <div className={Style.Partie1}>
        <CartTable />
      </div>

      <div className={Style.Partie2}>
        {/* قسم الكوبون + المجموع */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          flexWrap="wrap"
          gap={2}
          sx={{ marginTop: "40px", display: "flex", alignItems: "center" }}
        >
          <Box display="flex" gap={1}>
            <TextField size="small" placeholder="كود الخصم" />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#DE1E27",
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                textTransform: "none",
              }}
            >
              تطبيق الكوبون
            </Button>
          </Box>
          <Typography
  variant="h6"
  sx={{
    ml: "auto",
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    fontWeight: 500,
    marginRight:'20px',
    fontSize: '20px',          // plus grand
    color: '#DE1E27',          // couleur orange foncé
  }}
>
  <span style={{ fontWeight: 400, color: '#555' }}>الإجمالي:</span>&ensp;
  1&nbsp;245.00 د.ت
</Typography>


        </Box>

        {/* أزرار الإجراءات */}
        <Box
          display="flex"
          justifyContent="space-between"
          gap={2}
          mt={3}
          sx={{
            flexWrap: "wrap",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#DE1E27",
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              textTransform: "none",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#DE1E27",
              },
            }}
          >
            <ArrowForwardIcon />
            &ensp;إتمام الطلب
          </Button>
          <Link href='/Liste_produit'>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#ccc",
              color: "#fff",
              textTransform: "none",
              fontFamily: "'Noto Kufi Arabic', sans-serif",

              backgroundColor: "#DE1E27",
              "&:hover": {
                backgroundColor: "#f2f2f2",
                color: "#000",
            
              },
            }}
          >
            الرجوع إلى التسوق&ensp;
            <ArrowBackIcon />
          </Button></Link>
        </Box>
      </div>
    </div>
  );
}
