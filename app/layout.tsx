// app/[lang]/layout.tsx
import './globals.css';

import { languages } from '@/Components/i18n/settings';
import Providers from '@/Components/Providers';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <title>Transiso Logistic</title>
      <meta name="description" content="Bienvenue sur Transiso Logistic, votre solution logistique fiable." />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.transisologistic.com" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
