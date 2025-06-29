'use client';

import React, { useState, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import SearchModal from '../SearchModal/SearchModal';

import styles from './Nav.module.css';
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

const MenuIcon       = dynamic(() => import('@mui/icons-material/Menu'),       { ssr: false });
const SearchIcon     = dynamic(() => import('@mui/icons-material/Search'),     { ssr: false });
const PhoneIcon      = dynamic(() => import('@mui/icons-material/Phone'),      { ssr: false });
const TrendingUpIcon = dynamic(() => import('@mui/icons-material/TrendingUp'), { ssr: false });
const LocationOnIcon = dynamic(() => import('@mui/icons-material/LocationOn'), { ssr: false });
const EmailIcon      = dynamic(() => import('@mui/icons-material/Email'),      { ssr: false });
const AccessTimeIcon = dynamic(() => import('@mui/icons-material/AccessTime'), { ssr: false });
const FacebookIcon   = dynamic(() => import('@mui/icons-material/Facebook'),   { ssr: false });
const TwitterIcon    = dynamic(() => import('@mui/icons-material/Twitter'),    { ssr: false });
const WhatsAppIcon   = dynamic(() => import('@mui/icons-material/WhatsApp'),   { ssr: false });
const InstagramIcon  = dynamic(() => import('@mui/icons-material/Instagram'),  { ssr: false });

import Image     from 'next/image';
import NextLink  from 'next/link';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const navItems = [
  { label: 'الرئيسية',              href: '/' },
  { label: 'عن الشركة',             href: '/About' },
  { label: 'خدماتنا في ترانسيسو',  href: '/Services' },
  { label: 'قائمة منتجاتنا',        href: '/Liste_produit' },
  { label: 'إتصل بنا ',             href: '/Contact' },
];

function Nav() {
  const isMobile = useMediaQuery('(max-width:900px)', {
    noSsr: true,
    defaultMatches: false,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openDrawer  = useCallback(() => setDrawerOpen(true),  []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openSearch  = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  return (
    <>
      {/* ---------- Top Bar ---------- */}
      <div className={styles.topBar}>
        <div className={styles.left}>
          <div className={styles.infoItem}>
            <LocationOnIcon fontSize="small" sx={{ color: '#DE1E27' }} />
            <Typography sx={{ fontWeight: 300 }} className={styles.icon_topbar}>
              Istanbul, Turkey
            </Typography>
          </div>

          <span className={styles.separator}>|</span>

          <div className={styles.infoItem}>
            <EmailIcon fontSize="small" sx={{ color: '#DE1E27' }} />
            <Typography sx={{ fontWeight: 300 }} className={styles.icon_topbar}>
              info@transisologistic.com
            </Typography>
          </div>

          {!isMobile && (
            <>
              <span className={styles.separator}>|</span>
              <div className={styles.infoItem}>
                <AccessTimeIcon fontSize="small" sx={{ color: '#DE1E27' }} />
                <Typography className={styles.Arabe} sx={{ fontWeight: 300 }}>
                  الإثنين – الأحد: 9:00 صباحًا – 8:00 مساءً
                </Typography>
              </div>
            </>
          )}
        </div>

        {!isMobile && (
          <div className={styles.right}>
            <LanguageSelector/>

            <MuiLink
              component={NextLink}
              href="#"
              underline="none"
              className={`${styles.Arabe} ${styles.link2}`}
              color="inherit"
            >
              الاستفسار اون لاين
            </MuiLink>

            <Typography className={styles.Arabe}>تابعنا على:</Typography>

            <div className={styles.Liste_icon}>
              <IconButton size="small" className={styles.icon}><FacebookIcon fontSize="small" /></IconButton>
              <IconButton size="small" className={styles.icon}><TwitterIcon  fontSize="small" /></IconButton>
              <IconButton size="small" className={styles.icon}><WhatsAppIcon fontSize="small" /></IconButton>
              <IconButton size="small" className={styles.icon}><InstagramIcon fontSize="small" /></IconButton>
            </div>
          </div>
        )}
      </div>

      {/* ---------- NavBar ---------- */}
      <AppBar position="static" color="transparent" elevation={0} className={styles.navbar}>
        <Toolbar className={styles.toolbar}>
          {isMobile && (
            <IconButton edge="start" onClick={openDrawer} className={styles.hamburger}>
              <MenuIcon />
            </IconButton>
          )}

          <Box className={styles.logoBox}>
            <Image
              src="/img/logo2.jpg"
              alt="Logo"
              width={190}
              height={60}
              priority
            />
          </Box>

          {!isMobile && (
            <>
              <Box className={styles.navLinks}>
                {navItems.map(({ label, href }) => (
                  <MuiLink
                    key={href}
                    component={NextLink}
                    href={href}
                    underline="none"
                    className={styles.link}
                  >
                    {label}
                  </MuiLink>
                ))}
              </Box>

              <Box className={styles.rightSection}>
                <IconButton onClick={openSearch}>
                  <SearchIcon className={styles.searchIcon} />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <Box className={styles.phoneBox}>
                  <Box className={styles.phoneIconCircle}>
                    <PhoneIcon className={styles.phoneIcon} />
                  </Box>
                  <Typography className={styles.phoneNumber}>
                     5377671027 (90+)
                  </Typography>
                </Box>
                <Button variant="contained" className={styles.trackButton}>
                  تتبع الطلب&nbsp;<TrendingUpIcon />
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* ---------- Drawer mobile ---------- */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        disableScrollLock
      >
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {navItems.map(({ label, href }) => (
              <ListItem key={href}>
                <MuiLink
                  component={NextLink}
                  href={href}
                  underline="none"
                  className={`${styles.Arabe} ${styles.link}`}
                  onClick={closeDrawer}
                >
                  {label}
                </MuiLink>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ mt: 2 }}>
            <Typography className={styles.Arabe} sx={{ mb: 1 }}>
              الإثنين – الأحد: 9:00 صباحًا – 8:00 مساءً
            </Typography>

            <LanguageSelector />

            <MuiLink
              component={NextLink}
              href="#"
              underline="none"
              className={`${styles.Arabe} ${styles.link}`}
              color="inherit"
              onClick={closeDrawer}
            >
              الاستفسار اون لاين
            </MuiLink>

            <Typography className={styles.Arabe} sx={{ mt: 1 }}>
              تابعنا على:
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small"><FacebookIcon fontSize="small" /></IconButton>
              <IconButton size="small"><TwitterIcon  fontSize="small" /></IconButton>
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

export default memo(Nav);
