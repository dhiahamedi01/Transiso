'use client';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Rating,
  Box,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type Product = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  rating: number;
  description: string;
  category?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Link href={`/Liste_produit/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: '100%',
          height: isMobile ? 280 : 360, // hauteur fixe
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // évite l’espace blanc en bas
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          boxShadow: 1,
          mb: 2,
        }}
      >
        {product.tag && (
          <Chip
            label={product.tag}
            sx={{
              position: 'absolute',
              top: 10,
              right: isRTL ? undefined : 10,
              left: isRTL ? 10 : undefined,
              zIndex: 2,
              backgroundColor: '#f0a500',
              color: '#fff',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontWeight: 700,
              borderRadius: '20px',
              px: 1.5,
              py: 0.5,
              fontSize: '0.65rem',
            }}
          />
        )}

        <CardMedia sx={{ height: isMobile ? 130 : 190, position: 'relative' }}>
          <Image
            src={product.image ? `/${product.image}` : '/img/no-image.png'}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>

        <CardContent
          sx={{
            textAlign: isRTL ? 'right' : 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            px: 1.5,
            pt: 1,
            minHeight: 'auto', // laisse la hauteur naturelle au contenu
            // flexGrow: 1 supprimé pour éviter expansion inutile
          }}
        >
          {product.category && (
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                color: '#888',
                fontSize: '0.7rem',
              }}
            >
              {product.category}
            </Typography>
          )}

          <Typography
            sx={{
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontWeight: 600,
              fontSize: '0.8rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '2.2rem',
            }}
          >
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 1,
              mt: 1,
            }}
          >
            {product.oldPrice && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: '#999',
                  fontSize: '0.75rem',
                }}
              >
                €{product.oldPrice.toLocaleString()}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                color: '#e64a19',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              €{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
