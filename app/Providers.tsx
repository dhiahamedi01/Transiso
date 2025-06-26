'use client';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Nav      from '@/Components/Navbar/Nav';
import AOSInit  from '@/Components/AOSInit';

const theme = createTheme({
  palette: { mode: 'light' },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AOSInit />
      <Nav />
      {children}
    </ThemeProvider>
  );
}
