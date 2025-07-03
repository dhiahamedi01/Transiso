'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/Components/i18n/i18next';

import React, { useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({ palette: { mode: 'light' } });

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n.language]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}
