'use client';

import React, { useEffect, useState } from 'react';
import Nav from '@/Components/Navbar/Nav';
import Footer from '@/Components/Footer/Footer';
import WhatsappButtons from '@/Components/WhatsappButtons';
import ScrollToTopButton from '@/Components/ScrollToTopButton';
import Navlogin from '@/Components/Navbar_login/Navlogin';

export default function InitialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Vérifie dans localStorage si userName existe
    const userName = localStorage.getItem('userName');
    setIsLoggedIn(!!userName);
  }, []);

  // En attendant que isLoggedIn soit défini, tu peux afficher null ou loader
  if (isLoggedIn === null) return null;

  return (
    <>
      {isLoggedIn ? <Navlogin/> : <Nav />}
      <WhatsappButtons />
      <ScrollToTopButton />
      {children}
      <Footer />
    </>
  );
}
