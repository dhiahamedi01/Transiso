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
  Badge,
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

// Icônes dynamiques
const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'), { ssr: false });
const SearchIcon = dynamic(() => import('@mui/icons-material/Search'), { ssr: false });
const ShoppingCartIcon = dynamic(() => import('@mui/icons-material/ShoppingCart'), { ssr: false });
const LockOpenIcon = dynamic(() => import('@mui/icons-material/LockOpen'), { ssr: false });
const LocationOnIcon = dynamic(() => import('@mui/icons-material/LocationOn'), { ssr: false });
const EmailIcon = dynamic(() => import('@mui/icons-material/Email'), { ssr: false });
const AccessTimeIcon = dynamic(() => import('@mui/icons-material/AccessTime'), { ssr: false });
const FacebookIcon = dynamic(() => import('@mui/icons-material/Facebook'), { ssr: false });
const TwitterIcon = dynamic(() => import('@mui/icons-material/Twitter'), { ssr: false });
const WhatsAppIcon = dynamic(() => import('@mui/icons-material/WhatsApp'), { ssr: false });
const InstagramIcon = dynamic(() => import('@mui/icons-material/Instagram'), { ssr: false });
const LinkedInIcon = dynamic(() => import('@mui/icons-material/LinkedIn'), { ssr: false });
const MusicNoteIcon = dynamic(() => import('@mui/icons-material/MusicNote'), { ssr: false }); // TikTok


const iconMap: Record<string, React.ReactElement> = {
  facebook: <FacebookIcon fontSize="small" />,
  twitter: <TwitterIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  instagram: <InstagramIcon fontSize="small" />,
  linkedin: <LinkedInIcon fontSize="small" />,
  tiktok: <MusicNoteIcon fontSize="small" />,
};

const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<{ id: string; platform: string; url: string }[]>([]);
  useEffect(() => {
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

  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { logo } = useLogo();

  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('/img/user5.jpg');
  const [role, setRole] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorEl);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/Login';
  };

  const { socialLinks } = useSocialLinks();

  // Lecture du nombre total d'articles dans le panier (somme des quantités)
  const readCartCount = () => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // Somme des quantités pour affichage précis
      const totalCount = cart.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
      setCartCount(totalCount);
    }
  };

  useEffect(() => {
    setIsClient(true);
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    fetch('/api/Manage_website/PersonalInformation')
      .then(res => res.json())
      .then(data => {
        setEmail(data.email || '');
        setLocation(data.location || '');
      })
      .catch(err => console.error('Erreur de chargement :', err));

    if (typeof window !== 'undefined') {
      setUserName(localStorage.getItem('userName') || '');
      setUserImage(localStorage.getItem('userImage') || '/img/user5.jpg');
      setRole(localStorage.getItem('role') || '');

      // Initial cart count
      readCartCount();

      // Écoute des modifications du localStorage (multi onglets)
      const onStorageChange = (e: StorageEvent) => {
        if (e.key === 'cart') {
          readCartCount();
        }
      };
      window.addEventListener('storage', onStorageChange);

      // Écoute de l'événement personnalisé 'cartUpdated' dans le même onglet
      const onCartUpdate = () => readCartCount();
      window.addEventListener('cartUpdated', onCartUpdate);

      return () => {
        window.removeEventListener('storage', onStorageChange);
        window.removeEventListener('cartUpdated', onCartUpdate);
      };
    }
  }, [i18n.language]);

  const dashboardLink = role === 'admin' || role === 'employe' ? '/Dashboard' : '/Client';

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/About' },
    { label: t('services'), href: '/Services' },
    { label: t('FAQ'), href: '/FAQ' },
    { label: t('Dasho'), href: dashboardLink },
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
                <Box
            sx={{
              width: 45,
              height: 45,
              borderRadius: '8px', // carré avec coins légèrement arrondis
              overflow: 'hidden',
              boxShadow: '0 0 4px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src={userImage}
              alt={userName}
              width={45}
              height={45}
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <Typography className={styles.user_profil} variant="body1" sx={{ color: '#0a0a23', fontWeight: 600 }}>
            {userName}
          </Typography>
        </Button>

        <Menu className={styles.dropdown} anchorEl={anchorEl} open={openProfileMenu} onClose={handleProfileClose}>
          <MenuItem className={styles.arabic} component={Link} href={dashboardLink} onClick={handleProfileClose}>
          {t('myDashboard')}
          </MenuItem>
          <MenuItem
            className={styles.arabic}
            component="a"
            href="https://www.track-trace.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleProfileClose}
          >
            {t('tracking_d')}
          </MenuItem>

          <MenuItem
          className={styles.arabic} 
            onClick={() => {
              handleProfileClose();
              handleLogout();
            }}
          >
{t('logout')}
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
                {/* Panier avec badge dynamique */}
                <Link href="/Cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <IconButton aria-label="cart">
                    <Badge badgeContent={cartCount} color="error" showZero>
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>

                <Divider orientation="vertical" flexItem />
                <IconButton onClick={openSearch}>
                  <SearchIcon className={styles.searchIcon} />
                </IconButton>

                <Link href="https://www.track-trace.com/" passHref>
                    <Button
                      variant="contained"
                      className={styles.trackButton2}
                      onClick={() => {
                        handleProfileClose();
                      }}
             
                      sx={{ textTransform: 'none' }}
                    >
                      {t('tracking_d')}&ensp;<BarChartIcon   />
                    </Button>
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
                {t('logout')}                  
                </Button>
                </Link>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Drawer */}
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
         {isMobile && (
              <ListItem disablePadding>
                <MuiLink
                  component={Link}
                  href="https://www.track-trace.com/"
                  underline="none"
                  className={`${styles.Arabe} ${styles.link}`}
                  onClick={closeDrawer}
                  sx={{ display: 'block', width: '100%', py: 1 ,textAlign:'right',paddingRight:'10px'}}
                >
                  {t('tracking_d')}
                </MuiLink>
              </ListItem>
            )}
            {isMobile && (
              <ListItem disablePadding>
                <MuiLink
                  component={Link}
                  href="/Price"
                  underline="none"
                  className={`${styles.Arabe} ${styles.link}`}
                  onClick={closeDrawer}
                  sx={{ display: 'block', width: '100%', py: 1 ,textAlign:'right',paddingRight:'10px'}}
                >
                  {t('demandeprice')}
                </MuiLink>
              </ListItem>
            )}
   {isMobile && (
              <ListItem disablePadding>
                <MuiLink
                  component={Link}
                  href="/Demande"
                  underline="none"
                  className={`${styles.Arabe} ${styles.link}`}
                  onClick={closeDrawer}
                  sx={{ display: 'block', width: '100%', py: 1 ,textAlign:'right',paddingRight:'10px'}}
                >
                  {t('inquiryOnline')}
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
  
            <Typography className={styles.Arabe} sx={{ mt: 1 }}>
              {t('followUs')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <WhatsAppIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <InstagramIcon fontSize="small" />
              </IconButton>
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
