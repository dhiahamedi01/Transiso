'use client';

import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Nav from './Components/Navbar/Nav'; // ajuste le chemin si besoin
import AOSInit from './Components/AOSInit';
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
          <Nav />       
          {children}    
        </ThemeProvider>
      </body>
    </html>
  );
}
