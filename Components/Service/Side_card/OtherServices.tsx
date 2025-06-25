'use client';

import Image from 'next/image';
import { Box, Typography, Stack } from '@mui/material';
import style from './OtherServices.module.css'
/* --------------------------------------------------------- */
/* Données (inchangées)                                      */
/* --------------------------------------------------------- */
type Service = { id: number; title: string; img: string };

const services: Service[] = [
  { id: 1, title: 'شحن بالشاحنة', img: '/img/Service/other_1-1.jpg' },
  { id: 2, title: 'شحن بالقطار',  img: '/img/Service/other_2-1.jpg' },
  { id: 3, title: 'شحن بحري',     img: '/img/Service/other_3-1.jpg' },
  { id: 4, title: 'شحن بالطائرة',     img: '/img/Service/other4.jpg' }
];

/* --------------------------------------------------------- */
/* Composant principal                                       */
/* --------------------------------------------------------- */
export default function OtherServices() {
  return (
    <Box sx={{ maxWidth: 380, mx: 'auto',marginTop:'30px', }}>

      <Stack spacing={1.5}>
        {services.map(s => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </Stack>
    </Box>
  );
}

/* --------------------------------------------------------- */
/* Carte unique                                              */
/* --------------------------------------------------------- */
interface CardProps extends Service {}

function ServiceCard({ id, title, img }: CardProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 96,
        overflow: 'hidden',
        borderRadius: 1,
        cursor: 'pointer',

        /* -------- HOVER STATES -------- */
        '& .picture': {
          transition: 'transform .35s ease'
        },
        '&:hover .picture': {
          transform: 'scale(1.06)'
        },
        '& .mask': {
          opacity: 0.3,
          transition: 'opacity .35s ease'
        },
        '&:hover .mask': {
          opacity: 1
        }
      }}
    >
      {/* Image */}
      <Image
        src={img}
        alt={title}
        fill
        className="picture"                 // ← ciblée pour le zoom
        sizes="(max-width: 600px) 100vw, 380px"
        style={{ objectFit: 'cover' }}
      />

      {/* Masque couleur 0C3645 */}
      <Box
        className="mask"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(12,54,69,.55)'
        }}
      />

      {/* Texte + numéro */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="#fff"
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
