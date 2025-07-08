export async function createProductWithImages(
    productData: any,
    images: File[],
  ) {
    const fd = new FormData();
  
    // champs texte
    Object.entries(productData).forEach(([k, v]) => fd.append(k, String(v)));
  
    // max 5 images
    images.slice(0, 5).forEach((file) => fd.append('files', file));
  
    const res = await fetch('/api/products', {
      method: 'POST',
      body: fd,
    });
  
    if (!res.ok) throw new Error('API error');
    return res.json();      // { id }
  }
  