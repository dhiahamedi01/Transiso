import { createBlog } from '@/services/blogService';
import { useState } from 'react';

export default function useCreateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateBlog = async (data: {
    date: string;
    status: 'Published' | 'Draft';
    image: File | null;
    translations: {
      en: { title: string; author: string; category: string; content: string };
      tr: { title: string; author: string; category: string; content: string };
      ar: { title: string; author: string; category: string; content: string };
    };
  }) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('date', data.date);
      formData.append('status', data.status);
      if (data.image) {
        formData.append('image', data.image);
      }
      // On stringify les traductions car c'est un objet
      formData.append('translations', JSON.stringify(data.translations));

      const result = await createBlog(formData);
      return result;
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateBlog, loading, error };
}
