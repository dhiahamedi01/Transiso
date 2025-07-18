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
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material';

import dynamic from 'next/dynamic';
import SearchModal from '../SearchModal/SearchModal';
import styles from './Nav.module.css';
import useLogo from '@/hooks/useLogo';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

// Import dynamiques des icônes
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

// Map des plateformes aux icônes MUI
const iconMap: Record<string, React.ReactElement> = {
  facebook: <FacebookIcon fontSize="small" />,
  twitter: <TwitterIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  instagram: <InstagramIcon fontSize="small" />,
  linkedin: <LinkedInIcon fontSize="small" />,
};

// Exemple de hook personnalisé pour récupérer les liens sociaux (à adapter selon ton backend)
const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<
    { id: string; platform: string; url: string }[]
  >([]);

  useEffect(() => {
    // Remplace par ta vraie API
    fetch('/api/social-links')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSocialLinks(data);
        }
      })
      .catch(err => console.error('Failed to load social links', err));
  }, []);

  return { socialLinks };
};

function Nav() {
  const { t, i18n } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)', { noSsr: true });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const { logo } = useLogo();

  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('/img/no_img.png');
  const [role, setRole] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/Login';
  };

  // Récupération des liens sociaux via hook
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

    if (typeof window !== 'undefined') {
      setUserName(localStorage.getItem('userName') || '');
      setUserImage(localStorage.getItem('userImage') || '/img/no_img.png');
      setRole(localStorage.getItem('role') || '');
    }
  }, [i18n.language]);

  const dashboardLink = role === 'admin' || role === 'employe' ? '/Dashboard' : '/Client';

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/About' },
    { label: t('services'), href: '/Services' },
    { label: t('products2'), href: '/Liste_produit' },
    { label: 'لوحة التحكم', href: dashboardLink },
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
            <MuiLink
              component={Link}
              href="/Demande"
              underline="none"
              className={`${styles.Arabe} ${styles.link2}`}
            >
              {t('inquiryOnline')}
            </MuiLink>
            <Typography className={styles.Arabe}>{t('followUs')}</Typography>

            <Box className={styles.Liste_icon}>
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
                      className={styles.icon}
                      aria-label={platform}
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
                </>
              )}
            </Box>
          </div>
        )}
      </div>

      {/* Navbar */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className={`${styles.navbar} ${i18n.language === 'ar' ? styles.rtl : ''}`}
      >
        <Toolbar className={styles.toolbar}>
          {isMobile && (
            <IconButton edge="start" onClick={openDrawer} className={styles.hamburger}>
              <MenuIcon />
            </IconButton>
          )}

          {/* User profile or Login button */}
          {userName ? (
            <>
              <Button
                id="profile-button"
                aria-controls={openProfileMenu ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openProfileMenu ? 'true' : undefined}
                onClick={handleProfileClick}
                sx={{
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  backgroundColor: '#f5f5f5',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  '&:hover': { backgroundColor: '#eaeaea' },
                }}
              >
                <Avatar
                  src={userImage}
                  alt={userName}
                  sx={{ width: 40, height: 40, boxShadow: '0 0 4px rgba(0,0,0,0.2)' }}
                />
                <Typography variant="body1" sx={{ color: '#0a0a23', fontWeight: 600 }}>
                  {userName}
                </Typography>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0a0a23"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Button>

              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={openProfileMenu}
                onClose={handleProfileClose}
                MenuListProps={{ 'aria-labelledby': 'profile-button' }}
              >
                <MenuItem
                  className={styles.arabica}
                  onClick={handleProfileClose}
                  component={Link}
                  href={dashboardLink}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  لوحة التحكم
                </MenuItem>
                <MenuItem
                  className={styles.arabica}
                  onClick={() => {
                    handleProfileClose();
                    handleLogout();
                  }}
                >
                  تسجيل الخروج
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/Login" passHref>
              <Button
                variant="outlined"
                sx={{ marginLeft: 2, color: '#DE1E27', borderColor: '#DE1E27', textTransform: 'none', fontWeight: 'bold' }}
              >
                Login
              </Button>
            </Link>
          )}

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
                    <Typography className={styles.phoneNumber}>{phoneNumber}</Typography>
                  </Box>
                </Link>

                <Link href="/Login">
                  <Button
                    variant="contained"
                    className={styles.trackButton}
                    onClick={() => {
                      handleProfileClose();
                      handleLogout();
                    }}
                  >
                    تسجيل الخروج&nbsp;<TrendingUpIcon />
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
              <ListItem key={href}>
                <MuiLink component={Link} href={href} underline="none" className={`${styles.Arabe} ${styles.link}`} onClick={closeDrawer}>
                  {label}
                </MuiLink>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />
          <Box sx={{ mt: 2 }}>
            <Typography className={styles.Arabe} sx={{ mb: 1 }}>
              {t('workingHours')}
            </Typography>

            <LanguageSelector />

            <MuiLink component={Link} href="#" underline="none" className={`${styles.Arabe} ${styles.link}`} color="inherit" onClick={closeDrawer}>
              {t('inquiryOnline')}
            </MuiLink>

            <Typography className={styles.Arabe} sx={{ mt: 1 }}>
              {t('followUs')}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small"><FacebookIcon fontSize="small" /></IconButton>
              <IconButton size="small"><TwitterIcon fontSize="small" /></IconButton>
              <IconButton size="small"><WhatsAppIcon fontSize="small" /></IconButton>
              <IconButton size="small"><InstagramIcon fontSize="small" /></IconButton>
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
