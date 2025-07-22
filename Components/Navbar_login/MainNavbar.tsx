'use client';
import { AppBar, Toolbar, Box, Button, IconButton, Typography, Badge, Menu, MenuItem, Divider, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Nav.module.css';
import { Search, ShoppingCart, TrendingUp, Menu as MenuIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';

const MainNavbar = ({
  userName,
  userImage,
  role,
  cartCount,
  onLogout,
  onSearchOpen,
  onDrawerOpen,
}: {
  userName: string;
  userImage: string;
  role: string;
  cartCount: number;
  onLogout: () => void;
  onSearchOpen: () => void;
  onDrawerOpen: () => void;
}) => {
  const { t, i18n } = useTranslation('common');
  const isMobile = useMediaQuery('(max-width:900px)', { noSsr: true });
  const dashboardLink = role === 'admin' || role === 'employe' ? '/Dashboard' : '/Client';

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/About' },
    { label: t('services'), href: '/Services' },
    { label: 'لوحة التحكم', href: dashboardLink },
    { label: t('contact'), href: '/Contact' },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorEl);

  return (
    <AppBar position="static" color="transparent" elevation={0} className={`${styles.navbar} ${i18n.language === 'ar' ? styles.rtl : ''}`}>
      <Toolbar className={styles.toolbar}>
        {isMobile && (
          <IconButton edge="start" onClick={onDrawerOpen} className={styles.hamburger}>
            <MenuIcon />
          </IconButton>
        )}

        {userName ? (
          <>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Avatar src={userImage} alt={userName} />
              <Typography>{userName}</Typography>
            </Button>
            <Menu anchorEl={anchorEl} open={openProfileMenu} onClose={() => setAnchorEl(null)}>
              <MenuItem component={Link} href={dashboardLink}>لوحة التحكم</MenuItem>
              <MenuItem onClick={onLogout}>تسجيل الخروج</MenuItem>
            </Menu>
          </>
        ) : (
          <Link href="/Login" passHref>
            <Button variant="outlined" sx={{ color: '#DE1E27', borderColor: '#DE1E27' }}>Login</Button>
          </Link>
        )}

        {!isMobile && (
          <>
            <Box className={styles.navLinks}>
              {navItems.map(({ label, href }) => (
                <Link key={href} href={href} className={styles.link}>{label}</Link>
              ))}
            </Box>
            <Box className={styles.rightSection}>
              <Link href="/Cart">
                <IconButton>
                  <Badge badgeContent={cartCount} color="error"><ShoppingCart /></Badge>
                </IconButton>
              </Link>
              <Divider orientation="vertical" flexItem />
              <IconButton onClick={onSearchOpen}><Search /></IconButton>
              <Button variant="contained" onClick={onLogout}>
                تسجيل الخروج <TrendingUp />
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
