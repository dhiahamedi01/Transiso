import './globals.css';

import { languages } from '@/Components/i18n/settings';
import Providers from '@/Components/Providers';
import type { Metadata } from 'next'
export async function generarateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}


export const metadata: Metadata = {
  title: 'Transiso Logistic',
  description: 'Welcome to Transiso Logistic, your reliable logistics solution.',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
