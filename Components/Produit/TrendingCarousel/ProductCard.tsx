'use client';

import { Card, CardMedia, CardContent, Typography, Chip, Rating, Box, IconButton, Fade } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/Liste_produit/${product.id}`} passHref style={{ textDecoration: 'none' }}>
      <Box sx={{ cursor: 'pointer' }}>
        <Card
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            boxShadow: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid #e0e0e0',
            zoom: '0.9',
            pb: 2,
            backgroundColor: '#fff',
          }}
        >
          {/* Étiquette promotionnelle */}
          {product.tag && (
            <Chip
              label={product.tag}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 2,
                backgroundColor: product.tag.includes('خصم') ? '#e53935' : '#168591',
                color: 'white',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                borderRadius: '6px',
                px: 1,
                py: 0.5,
                fontSize: '0.75rem',
                direction: 'rtl',
              }}
            />
          )}

          {/* Image produit + overlay icônes */}
          <CardMedia sx={{ height: 300, position: 'relative' }}>
            <Image src={product.image} alt={product.title} fill style={{ objectFit: 'cover', transition: '0.3s ease' }} />
            
            {/* Overlay sombre au survol */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: hovered ? 'rgba(0,0,0,0.1)' : 'transparent',
                transition: '0.3s ease',
                zIndex: 1,
              }}
            />

            {/* Icônes flottantes */}
            <Fade in={hovered}>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                  zIndex: 2,
                }}
              >
                <IconButton sx={{ backgroundColor: '#fff', p: 1, '&:hover': { backgroundColor: '#eee' } }}>
                  <FavoriteBorderIcon fontSize="small" sx={{color:'#3a3a3a'}} />
                </IconButton>
                <IconButton sx={{ backgroundColor: '#fff', p: 1, '&:hover': { backgroundColor: '#eee' } }}>
                  <VisibilityOutlinedIcon fontSize="small" sx={{color:'#3a3a3a'}} />
                </IconButton>
                <IconButton sx={{ backgroundColor: '#fff', p: 1, '&:hover': { backgroundColor: '#eee' } }}>
                  <BookmarkBorderOutlinedIcon fontSize="small" sx={{color:'#3a3a3a'}}/>
                </IconButton>
              </Box>
            </Fade>
          </CardMedia>

          {/* Contenu de la carte */}
          <CardContent sx={{ textAlign: 'right', flexGrow: 1 }}>
            {/* Catégorie */}
            {product.category && (
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#168591',
                  display: 'block',
                  mb: 0.5,
                  fontSize: '0.75rem',
                }}
              >
                {product.category}
              </Typography>
            )}

            <Typography fontWeight={700} fontSize={18} sx={{ fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
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

            <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ direction: 'ltr', mb: 1 }} />

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
    </Link>
  );
}
