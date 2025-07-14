'use client';

import EditSliderForm from '@/Components/Dahsboard/Manage_site/Slider/SliderForm';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EditSliderPage() {
  const params = useParams();
  const idParam = params?.id;

  // idParam est string | string[] | undefined
  // Ici on prend uniquement le premier si c'est un tableau
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const [slider, setSlider] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/home-slider/${id}`)
      .then(res => res.json())
      .then(setSlider)
      .catch(() => alert('Failed to load slider'));
  }, [id]);

  if (!id) return <p>Id missing</p>;
  if (!slider) return <p>Loading...</p>;

  return (
    <EditSliderForm
      id={id}  // Ici id est bien une string simple
      initialTitle={slider.Titre}
      initialDescription={slider.Description}
      initialIconUrl={slider.Icon}
      initialImageUrl={slider.Image}
    />
  );
}
