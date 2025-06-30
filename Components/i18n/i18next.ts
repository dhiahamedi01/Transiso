import i18next, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../../public/locales/en/common.json';
import trCommon from '../../public/locales/tr/common.json';
import arCommon from '../../public/locales/ar/common.json';

export const languages = ['en', 'tr', 'ar'] as const;
export const fallbackLng = 'en';
export const defaultNS = 'common';

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      lng: fallbackLng,
      fallbackLng,
      supportedLngs: languages,
      defaultNS,
      resources: {
        en: { common: enCommon },
        tr: { common: trCommon },
        ar: { common: arCommon },
      },
      react: { useSuspense: false },
    } as InitOptions);
}

export default i18next;
