'use client';

import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';
import { useProducts } from '@/hooks/useProducts';
import CarouselHeader from './CarouselHeader';

export default function TrendingCarousel() {
  const { t, i18n } = useTranslation();
  const { products, loading, error } = useProducts();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error">
          {t('productList.noProducts') || 'Aucun produit à afficher.'}
        </Typography>
      </Box>
    );
  }

  const topProducts = products.slice(0, 10).map((p) => ({
    id: p.id,
    title: p.name,
    price: Number(p.price),
    oldPrice: p.old_price ? Number(p.old_price) : undefined,
    image: p.image1 || '/img/no-image.png',
    rating: 5,
    description: p.description || '',
    category: p.category,
  }));

  return (
    <Box
      dir={isRTL ? 'rtl' : 'ltr'}
      sx={{
        px: { xs: 0, sm: 4, md: 8 },
        py: 6,
        pb: 8,
        fontFamily: "'Noto Kufi Arabic', sans-serif",
      }}
    >
      <CarouselHeader />

      <Box sx={{ position: 'relative', '&:hover .nav-button': { opacity: 1 } }}>
        {!isMobile && (
          <>
            <IconButton
              className="nav-button"
              sx={{
                position: 'absolute',
                top: '50%',
                left: -25,
                zIndex: 2,
                transform: 'translateY(-50%)',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                opacity: 0,
                transition: '0.3s',
                '&:hover': { backgroundColor: '#f1f1f1' },
              }}
              id="prevBtn"
              aria-label="Précédent"
            >
              <ChevronLeft />
            </IconButton>

            <IconButton
              className="nav-button"
              sx={{
                position: 'absolute',
                top: '50%',
                right: -25,
                zIndex: 2,
                transform: 'translateY(-50%)',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                opacity: 0,
                transition: '0.3s',
                '&:hover': { backgroundColor: '#f1f1f1' },
              }}
              id="nextBtn"
              aria-label="Suivant"
            >
              <ChevronRight />
            </IconButton>
          </>
        )}

        <Box sx={{ overflow: 'visible', px: isMobile ? 0 : 1 }}>
          <Swiper
            modules={[Navigation]}
            navigation={
              !isMobile
                ? {
                    nextEl: '#nextBtn',
                    prevEl: '#prevBtn',
                  }
                : false
            }
            spaceBetween={isMobile ? 6 : 12}
            breakpoints={{
              0: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {topProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Box
                  sx={{
                    maxWidth: isMobile ? 180 : 250,
                    height: isMobile ? 310 : '100%',
                    mx: 'auto',
                    paddingBottom: '12px',
                    boxSizing: 'border-box',
                  }}
                >
                  <ProductCard product={product} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
