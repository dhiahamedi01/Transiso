'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material';
import BarChartIcon   from '@mui/icons-material/LocalShipping';
import dynamic from 'next/dynamic';
import SearchModal from '../SearchModal/SearchModal';
import styles from './Nav.module.css';
import useLogo from '@/hooks/useLogo';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

// Import du hook socialLinks
import { useSocialLinks } from '@/hooks/useSocialLinks';

// Icônes dynamiques MUI
const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'), { ssr: false });
const SearchIcon = dynamic(() => import('@mui/icons-material/Search'), { ssr: false });
const PhoneIcon = dynamic(() => import('@mui/icons-material/Phone'), { ssr: false });
const TrendingUpIcon = dynamic(() => import('@mui/icons-material/TrendingUp'), { ssr: false });
const LocationOnIcon = dynamic(() => import('@mui/icons-material/LocationOn'), { ssr: false });
const EmailIcon = dynamic(() => import('@mui/icons-material/Email'), { ssr: false });
const AccessTimeIcon = dynamic(() => import('@mui/icons-material/AccessTime'), { ssr: false });

const FacebookIcon = dynamic(() => import('@mui/icons-material/Facebook'), { ssr: false });
const TwitterIcon = dynamic(() => import('@mui/icons-material/Twitter'), { ssr: false });
const WhatsAppIcon = dynamic(() => import('@mui/icons-material/WhatsApp'), { ssr: false });
const InstagramIcon = dynamic(() => import('@mui/icons-material/Instagram'), { ssr: false });
const LinkedInIcon = dynamic(() => import('@mui/icons-material/LinkedIn'), { ssr: false });
const MusicNoteIcon = dynamic(() => import('@mui/icons-material/MusicNote'), { ssr: false }); // TikTok

// Map des icônes (avec clés en minuscules correspondant aux plateformes)
const iconMap: Record<string, React.ReactElement> = {
  facebook: <FacebookIcon fontSize="small" />,
  twitter: <TwitterIcon fontSize="small" />,
  instagram: <InstagramIcon fontSize="small" />,
  linkedin: <LinkedInIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  tiktok: <MusicNoteIcon fontSize="small" />,
};

