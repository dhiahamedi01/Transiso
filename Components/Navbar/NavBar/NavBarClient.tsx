'use client';

import { useState, memo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

import { AppBar, Toolbar, IconButton, Divider, Box, Button } from '@mui/material';

import styles from './NavBar.module.css';

// dynamic uniquement pour les icônes visibles après interaction
const MenuIcon      = dynamic(() => import('@mui/icons-material/Menu'));
const SearchIcon    = dynamic(() => import('@mui/icons-material/Search'));
const PhoneIcon     = dynamic(() => import('@mui/icons-material/Phone'));
const TrendingIcon  = dynamic(() => import('@mui/icons-material/TrendingUp'));

import DrawerMenu from './DrawerMenu';

const navItems = [
  { label: 'الرئيسية',              href: '/' },
  { label: 'عن الشركة',             href: '/About' },
  { label: 'خدماتنا في ترانسيسو',  href: '/Services' },
  { label: 'لوجيستيات',            href: '#' },
  { label: 'التسوق في تركيا',      href: '/Liste_produit' },
];

function NavBarClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static" elevation={0} className={styles.navbar}>
        <Toolbar className={styles.toolbar}>
          {/* hamburger mobile */}
          <IconButton onClick={() => setOpen(true)} className={styles.hamburger}>
            <MenuIcon />
          </IconButton>

          {/* logo */}
          <Link href="/">
            <Image
              src="/img/logo2.jpg"
              alt="Logo"
              width={190}
              height={60}
              priority
              sizes="(max-width: 900px) 120px, 190px"
            />
          </Link>

          {/* liens desktop */}
          <nav className={styles.navLinks}>
            {navItems.map(({ label, href }) => (
              <Link key={href} href={href} className={styles.link}>
                {label}
              </Link>
            ))}
          </nav>

          {/* section droite desktop */}
          <div className={styles.rightSection}>
            <IconButton><SearchIcon className={styles.searchIcon}/></IconButton>
            <Divider orientation="vertical" flexItem />
            <div className={styles.phoneBox}>
              <div className={styles.phoneIconCircle}><PhoneIcon className={styles.phoneIcon}/></div>
              <span className={styles.phoneNumber}>5377671027 (90+)</span>
            </div>
            <Button variant="contained" className={styles.trackButton}>
              تتبع الطلب&nbsp;<TrendingIcon/>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* drawer mobile */}
      <DrawerMenu open={open} onClose={() => setOpen(false)} links={navItems}/>
    </>
  );
}

export default memo(NavBarClient);
