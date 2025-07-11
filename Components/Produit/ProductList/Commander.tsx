'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const ProductActions = ({ product }: { product: any }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleCheckout = () => {
    router.push(`/checkout?productId=${product.id}`);
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 3,
        flexWrap: 'wrap',
        paddingTop: 3,
        '@media (max-width: 768px)': {
          gap: 2,
        },
      }}
    >
      <Button
        variant="contained"
        size="large"
        startIcon={<FlashOnIcon />}
        onClick={handleCheckout}
        sx={{
          py: 1.3,
          px: 6,
          width: '270px',
          fontSize: '1.1rem',
          display: 'flex',
          gap: '6px',
          direction: 'ltr',
          fontFamily: 'Noto Kufi Arabic',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          backgroundColor: '#E53935',
          borderRadius: '6px',
          '&:hover': {
            backgroundColor: '#E53935',
          },
          '@media (max-width: 768px)': {
            width: '100%',
          },
        }}
      >
        {t('orderNow')}
      </Button>

      <Link href="/Panier" legacyBehavior>
        <a style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<LocalMallIcon />}
            sx={{
              py: 1.3,
              px: 6,
              width: '270px',
              fontSize: '1.05rem',
              fontFamily: 'Noto Kufi Arabic',
              textTransform: 'none',
              borderWidth: 2,
              display: 'flex',
              gap: '10px',
              direction: 'ltr',
              whiteSpace: 'nowrap',
              color: '#fff',
              backgroundColor: 'black',
              borderColor: 'black',
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#111',
                borderColor: 'black',
              },
              '@media (max-width: 768px)': {
                width: '100%',
              },
            }}
          >
            {t('addToCart')}
          </Button>
        </a>
      </Link>
    </Box>
  );
};

export default ProductActions;
