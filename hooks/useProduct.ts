// hooks/useProduct.ts
import { useEffect, useState } from 'react';
import { getProductById } from '@/services/Product_update_Service';
import { ProduitDB } from './useProducts';

export function useProduct(id: number) {
  const [product, setProduct] = useState<ProduitDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setProduct(await getProductById(id));
      } catch (e: any) {
        setError(e.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { product, loading, error };
}
