'use client';
import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import MainNavbar from './MainNavbar';
import SideDrawer from './SideDrawer';
import SearchModal from '@/Components/SearchModal/SearchModal';

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('/img/no_img.png');
  const [role, setRole] = useState('');
  const [socialLinks, setSocialLinks] = useState([]);

  const readCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
    setCartCount(total);
  };

  useEffect(() => {
    fetch('/api/Manage_website/PersonalInformation')
      .then(res => res.json())
      .then(data => {
        setEmail(data.email || '');
        setLocation(data.location || '');
      });

    fetch('/api/social-links')
      .then(res => res.json())
      .then(data => setSocialLinks(data));

    setUserName(localStorage.getItem('userName') || '');
    setUserImage(localStorage.getItem('userImage') || '/img/no_img.png');
    setRole(localStorage.getItem('role') || '');

    readCartCount();
    window.addEventListener('cartUpdated', readCartCount);
    return () => window.removeEventListener('cartUpdated', readCartCount);
  }, []);

  return (
    <>
      <TopBar email={email} location={location} socialLinks={socialLinks} />
      <MainNavbar
      userName={userName}
      userImage={userImage}
      role={role}
      cartCount={cartCount}
      onLogout={() => {
        localStorage.clear();
        window.location.href = '/Login';
      }}
      onSearchOpen={() => setSearchOpen(true)}
      onDrawerOpen={() => setDrawerOpen(true)}
    />

      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default MainLayout;
