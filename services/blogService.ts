export async function createBlog(formData: FormData) {
    const res = await fetch('/api/blog', {
      method: 'POST',
      body: formData,
    });
  
    if (!res.ok) throw new Error('Erreur lors de l\'envoi du blog');
    return res.json();
  }
  

export type BlogArticle = {
    id: number;
    lang: string; 
    title: string;
    author: string;
    date: string;
    status: 'Published' | 'Draft';
    category: string;
    content: string;
    image_path: string;
  };
  
  export async function fetchBlogs(): Promise<BlogArticle[]> {
    const res = await fetch('/api/blog', { next: { revalidate: 0 } }); // pas de cache
    if (!res.ok) throw new Error('Erreur de chargement');
    return res.json();
  }
  
  // Récupérer un blog par id
export async function fetchBlogById(id: string): Promise<BlogArticle> {
    const response = await fetch(`/api/blog/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    return response.json();
  }
  
  // Mettre à jour un blog (id + données)
  export async function updateBlog(id: string, data: Partial<BlogArticle> & { image?: File | null }) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else {
          formData.append(key, value as string);
        }
      }
    });
  
    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to update blog');
    }
  }
  