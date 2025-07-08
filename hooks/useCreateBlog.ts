import { createBlog,fetchBlogs, BlogArticle  } from '@/services/blogService';
import { useEffect, useState } from 'react';


export default function useCreateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateBlog = async (data: {
    title: string;
    author: string;
    date: string;
    status: 'Published' | 'Draft';
    category: string;
    content: string;
    image: File | null;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('date', data.date);
      formData.append('status', data.status);
      formData.append('category', data.category);
      formData.append('content', data.content);
      if (data.image) {
        formData.append('image', data.image);
      }

      const result = await createBlog(formData);
      return result;
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateBlog, loading, error };
}


export function useBlogs() {
    const [blogs, setBlogs] = useState<BlogArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadBlogs = async () => {
        try {
          const data = await fetchBlogs();
          setBlogs(data);
        } catch (err: any) {
          setError(err.message || 'Erreur lors du chargement');
        } finally {
          setLoading(false);
        }
      };
  
      loadBlogs();
    }, []);
  
    return { data: blogs, isLoading: loading, isError: !!error };
  }