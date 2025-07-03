import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';

function Page() {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'rtl',
          fontFamily: "'Poppins', sans-serif",
          paddingInline:'10px',
        }}
      >
        {/* Fil d’Ariane à gauche */}
        <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ fontSize: 14 }}>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            sx={{ cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}
          >
            Dashboards
          </Link>
          <Typography
            color="text.primary"
            fontWeight="500"
            sx={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Dashboard
          </Typography>
        </Breadcrumbs>

        {/* Titre à droite */}
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ color: '#495057', fontSize: '19px', fontFamily: "'Poppins', sans-serif" }}
        >
          Dashboard
        </Typography>
      </Box>
    </div>
  );
}

export default Page;
