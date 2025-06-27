import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Paper } from '@mui/material';
import Styles from './ImageGallery.module.css';

const images = [
    '/img/Product/Produit_detaille.png',
    '/img/Product/Produit_detaille2.png',
    '/img/Product/Produit_detaille3.png',
    '/img/Product/produit4.png',
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
          height={550}
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
            <Image src={img} alt={`thumb-${idx}`} width={90} height={90} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ImageGallery;







