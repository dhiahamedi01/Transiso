export interface Slide {
  id: number;
  image: string;
  icon: string;
  title?: string;        // optionnel, car traduit via i18n
  description?: string;  // optionnel aussi
}

export const slides = [
  { id: 3, image: '/img/Slide/slide3.jpg', icon: '/img/icon/cargo.svg' },
  { id: 4, image: '/img/Slide/airt.jpg',   icon: '/img/icon/air-freight.svg' },
  { id: 2, image: '/img/Slide/slide2.jpg', icon: '/img/icon/ocean-freight.svg' }
];
