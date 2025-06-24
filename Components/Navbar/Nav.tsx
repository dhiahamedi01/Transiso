'use client';
import React, { useState } from 'react';
import styles from './Nav.module.css';
import { AppBar, Toolbar, Button,Box,Typography,IconButton,Divider,Drawer,List,ListItem,useMediaQuery,Link as MuiLink,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import NextLink from 'next/link';

const Nav = () => {

  const isMobile = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'عن الشركة', href: '/About' },
    { label: 'خدماتنا في ترانسيسو', href: '/Services' },
    { label: 'لوجيستيات', href: '#' },
    { label: 'التسوق في تركيا', href: 'Liste_produit' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.left}>
          <div className={styles.infoItem}>
            <LocationOnIcon fontSize="small" sx={{ color: '#DE1E27' }} />
            <Typography sx={{ fontWeight: 300 }} className={styles.icon_topbar}>Istanbul, Turkey</Typography>
          </div>
          <span className={styles.separator}>|</span>
          <div className={styles.infoItem}>
            <EmailIcon fontSize="small" sx={{ color: '#DE1E27' }} />
            <Typography sx={{ fontWeight: 300 }} className={styles.icon_topbar}>info@transisologistic.com</Typography>
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
            <LanguageSelector />
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
              <IconButton size="small" className={styles.icon}><TwitterIcon fontSize="small" /></IconButton>
              <IconButton size="small" className={styles.icon}><WhatsAppIcon fontSize="small" /></IconButton>
              <IconButton size="small" className={styles.icon}><InstagramIcon fontSize="small" /></IconButton>
            </div>
          </div>
        )}
      </div>

      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0} className={styles.navbar}>
        <Toolbar className={styles.toolbar}>
          {isMobile && (
            <IconButton edge="start" onClick={() => setDrawerOpen(true)} className={styles.hamburger}>
              <MenuIcon />
            </IconButton>
          )}

          <Box className={styles.logoBox}>
            <Image src="/img/logo2.jpg" alt="Logo" width={190} height={60} />
          </Box>

          {!isMobile && (
            <>
              <Box className={styles.navLinks}>
                {navItems.map((item, index) => (
                  <MuiLink
                    key={index}
                    component={NextLink}
                    href={item.href}
                    underline="none"
                    className={styles.link}
                  >
                    {item.label}
                  </MuiLink>
                ))}
              </Box>

              <Box className={styles.rightSection}>
                <IconButton><SearchIcon className={styles.searchIcon} /></IconButton>
                <Divider orientation="vertical" flexItem />
                <Box className={styles.phoneBox}>
                  <Box className={styles.phoneIconCircle}>
                    <PhoneIcon className={styles.phoneIcon} />
                  </Box>
                  <Box className={styles.number}>
                    <Typography className={styles.phoneNumber}>5377671027 (90+)</Typography>
                  </Box>
                </Box>
                <Button variant="contained" className={styles.trackButton}>
                  تتبع الطلب&ensp;<TrendingUpIcon />
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <List>
            {navItems.map((item, index) => (
              <ListItem key={index}>
                <MuiLink
                  component={NextLink}
                  href={item.href}
                  underline="none"
                  className={`${styles.Arabe} ${styles.link}`}
                >
                  {item.label}
                </MuiLink>
              </ListItem>
            ))}
          </List>
          <Divider />
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
            >
              الاستفسار اون لاين
            </MuiLink>
            <Typography className={styles.Arabe} sx={{ mt: 1 }}>تابعنا على:</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small"><FacebookIcon fontSize="small" /></IconButton>
              <IconButton size="small"><TwitterIcon fontSize="small" /></IconButton>
              <IconButton size="small"><WhatsAppIcon fontSize="small" /></IconButton>
              <IconButton size="small"><InstagramIcon fontSize="small" /></IconButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Nav;