function Nav() {
  const { t, i18n } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)', { noSsr: true });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  // Social links dynamiques
  const { socialLinks } = useSocialLinks();

  useEffect(() => {
    setIsClient(true);
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    async function fetchInfo() {
      try {
        const res = await fetch('/api/Manage_website/PersonalInformation');
        if (!res.ok) throw new Error('Erreur API');
        const data = await res.json();
        setPhoneNumber(data.phoneNumber || '');
        setEmail(data.email || '');
        setLocation(data.location || '');
      } catch (err) {
        console.error('Erreur de chargement des données de contact :', err);
      }
    }

    fetchInfo();
  }, [i18n.language]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const { logo } = useLogo();

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/About' },
    { label: t('FAQ'), href: '/FAQ' },
    { label: t('services'), href: '/Services' },
    { label: t('contact'), href: '/Contact' },
  ];

  if (!isClient) return null;

  return (
    <>
      {/* Top Bar */}
      <div className={`${styles.topBar} ${!isMobile && i18n.language === 'ar' ? styles.rtl : ''}`}>
        <div className={styles.left}>
          {location && (
            <div className={styles.infoItem}>
              <LocationOnIcon fontSize="small" sx={{ color: '#DE1E27' }} />
              <Typography sx={{ fontWeight: 300 }} className={styles.icon_topbar}>
                {location}
              </Typography>
            </div>
          )}

          <span className={styles.separator}>|</span>

          {email && (
            <div className={styles.infoItem}>
              <EmailIcon fontSize="small" sx={{ color: '#DE1E27' }} />
              <Typography sx={{ fontWeight: 300 }} className={styles.icon_topbar}>
                {email}
              </Typography>
            </div>
          )}

          {!isMobile && (
            <>
              <span className={styles.separator}>|</span>
              <div className={styles.infoItem}>
                <AccessTimeIcon fontSize="small" sx={{ color: '#DE1E27' }} />
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
            <MuiLink component={Link} href="/Price" underline="none" className={`${styles.Arabe} ${styles.link2}`}>
              {t('demande_prix')}
            </MuiLink>
            <Typography className={styles.Arabe}>{t('followUs')}</Typography>

            {/* Social links dynamiques dans top bar */}
            <div className={styles.Liste_icon}>
              {socialLinks.length > 0 ? (
                socialLinks.map(({ id, platform, url }) => {
                  const icon = iconMap[platform.toLowerCase()];
                  if (!icon || !url) return null;
                  return (
                    <IconButton
                      key={id}
                      size="small"
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className={styles.icon}
                    >
                      {icon}
                    </IconButton>
                  );
                })
              ) : (
                <>
                  <IconButton size="small" className={styles.icon} aria-label="Facebook">
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" className={styles.icon} aria-label="Twitter">
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" className={styles.icon} aria-label="WhatsApp">
                    <WhatsAppIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" className={styles.icon} aria-label="Instagram">
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" className={styles.icon} aria-label="TikTok">
                  <MusicNoteIcon fontSize="small" /> 
                </IconButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0} className={`${styles.navbar} ${i18n.language === 'ar' ? styles.rtl : ''}`}>
        <Toolbar className={styles.toolbar}>
          {isMobile && (
            <IconButton edge="start" onClick={openDrawer} className={styles.hamburger}>
              <MenuIcon />
            </IconButton>
          )}

          <Box className={styles.logoBox}>
            <Image src={logo || '/img/logo2.jpg'} alt="Logo" width={190} height={60} priority />
          </Box>

          {!isMobile && (
            <>
              <Box className={styles.navLinks}>
                {navItems.map(({ label, href }) => (
                  <MuiLink key={href} component={Link} href={href} underline="none" className={styles.link}>
                    {label}
                  </MuiLink>
                ))}
              </Box>

              <Box className={styles.rightSection}>
                <IconButton onClick={openSearch}>
                  <SearchIcon className={styles.searchIcon} />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <Link href={`tel:${phoneNumber}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Box className={styles.phoneBox}>
                    <Box className={styles.phoneIconCircle}>
                      <PhoneIcon className={styles.phoneIcon} />
                    </Box>
                    <Typography className={styles.phoneNumber}>
                      {t("phoneNumber")}
                    </Typography>
                  </Box>
                </Link>

                <Link href="https://www.track-trace.com/" passHref>
                    <Button
                      variant="contained"
                      className={styles.trackButton2}
             
                      sx={{ textTransform: 'none' }}
                    >
                      {t('tracking_d')}&ensp;<BarChartIcon   />
                    </Button>
                  </Link>
                <Link href="/Login">
                  <Button variant="contained" className={styles.trackButton}>
                    {t('trackOrder')}
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} disableScrollLock>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {navItems.map(({ label, href }) => (
              <ListItem key={href} disablePadding>
                <MuiLink
                  component={Link}
                  href={href}
                  underline="none"
                  className={`${styles.Arabe} ${styles.link}`}
                  onClick={closeDrawer}
                  sx={{ display: 'block', width: '100%', py: 1 }}
                >
                  {label}
                </MuiLink>
              </ListItem>
            ))}
   
             {isMobile && (
              <ListItem disablePadding>
                <MuiLink
                  component={Link}
                  href="https://www.track-trace.com/"
                  underline="none"
                  className={`${styles.Arabe} ${styles.link}`}
                  onClick={closeDrawer}
                  sx={{ display: 'block', width: '100%', py: 1, fontWeight: 'bold' }}
                >
                  {t('tracking_d')}
                </MuiLink>
              </ListItem>
            )}
            {/* Ajout du trackOrder en mode mobile dans drawer avec lien */}
            {isMobile && (
              <ListItem disablePadding>
                <MuiLink
                  component={Link}
                  href="/Login"
                  underline="none"
                  className={`${styles.Arabe} ${styles.link}`}
                  onClick={closeDrawer}
                  sx={{ display: 'block', width: '100%', py: 1, fontWeight: 'bold'}}
                >
                  {t('trackOrder')}
                </MuiLink>
              </ListItem>
            )}
          
          </List>

          <Divider sx={{ my: 1 }} />
          <Box sx={{ mt: 2 }}>
            <Typography className={styles.Arabe} sx={{ mb: 1 }}>
              {t('workingHours')}
            </Typography>

            <LanguageSelector />

            <MuiLink
              component={Link}
              href="#"
              underline="none"
              className={`${styles.Arabe} ${styles.link}`}
              color="inherit"
              onClick={closeDrawer}
            >
              {t('inquiryOnline')}
            </MuiLink>

            <Typography className={styles.Arabe} sx={{ mt: 1 }}>
              {t('followUs')}
            </Typography>

            {/* Social links dynamiques dans Drawer mobile */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.length > 0 ? (
                socialLinks.map(({ id, platform, url }) => {
                  const icon = iconMap[platform.toLowerCase()];
                  if (!icon || !url) return null;
                  return (
                    <IconButton
                      key={id}
                      size="small"
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                    >
                      {icon}
                    </IconButton>
                  );
                })
              ) : (
                <>
                  <IconButton size="small" aria-label="Facebook"><FacebookIcon fontSize="small" /></IconButton>
                  <IconButton size="small" aria-label="Twitter"><TwitterIcon fontSize="small" /></IconButton>
                  <IconButton size="small" aria-label="WhatsApp"><WhatsAppIcon fontSize="small" /></IconButton>
                  <IconButton size="small" aria-label="Instagram"><InstagramIcon fontSize="small" /></IconButton>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={closeSearch} />
    </>
  );
}

export default React.memo(Nav);
