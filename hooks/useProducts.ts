'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/services/Liste_productService';
import { useTranslation } from 'react-i18next';

export interface ProduitDB {
  id: number;
  name: string;
  category: string;
  price: string;
  old_price: string | null;
  stock: string;
  description: string | null;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  image5: string | null;
  lang: string;
}

export function useProducts() {
  const { i18n } = useTranslation();
  const [data, setData] = useState<ProduitDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const rows = await getProducts();

      // Filtrer les produits selon la langue actuelle
      const filtered = rows.filter((product: ProduitDB) => product.lang === i18n.language);
      setData(filtered);
    } catch (e: any) {
      setError(e.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [i18n.language]);

  return { products: data, loading, error, refetch: fetchData };
}
