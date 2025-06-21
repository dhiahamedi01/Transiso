'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const HeroSlider = dynamic(() => import('./Components/HeroSlider/HeroSlider'), {
  ssr: false,
  loading: () => <div>Chargement du slider...</div>,
});
const Avis = dynamic(() => import('./Components/Avis_client/Avis'));
const Blog = dynamic(() => import('./Components/Blog/Blog'));
const HeroSection = dynamic(() => import('./Components/Section/HeroSection'));

import Service from './Components/Service/Service';
import Card from './Components/Card_liste/Card';
import Section from './Components/Section/Section1';
import ScrollToTopButton from './Components/ScrollToTopButton';
import WhatsappButtons from './Components/WhatsappButtons';

const Page = () => {
  return (
    <>
      <HeroSlider />
      <Card />
      <Section />
      <br /><br /><br />
      <HeroSection />
      <Avis />
      <Service />
      <Blog />
      <ScrollToTopButton />
      <WhatsappButtons />
    </>
  );
};

export default Page;
