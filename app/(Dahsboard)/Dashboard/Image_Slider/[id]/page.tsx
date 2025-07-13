'use client';

import EditSliderForm from '@/Components/Dahsboard/Manage_site/Slider/SliderForm';
import { useEffect, useState } from 'react';

// Correction ici : utilisez directement { params }: { params: { id: string } }
export default function EditSliderPage({ params }: { params: { id: string } }) {
  const [slider, setSlider] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/home-slider/${params.id}`)
      .then(res => res.json())
      .then(setSlider)
      .catch(() => alert('Failed to load slider'));
  }, [params.id]);

  if (!slider) return <p>Loading...</p>;

  return (
    <EditSliderForm
      id={params.id}
      initialTitle={slider.Titre}
      initialDescription={slider.Description}
      initialIconUrl={slider.Icon}
      initialImageUrl={slider.Image}
    />
  );
}
