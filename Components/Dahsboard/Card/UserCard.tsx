'use client';

import Image from 'next/image';
import { Button, Typography, Box } from '@mui/material';
import styles from './UserCard.module.css';

export default function UserCard() {
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
            alt="Henry Price"
            width={70}
            height={70}
            className={styles.avatar}
          />
        </Box>
<Box className={styles.textleft}>
        <Typography className={styles.name}>Amal Jdidi</Typography>
        <Typography className={styles.role}>Freight forwarder</Typography>
</Box>
<Box className={styles.textright}>
        <Box className={styles.stats}>
          <Box className={styles.statItem}>
            <Typography className={styles.statValue}>125</Typography>
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
