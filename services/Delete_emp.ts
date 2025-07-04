
export async function deleteEmployee(id: string) {
    const res = await fetch(`/api/employees/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) {
      throw new Error('Erreur lors de la suppression');
    }
  
    return res.json();
  }
  