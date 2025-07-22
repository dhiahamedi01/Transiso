'use client';

import React from 'react';
import { Box, Typography, IconButton, Link as MuiLink, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './Nav.module.css';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import {
  Facebook,
  Twitter,
  Instagram,
  WhatsApp,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';

type SocialPlatform = 'facebook' | 'twitter' | 'instagram' | 'whatsapp';

type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

interface TopBarProps {
  email: string;
  location: string;
  socialLinks: SocialLink[];
}

// Remplacer JSX.Element par React.ReactNode ici
const iconMap: Record<SocialPlatform, React.ReactNode> = {
  facebook: <Facebook fontSize="small" />,
  twitter: <Twitter fontSize="small" />,
  instagram: <Instagram fontSize="small" />,
  whatsapp: <WhatsApp fontSize="small" />,
};

const TopBar: React.FC<TopBarProps> = ({ email, location, socialLinks }) => {
  const { t, i18n } = useTranslation('common');
  const isMobile = useMediaQuery('(max-width:900px)', { noSsr: true });

  return (
    <div className={`${styles.topBar} ${!isMobile && i18n.language === 'ar' ? styles.rtl : ''}`}>
      <div className={styles.left}>
        {location && (
          <div className={styles.infoItem}>
            <LocationOn fontSize="small" sx={{ color: '#DE1E27' }} />
            <Typography sx={{ fontWeight: 300 }} className={styles.icon_topbar}>
              {location}
            </Typography>
          </div>
        )}

        <span className={styles.separator}>|</span>

        {email && (
          <div className={styles.infoItem}>
            <Email fontSize="small" sx={{ color: '#DE1E27' }} />
            <Typography sx={{ fontWeight: 300 }} className={styles.icon_topbar}>
              {email}
            </Typography>
          </div>
        )}

        {!isMobile && (
          <>
            <span className={styles.separator}>|</span>
            <div className={styles.infoItem}>
              <AccessTime fontSize="small" sx={{ color: '#DE1E27' }} />
              <Typography className={styles.Arabe} sx={{ fontWeight: 300 }}>
                {t('workingHours')}
              </Typography>
            </div>
          </>
        )}
      </div>

      {!isMobile && (
        <div className={styles.right}>
          <LanguageSelector />
          <MuiLink href="/Demande" underline="none" className={`${styles.Arabe} ${styles.link2}`}>
            {t('inquiryOnline')}
          </MuiLink>
          <Typography className={styles.Arabe}>{t('followUs')}</Typography>

          <div className={styles.Liste_icon}>
            {socialLinks.map(({ id, platform, url }) => {
              const key = platform.toLowerCase() as SocialPlatform;
              const icon = iconMap[key];
              if (!icon || !url) return null;

              return (
                <IconButton
                  key={id}
                  size="small"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className={styles.icon}
                >
                  {icon}
                </IconButton>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
