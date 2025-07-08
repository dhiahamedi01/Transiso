export async function getProductById(id: number) {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch product');
    }
    return res.json();
  }
  
  export async function updateProduct(id: number, data: any, images: File[]) {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v as string));
    images.forEach(img => form.append('images', img));
  
    const res = await fetch(`/api/products/${id}`, { method: 'PUT', body: form });
  
    if (!res.ok) {
      let errorMessage = 'Failed to update';
      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }
  
    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text);
  }
  