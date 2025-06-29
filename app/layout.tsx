'use client';

import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Nav from '@/Components/Navbar/Nav'; 
import AOSInit from '@/Components/AOSInit';
import ScrollToTopButton from '@/Components/ScrollToTopButton';
import WhatsappButtons from '@/Components/WhatsappButtons';
import Footer from '@/Components/Footer/Footer';
import SearchModal from '@/Components/SearchModal/SearchModal';
import  { useState } from 'react';
const theme = createTheme({
  palette: {
    mode: 'light', 
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AOSInit/>
          <Nav/>    
          <SearchModal open={open} onClose={() => setOpen(false)} />
          <ScrollToTopButton/>
          <WhatsappButtons/>
          {children}    
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
