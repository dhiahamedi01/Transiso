'use client';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Rating,
  Box,
  IconButton,
  Fade,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/Liste_produit/${product.id}`} style={{ textDecoration: 'none' }}>
      <Box sx={{ cursor: 'pointer', height: '100%' }}>
        <Card
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            boxShadow: 3,
            height: '100%',
            minHeight: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid #e0e0e0',
            zoom: 0.9,
            direction: isRTL ? 'rtl' : 'ltr',
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
                right: isRTL ? undefined : 10,
                left: isRTL ? 10 : undefined,
                zIndex: 2,
                backgroundColor:
                  product.tag.includes('%') || product.tag.includes('خصم')
                    ? '#e53935'
                    : '#168591',
                color: '#fff',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                borderRadius: '6px',
                px: 1,
                py: 0.5,
                fontSize: '0.75rem',
                direction: isRTL ? 'rtl' : 'ltr',
              }}
            />
          )}

          <CardMedia sx={{ height: 300, position: 'relative' }}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              style={{ objectFit: 'cover', transition: '0.3s ease' }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: hovered ? 'rgba(0,0,0,0.1)' : 'transparent',
                transition: '0.3s ease',
                zIndex: 1,
              }}
            />

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
                {[FavoriteBorderIcon, VisibilityOutlinedIcon, BookmarkBorderOutlinedIcon].map(
                  (Icon, i) => (
                    <IconButton
                      key={i}
                      sx={{
                        backgroundColor: '#fff',
                        p: 1,
                        '&:hover': { backgroundColor: '#eee' },
                      }}
                    >
                      <Icon fontSize="small" sx={{ color: '#3a3a3a' }} />
                    </IconButton>
                  )
                )}
              </Box>
            </Fade>
          </CardMedia>

          <CardContent
            sx={{
              textAlign: isRTL ? 'right' : 'left',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
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
                minHeight: '3.2em',
              }}
            >
              {product.description}
            </Typography>

            <Box sx={{ direction: 'rtl', mb: 1 }}>
                <Rating
                  value={product.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{ direction: 'ltr' }}
                />
              </Box>


            <Typography variant="h6" sx={{ fontFamily: 'Noto Kufi Arabic, sans-serif' }}>
              ${product.price.toFixed(2)}{' '}
              {product.oldPrice && (
                <Typography
                  component="span"
                  sx={{
                    textDecoration: 'line-through',
                    ml: isRTL ? 0 : 1,
                    mr: isRTL ? 1 : 0,
                    color: 'gray',
                  }}
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
