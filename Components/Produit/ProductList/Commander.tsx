import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  useTheme
} from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const ProductActions = () => {
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);

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
      {/* Commander maintenant */}
      <Link href="http://localhost:3000/Panier" legacyBehavior>
        <a style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<FlashOnIcon />}
            sx={{
              py: 1.8,
              px: 6,
              width: '300px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display:'flex',
              gap:'6px',
              direction:'ltr',
              fontFamily: 'Noto Kufi Arabic',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              backgroundColor: '#E53935',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#E53935',
              },
              '@media (max-width: 768px)': {
                width: '100%',
              },
            }}
          >
            اطلب الآن
          </Button>
        </a>
      </Link>

      {/* Ajouter au panier */}
      <Link href="http://localhost:3000/Panier" legacyBehavior>
        <a style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<LocalMallIcon />}
            sx={{
              py: 1.8,
              px: 6,
              width: '300px',
              fontSize: '1.05rem',
              fontFamily: 'Noto Kufi Arabic',
              textTransform: 'none',
              borderWidth: 2,
              display:'flex',
              gap:'10px',
              direction:'ltr',
              whiteSpace: 'nowrap',
              color: '#fff',
              backgroundColor: 'black',
              borderColor: 'black',
              fontWeight: 400,
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#111',
                borderColor: 'black',
              },
              '@media (max-width: 768px)': {
                width: '100%',
              },
            }}
          >
            أضف إلى السلة
          </Button>
        </a>
      </Link>
    </Box>
  );
};

export default ProductActions;
