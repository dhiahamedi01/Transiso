
'use client';              

import React from 'react';
import Nav from '@/Components/Navbar/Nav';
import Footer from '@/Components/Footer/Footer';
import WhatsappButtons from '@/Components/WhatsappButtons';
import ScrollToTopButton from '@/Components/ScrollToTopButton';

export default function InitialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <WhatsappButtons />
      <ScrollToTopButton />
      {children}

      <Footer />
    </>
  );
}
