'use client';

import { useParams } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';
import Produit_detaille from '@/Components/Produit/ProductList/Produit_detaille';
import TrendingCarousel from '@/Components/Produit/TrendingCarousel/TrendingCarousel';
import { useProduct } from '@/hooks/useProduct';

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { product, loading, error } = useProduct(id);

  if (loading) {
    return (
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
      }}
    >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">
          Produit introuvable.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Produit_detaille product={product} />
      <br /><br /><br />
      <TrendingCarousel />
      <br /><br /><br />
    </>
  );
}
