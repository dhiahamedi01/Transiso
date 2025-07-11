'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Box, Paper } from '@mui/material';
import Styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: (string | null | undefined)[];
}

const fallbackImage = '/img/no-image.png'; // image fallback si aucune image

const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  // Nettoyage des images valides, en assurant qu'elles commencent par '/'
  const validImages = images
    .filter((img): img is string => typeof img === 'string' && img.trim() !== '')
    .map(img => {
      if (isAbsoluteUrl(img)) return img;
      if (img.startsWith('/')) return img;
      return '/' + img.trim();
    });

  const [selectedImage, setSelectedImage] = useState<string>(validImages[0] ?? fallbackImage);

  useEffect(() => {
    setSelectedImage(validImages[0] ?? fallbackImage);
  }, [images]);

  return (
    <Box className={Styles.galleryContainer}>
      <Paper elevation={3} className={Styles.mainImage}>
        <Image
          src={selectedImage}
          alt="Image produit principale"
          width={550}
          height={550}
          className={Styles.image}
          priority
          unoptimized={true}
        />
      </Paper>

      <Box className={Styles.thumbnailContainer}>
        {(validImages.length > 0 ? validImages : [fallbackImage]).map((img, idx) => (
          <Paper
            key={idx}
            elevation={selectedImage === img ? 5 : 1}
            className={`${Styles.thumbnail} ${selectedImage === img ? Styles.selected : ''}`}
            onClick={() => setSelectedImage(img)}
            sx={{ cursor: 'pointer' }}
          >
            <Image
              src={img}
              alt={`Miniature produit ${idx + 1}`}
              width={90}
              height={90}
              unoptimized={true}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ImageGallery;
