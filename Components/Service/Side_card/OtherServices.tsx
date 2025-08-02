'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography, Stack } from '@mui/material';
import style from './OtherServices.module.css';
import { useTranslation } from 'react-i18next';

type Service = {
  id: number;
  title: string;
  img: string;
  slug: string;
};

export default function OtherServices() {
  const { t } = useTranslation();

  // services créé ici, après récupération de la fonction t()
  const services: Service[] = [
  
    { id: 1, title: t('card2.sea_shipping'), img: '/img/Service/other_3-1.jpg', slug: 'Sea' },
    { id: 2, title: t('card2.air_shipping'), img: '/img/Service/other4.jpg', slug: 'Plane' },
    { id: 3, title: t('card2.land_shipping'), img: '/img/Service/other_1-1.jpg', slug: 'truck' },
  ];

  return (
    <Box sx={{ maxWidth: 380, mx: 'auto', mt: 4 }}>
      <Stack spacing={1.5}>
        {services.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </Stack>
    </Box>
  );
}

interface CardProps extends Service {}

function ServiceCard({ id, title, img, slug }: CardProps) {
  return (
    <Box
      component={Link}
      href={`/Services/${slug}`}
      role="link"
      tabIndex={0}
      sx={{
        display: 'block',
        textDecoration: 'none',
        position: 'relative',
        height: 96,
        overflow: 'hidden',
        borderRadius: 1,
        cursor: 'pointer',
        '& .picture': { transition: 'transform 0.35s ease' },
        '&:hover .picture': { transform: 'scale(1.06)' },
        '& .mask': { opacity: 0.3, transition: 'opacity 0.35s ease' },
        '&:hover .mask': { opacity: 1 },
      }}
    >
      <Image
        src={img}
        alt={title}
        fill
        sizes="(max-width: 600px) 100vw, 380px"
        className="picture"
        style={{ objectFit: 'cover' }}
      />
      <Box
        className="mask"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(12, 54, 69, 0.55)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="#fff"
          className={style.text}
          sx={{ fontSize: 18, fontFamily: 'Noto Kufi Arabic' }}
        >
          {title}
        </Typography>

        <Typography
          fontWeight={700}
          color="rgba(255,255,255,0.4)"
          sx={{ fontSize: 48, lineHeight: 1, fontFamily: 'Noto Kufi Arabic' }}
        >
          {id.toString().padStart(2, '0')}
        </Typography>
      </Box>
    </Box>
  );
}
