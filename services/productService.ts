export async function createProductWithImages(
  productData: any,
  images: File[],
) {
  const fd = new FormData();

  // Ajout des champs texte
  Object.entries(productData).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      fd.append(k, String(v));
    }
  });

  // Ajout max 5 images
  images.slice(0, 5).forEach((file) => fd.append('files', file));

  const res = await fetch('/api/products', {
    method: 'POST',
    body: fd,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'API error');
  }

  return res.json(); // Expects { id: ... }
}
