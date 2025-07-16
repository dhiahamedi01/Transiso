
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useLogo() {
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await axios.get('/api/Manage_website/Logo');
        setLogo(res.data.Logo || null);
      } catch (err: any) {
        console.error('Erreur lors du chargement du logo :', err);
        setError('Erreur lors du chargement du logo');
      } finally {
        setLoading(false);
      }
    }

    fetchLogo();
  }, []);

  return { logo, loading, error };
}
