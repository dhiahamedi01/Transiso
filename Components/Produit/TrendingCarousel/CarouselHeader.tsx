'use client';

import { useEffect } from 'react';
import { Box, Typography, Link, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

function CarouselHeader() {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery('(max-width:768px)');
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const font = new FontFace(
      'Noto Kufi Arabic',
      'url("/Font/NotoKufiArabic-VariableFont_wght.ttf")',
      {
        style: 'normal',
        weight: '100 900',
        display: 'swap',
      }
    );
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 2, sm: '3%' },
        py: 3,
        fontFamily: i18n.language === 'ar' ? "'Noto Kufi Arabic', sans-serif" : 'inherit',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
          flexWrap: 'wrap',
          gap: 1,
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'relative', pb: '6px', flex: '1 1 auto', minWidth: 0 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '16px', sm: '22px' },
              fontWeight: '500',
              color: '#0D3547',
              marginBottom: '10px',
              fontFamily: i18n.language === 'ar' ? "'Noto Kufi Arabic', sans-serif" : 'inherit',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {t('carousel.title')}
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              [isRTL ? 'right' : 'left']: 0,
              height: 3,
              width: { xs: '90px', sm: '15%' },
              bgcolor: '#E22121',
              borderRadius: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexShrink: 0,
            flexWrap: 'nowrap',
          }}
        >
          <Box
            sx={{
              bgcolor: '#E22121',
              color: 'white',
              px: { xs: 1.5, sm: 2 },
              py: 0.6,
              borderRadius: 20,
              fontSize: { xs: 11, sm: 13 },
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {t('carousel.badge')}
          </Box>
          <Link
            href="/Liste_produit"
            underline="none"
            sx={{
              fontSize: { xs: 12, sm: 14 },
              color: '#333',
              whiteSpace: 'nowrap',
              '&:hover': { color: '#E22121' },
            }}
          >
            {t('carousel.viewAll')} &gt;
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default CarouselHeader;
