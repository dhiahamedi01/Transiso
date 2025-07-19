'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useTranslation } from 'react-i18next';

const ProductActions = ({ product }: { product: any }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleCheckout = () => {
    router.push(`/checkout?productId=${product.id}`);
  };

  const handleAddToCart = () => {
    try {
      const cartRaw = localStorage.getItem('cart');
      const cart = cartRaw ? JSON.parse(cartRaw) : [];

      const existingProduct = cart.find((item: any) => item.id === product.id);

      if (existingProduct) {
        // Produit déjà dans le panier -> afficher erreur, ne rien changer
        setSnackbarMessage(t(' product Already In Cart') || 'Produit déjà ajouté au panier');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } else {
        // Ajouter produit
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image1 || '',
          quantity: 1,
        });

        localStorage.setItem('cart', JSON.stringify(cart));

        setSnackbarMessage(t('addedToCart') || 'Produit ajouté au panier');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        // Déclencher un événement custom pour mettre à jour le badge du panier dans la navbar
        window.dispatchEvent(new Event('cartUpdated'));
      }

    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier', error);
      setSnackbarMessage(t('errorAddToCart') || 'Erreur lors de l\'ajout au panier');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <>
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
              maxWidth: '200px',
              fontSize: '0.95rem',
              px: 2,
              py: 1,
              gap: '4px',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.85rem',
              px: 1.5,
              py: 0.8,
            },
          }}
        >
          {t('orderNow')}
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<LocalMallIcon />}
          onClick={handleAddToCart}
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
              fontSize: '0.95rem',
              px: 2,
              py: 1,
              gap: '4px',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.85rem',
              px: 1.5,
              py: 0.8,
            },
          }}
        >
          {t('addToCart')}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductActions;
