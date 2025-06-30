import './globals.css'; // ou autre fichier CSS global
import { dir } from 'i18next';
import { languages } from '@/Components/i18n/settings'; // si tu as un fichier de config
import ClientLayout from '@/Components/ClientLayout';

export async function generateStaticParams() {
  return languages.map((lng: (typeof languages)[number]) => ({ lang: lng }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} >
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
