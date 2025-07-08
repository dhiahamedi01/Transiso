
export async function getProducts() {
    const res = await fetch('/api/products', { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    return res.json(); 
  }
  