'use client';

import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Nav from '@/Components/Navbar/Nav'; 
import AOSInit from '@/Components/AOSInit';
import ScrollToTopButton from '@/Components/ScrollToTopButton';
import WhatsappButtons from '@/Components/WhatsappButtons';
import Footer from '@/Components/Footer/Footer';

const theme = createTheme({
  palette: {
    mode: 'light', 
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AOSInit/>
          <Nav/>    
          <ScrollToTopButton/>
          <WhatsappButtons/>
          {children}    
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
