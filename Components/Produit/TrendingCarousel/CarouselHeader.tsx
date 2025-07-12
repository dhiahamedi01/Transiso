import { useEffect } from 'react';
import { Box, Typography, Link, useMediaQuery } from '@mui/material';

function CarouselHeader() {
  const isMobile = useMediaQuery('(max-width:768px)');

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
      document.body.style.fontFamily = "'Noto Kufi Arabic', sans-serif";
    });
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 2, sm: '3%' },  // mobile un peu moins de padding, desktop inchangé
        py: 3,
        fontFamily: "'Noto Kufi Arabic', sans-serif",
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
          direction: 'rtl',
        }}
      >
        <Box sx={{ position: 'relative', pb: '6px', flex: '1 1 auto', minWidth: 0 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '16px', sm: '22px' }, // réduit en mobile
              fontWeight: '500',
              color: '#0D3547',
              marginBottom: '10px',
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            عروض الأسبوع
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: 3,
              width: { xs: '90px', sm: '15%' },  // barre rouge plus courte en mobile
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
              fontSize: { xs: 11, sm: 13 }, // plus petit en mobile
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            سارع قبل انتهاء العرض!
          </Box>
          <Link
            href="/Liste_produit"
            underline="none"
            sx={{
              fontSize: { xs: 12, sm: 14 }, // plus petit en mobile
              color: '#333',
              whiteSpace: 'nowrap',
              '&:hover': { color: '#E22121' },
            }}
          >
            عرض الكل &gt;
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default CarouselHeader;
