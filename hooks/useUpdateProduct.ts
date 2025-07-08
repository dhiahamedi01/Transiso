// hooks/useUpdateProduct.ts
'use client';

import { useState } from 'react';          // ← ajout
import { updateProduct } from '@/services/Product_update_Service';

export function useUpdateProduct() {
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState<string | null>(null);

  const update = async (id: number, data: any, images: File[]) => {
    try {
      setLoading(true);
      await updateProduct(id, data, images);
    } catch (e: any) {
      setError(e.message ?? 'Unknown error');
      throw e;                           
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
