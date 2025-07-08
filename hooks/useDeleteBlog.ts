// hooks/useDeleteBlog.ts
import { useState } from 'react';
import { deleteBlog } from '@/services/deleteBlog';

export function useDeleteBlog(refresh?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBlog(id);
      refresh?.();           // ⬅️ recharge la liste si fourni
    } catch (e: any) {
      setError(e.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
}
