import { useState } from 'react';
import { createProductWithImages } from '@/services/productService'

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const save = async (productData: any, images: File[]) => {
    setLoading(true);
    setError(null);
    try {
      const { id } = await createProductWithImages(productData, images);
      return id;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { save, loading, error };
}
