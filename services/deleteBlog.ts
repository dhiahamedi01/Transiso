// services/blogService.ts (complément)
export async function deleteBlog(id: number) {
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Échec suppression');
    return res.json();
  }
  