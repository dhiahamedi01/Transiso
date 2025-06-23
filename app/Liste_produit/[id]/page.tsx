'use client';

import { useParams } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import Produit_detaille from '../../Components/Produit/ProductList/Produit_detaille'
export default function ProductDetail() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Produit_detaille/>
    </>
  );
}
