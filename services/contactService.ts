export async function sendContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    const res = await fetch('/api/contact', {  // note : chemin sans /api
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const text = await res.text();
      let errorMessage = 'Failed to send message';
  
      try {
        const errorData = JSON.parse(text);
        if (errorData.message) errorMessage = errorData.message;
      } catch {
        if (text) errorMessage = text;
      }
  
      throw new Error(errorMessage);
    }
  
    return res.json();
  }
  export async function fetchContacts() {
    const res = await fetch('/api/contact', { method: 'GET' });
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
  }
  export async function deleteContact(id: number) {
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete contact');
    return res.json();
  }