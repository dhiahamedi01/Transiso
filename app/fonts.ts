import localFont from 'next/font/local';

export const notoKufi = localFont({
  src: [
    { path: '/Font/NotoKufiArabic-VariableFont_wght.ttf', weight: '400', style: 'normal' },
    { path: '/Font/static/NotoKufiArabic-Bold.ttf',    weight: '700', style: 'normal' },
  ],
  variable: '--font-ar',
  display: 'swap',
});
