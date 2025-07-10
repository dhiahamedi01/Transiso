import { useState } from 'react';
import { sendMail } from '@/services/mailService';

type MailData = {
  to: string;
  subject: string;
  text: string;
};

export default function useSendMail() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSendMail(data: MailData) {
    setSending(true);
    setError(null);
    try {
      await sendMail(data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setSending(false);
    }
  }

  return { sendMail: handleSendMail, sending, error };
}
