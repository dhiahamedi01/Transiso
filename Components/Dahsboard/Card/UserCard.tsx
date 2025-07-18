'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Typography, Box } from '@mui/material';
import styles from './UserCard.module.css';

export default function UserCard() {
  const [userName, setUserName] = useState('');
  const [productsCount, setProductsCount] = useState(0);

  // Charger le nom utilisateur depuis localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    } else {
      setUserName('Utilisateur');
    }
  }, []);

  // Charger les produits depuis l'API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des produits');
        }
        const data = await response.json();
        setProductsCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error('Fetch error:', error);
        setProductsCount(0);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <Box className={styles.textContainer}>
          <Typography className={styles.welcome}>Welcome Back !</Typography>
          <Typography className={styles.subtitle}>Transiso Dashboard</Typography>
        </Box>
        <Image
          src="/img/card-website.png"
          alt="Illustration"
          width={150}
          height={130}
          className={styles.illustration}
        />
      </Box>

      <Box className={styles.content}>
        <Box className={styles.avatarWrapper}>
          <Image
            src="/img/avatar.jpg"
            alt="Avatar"
            width={70}
            height={70}
            className={styles.avatar}
          />
        </Box>

        <Box className={styles.textleft}>
          <Typography className={styles.name}>{userName}</Typography>
          <Typography className={styles.role}>Freight forwarder</Typography>
        </Box>

        <Box className={styles.textright}>
          <Box className={styles.stats}>
            <Box className={styles.statItem}>
              <Typography className={styles.statValue}>{productsCount}</Typography>
              <Typography className={styles.statLabel}>Products</Typography>
            </Box>
            <Box className={styles.statItem}>
              <Typography className={styles.statValue}>$1245</Typography>
              <Typography className={styles.statLabel}>Revenue</Typography>
            </Box>
          </Box>

          <Button className={styles.viewButton} variant="contained">
            View Profile →
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
