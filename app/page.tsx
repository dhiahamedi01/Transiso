'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Nav = dynamic(() => import('@/Components/Navbar/Nav'), { ssr: false });
const HeroSlider = dynamic(() => import('@/Components/HeroSlider/HeroSlider'), { ssr: false });
const TrendingCarousel = dynamic(() => import('@/Components/Produit/TrendingCarousel/TrendingCarousel'), { ssr: false });

import Avis from '@/Components/Avis_client/Avis';
import Service from '@/Components/Service/Banner_service/Service';
import Card from '@/Components/Feauture/Card_liste/Card';
import Section from '@/Components/Section/Section1';
import Blog from '@/Components/Blog/Blog';
import HeroSection from '@/Components/Section/HeroSection';
import Footer from '@/Components/Footer/Footer';
import WhatsappButtons from '@/Components/WhatsappButtons';
import ScrollToTopButton from '@/Components/ScrollToTopButton';
import Carousel from '@/Components/Carrousel/carrousel';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false); 

  useEffect(() => {
    setHasMounted(true); 
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) return null; 

  return (
    <>
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <img src="/img/loading2.gif" alt="Chargement..." style={{ width: 100, height: 100 }} />
        </div>
      )}

      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Nav />
        <HeroSlider />
        <Card />
        <Section />
        <Carousel />
        <TrendingCarousel />
        <br /><br /><br />
        <HeroSection />
        <Avis />
        <Service />
        <Blog />
        <WhatsappButtons />
        <ScrollToTopButton />
        <Footer />
      </div>
    </>
  );
}
