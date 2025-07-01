'use client';

import { Box, IconButton, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ViewList } from '@mui/icons-material';
import ProductCard from './ProductCard';
import { products as allProducts, ProductRow } from '../ProductList/Data_produit';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  rating: number;
  description: string;
  category?: string;
}

export default function TrendingCarousel() {
  const { t } = useTranslation();

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

  // Transformation de ProductRow en Product avec traduction dynamique
  const topProducts: Product[] = allProducts.slice(0, 10).map((item: ProductRow) => ({
    id: item.id,
    title: t(item.titleKey),
    price: item.price,
    oldPrice: item.oldPrice,
    image: item.image,
    tag: item.tagKey ? t(item.tagKey) : undefined,
    rating: item.rating,
    description: t(item.descKey),
    category: t(item.catKey),
  }));

  return (
    <Box sx={{ px: 4, py: 6, zoom: '0.9', paddingInline: '80px' }}>
      <Box
        sx={{
          mx: { xs: 2, sm: 5 },
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          textAlign: { xs: 'center', sm: 'right' },
          gap: 2,
          direction: 'ltr',
          fontFamily: 'Noto Kufi Arabic, sans-serif',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            color: '#000',
            fontWeight: 'bold',
            fontSize: { xs: '1rem', sm: '1.2rem' },
          }}
        >
          <ViewList />
          <Typography component="span" sx={{ userSelect: 'none', fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
            {t('productList.categories.0')} {/* ici c'est "الكل" depuis ta traduction */}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          color="#0D3546"
          sx={{
            fontSize: { xs: '1.4rem', sm: '2rem' },
            mb: { xs: 1, sm: 0 },
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
        >
          {t('productList.title')} {/* titre traduit dynamique */}
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', '&:hover .nav-button': { opacity: 1 } }}>
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
        >
          <ChevronRight />
        </IconButton>

        <Box sx={{ overflow: 'visible', px: 4 }}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '#nextBtn',
              prevEl: '#prevBtn',
            }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {topProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <Box sx={{ mx: 1, height: '100%' }}>
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
