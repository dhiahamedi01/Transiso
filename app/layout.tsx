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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
