
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images – tu gardes ton réglage
  images: {
    unoptimized: true,
  },

  // ────────────────────────────────
  // Internationalisation native Next.js
  // ────────────────────────────────
  i18n: {
    // ⚠️  liste EXACTEMENT les dossiers que tu as créés dans /public/locales
    locales: ['en', 'tr', 'ar'],
    defaultLocale: 'en',

    // (optionnel) empê­che la redirection auto selon l’Accept‑Language
    // localeDetection: false,
  },
};

module.exports = nextConfig;