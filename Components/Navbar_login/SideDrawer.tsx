'use client';
import { Box, Drawer, List, ListItem, Typography, Divider, IconButton, Link as MuiLink } from '@mui/material';
import { Facebook, Twitter, Instagram, WhatsApp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import styles from './Nav.module.css';

const SideDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { t } = useTranslation('common');

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/About' },
    { label: t('services'), href: '/Services' },
    { label: 'لوحة التحكم', href: '/Dashboard' },
    { label: t('contact'), href: '/Contact' },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 2 }}>
        <List>
          {navItems.map(({ label, href }) => (
            <ListItem key={href}>
              <MuiLink component={Link} href={href} underline="none" className={`${styles.Arabe} ${styles.link}`} onClick={onClose}>
                {label}
              </MuiLink>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ mt: 2 }}>
          <Typography className={styles.Arabe} sx={{ mb: 1 }}>{t('workingHours')}</Typography>
          <LanguageSelector />
          <MuiLink component={Link} href="#" underline="none" className={`${styles.Arabe} ${styles.link}`} onClick={onClose}>
            {t('inquiryOnline')}
          </MuiLink>
          <Typography className={styles.Arabe} sx={{ mt: 1 }}>{t('followUs')}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[Facebook, Twitter, WhatsApp, Instagram].map((Icon, i) => (
              <IconButton key={i} size="small"><Icon fontSize="small" /></IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
