'use client';

import { Box, Card, CardMedia, CardContent, Typography, Chip, Rating } from '@mui/material';
import Image from 'next/image';

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

export default function ProductCard({ product }: { product: Product }) {
  return (
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
            direction:'rtl',
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
  );
}
