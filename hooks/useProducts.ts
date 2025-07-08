// hooks/useProducts.ts
'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/services/Liste_productService';

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
}

export function useProducts() {
  const [data, setData] = useState<ProduitDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const rows = await getProducts();
      setData(rows);
    } catch (e: any) {
      setError(e.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products: data, loading, error, refetch: fetchData };
}
