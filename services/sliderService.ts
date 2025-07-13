export interface SliderItem {
    id: number;
    icon: string;
    titre: string;
    description: string;
    image: string;
  }
  
  export const fetchSliders = async (): Promise<SliderItem[]> => {
    const res = await fetch('/api/home-slider', { cache: 'no-store' });
    if (!res.ok) throw new Error('Erreur de chargement des sliders');
    return res.json();
  };
  