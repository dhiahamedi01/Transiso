import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Paper } from '@mui/material';
import Styles from './ImageGallery.module.css';

const images = [
    '/img/Product/produit2.png',
    '/img/Product/produit1.webp',
    '/img/Product/produit3.png',
    '/img/Product/produit4.png',
    '/img/Product/produit1.webp',
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <Box className={Styles.galleryContainer}>
      {/* Image principale */}
      <Paper elevation={3} className={Styles.mainImage}>
        <Image
          src={selectedImage}
          alt="Main"
          width={550}
          height={660}
          className={Styles.image}
        />
      </Paper>

      {/* Miniatures */}
      <Box className={Styles.thumbnailContainer}>
        {images.map((img, idx) => (
          <Paper
            key={idx}
            elevation={selectedImage === img ? 5 : 1}
            className={`${Styles.thumbnail} ${
              selectedImage === img ? Styles.selected : ''
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <Image src={img} alt={`thumb-${idx}`} width={100} height={110} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ImageGallery;







