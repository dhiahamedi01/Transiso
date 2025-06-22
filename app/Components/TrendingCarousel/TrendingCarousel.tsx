'use client';

import { Box, Card, CardMedia, CardContent, Typography, Chip, Rating, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ViewList } from '@mui/icons-material';
type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  rating: number;
  description: string;
};

const products: Product[] = [
    {
      id: 1,
      title: "فولاذ مجلفن",
      price: 1200,
      image: "/img/Product/produit1.webp",
      tag: "متوفر",
      rating: 4.8,
      description: "فولاذ عالي الجودة للمشاريع الصناعية."
    },
    {
      id: 2,
      title: "أخشاب معالجة",
      price: 900,
      image: "/img/Product/produit1.webp",
      rating: 4.5,
      description: "خشب متين ومقاوم للرطوبة للأثاث والبناء."
    },
    {
      id: 3,
      title: "زيت نباتي خام",
      price: 600,
      oldPrice: 650,
      image: "/img/Product/produit1.webp",
      tag: "خصم 8%",
      rating: 4.3,
      description: "زيت نباتي  عالي النقاء للاستخدام الغذائي"
    },
    {
      id: 4,
      title: "آلات تعبئة وتغليف",
      price: 3500,
      image: "/img/Product/produit1.webp",
      rating: 4.7,
      description: "معدات حديثة لتغليف المنتجات بكفاءة."
    },
    {
      id: 5,
      title: "حاويات بلاستيكية",
      price: 450,
      oldPrice: 500,
      image: "/img/Product/produit1.webp",
      tag: "خصم 10%",
      rating: 4.6,
      description: "حاويات متعددة الاستخدامات لتخزين المنتجات."
    }
  ];
  

export default function TrendingCarousel() {
  useEffect(() => {
    const font = new FontFace('Noto Kufi Arabic', 'url("/Font/NotoKufiArabic-VariableFont_wght.ttf")', {
      style: 'normal',
      weight: '100 900',
      display: 'swap',
    });
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      document.body.style.fontFamily = "'Noto Kufi Arabic', sans-serif";
    });
  }, []);

  return (
    <Box sx={{ px: 4, py: 6 }}>

<Box
  sx={{
    mx: { xs: 2, sm: 4 },
    mb: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column-reverse', sm: 'row' },
    textAlign: { xs: 'center', sm: 'right' },
    gap: 2,
    fontFamily: 'Noto Kufi Arabic, sans-serif'
  }}
>
  {/* عرض الكل à gauche sur desktop, en haut sur mobile */}
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      cursor: 'pointer',
      color: '#000',
      fontWeight: 'bold',
      fontSize: { xs: '1rem', sm: '1.2rem' }
    }}
  >
    <ViewList />
    <Typography component="span" sx={{ userSelect: 'none', fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
      عرض الكل
    </Typography>
  </Box>

  {/* Titre principal */}
  <Typography
    variant="h5"
    fontWeight="bold"
    color="#0D3546"
    sx={{
      fontFamily: 'Noto Kufi Arabic, sans-serif',
      fontSize: { xs: '1.4rem', sm: '2rem' },
      mb: { xs: 1, sm: 0 }
    }}
  >
    قائمة منتجاتنا
  </Typography>
</Box>

        
      <Box
        sx={{
          position: 'relative',
          '&:hover .nav-button': { opacity: 1 },
        }}
      >
        {/* Bouton gauche */}
        <IconButton
          className="nav-button"
          sx={{
            position: 'absolute',
            top: '50%',
            left: -10,
            zIndex: 2,
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            opacity: 0,
            transition: '0.3s',
            '&:hover': { backgroundColor: '#f1f1f1' }
          }}
          id="prevBtn"
        >
          <ChevronLeft />
        </IconButton>

        {/* Bouton droit */}
        <IconButton
          className="nav-button"
          sx={{
            position: 'absolute',
            top: '50%',
            right: -10,
            zIndex: 2,
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            opacity: 0,
            transition: '0.3s',
            '&:hover': { backgroundColor: '#f1f1f1' }
          }}
          id="nextBtn"
        >
          <ChevronRight />
        </IconButton>

        {/* Carrousel avec padding horizontal visible */}
        <Box sx={{ overflow: 'visible', px: 2 }}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '#nextBtn',
              prevEl: '#prevBtn'
            }}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Box sx={{ mx: 1, height: '100%' }}>
                  <Card
                    sx={{
                      boxShadow: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden',
                      borderBottom: '1px solid #e0e0e0',
                      pb: 2,
                      backgroundColor: '#fff',
                    }}
                  >
                    {product.tag && (
                      <Chip
                        label={product.tag}
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          zIndex: 1,
                          backgroundColor: product.tag.includes('خصم') ? '#e53935' : '#168591',
                          color: 'white',
                          fontFamily: 'Noto Kufi Arabic, sans-serif',
                          borderRadius: '6px',
                          zoom: '0.9',
                          px: 1,
                          py: 0.5,
                          fontSize: '0.75rem',
                        }}
                      />
                    )}

                    <CardMedia sx={{ height: 280, position: 'relative' }}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </CardMedia>

                    <CardContent sx={{ textAlign: 'right', flexGrow: 1 }}>
                      <Typography
                        fontWeight={700}
                        fontSize={18}
                        sx={{ fontFamily: 'Noto Kufi Arabic, sans-serif' }}
                      >
                        {product.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontFamily: 'Noto Kufi Arabic, sans-serif',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          mt: 0.5,
                          mb: 1,
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Rating
                        value={product.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{ direction: 'ltr', mb: 1 }}
                      />

                      <Typography variant="h6" sx={{ fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
                        ${product.price.toFixed(2)}{' '}
                        {product.oldPrice && (
                          <Typography
                            component="span"
                            sx={{ textDecoration: 'line-through', ml: 1, color: 'gray' }}
                          >
                            ${product.oldPrice.toFixed(2)}
                          </Typography>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
