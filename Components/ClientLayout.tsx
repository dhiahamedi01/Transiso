'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/Components/i18n/i18next';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Nav from '@/Components/Navbar/Nav';
import Footer from '@/Components/Footer/Footer';
import React, { useEffect, useState } from 'react';
import WhatsappButtons from './WhatsappButtons';
import ScrollToTopButton from './ScrollToTopButton';

const theme = createTheme({ palette: { mode: 'light' } });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // ➜ gérer l’attribut dir RTL/LTR
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n.language]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav />
        <WhatsappButtons/>
        <ScrollToTopButton/>
        {children}
        <Footer />
      </ThemeProvider>
    </I18nextProvider>
  );
}
