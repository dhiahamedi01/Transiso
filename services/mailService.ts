type MailData = {
    to: string;
    subject: string;
    text: string;
  };
  
  export async function sendMail(data: MailData) {
    const response = await fetch('/api/mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de l’envoi du mail');
    }
  
    return response.json();
  }
  