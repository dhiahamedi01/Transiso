'use client';
import { useState, useEffect } from 'react';
import { fetchEmployee, updateEmployee } from '@/services/modif_employe';

export function useEditEmployee(id: string) {
  const [initial, setInitial] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* chargement initial */
  useEffect(() => {
    (async () => {
      try {
        const emp = await fetchEmployee(id);
        setInitial({ ...emp, password: '', confirmPassword: '' });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* soumission */
  const submit = async (fd: FormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updateEmployee(id, fd);
      if (res.success) setSuccess(true);
      else setError(res.error || 'Erreur update');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return { initial, loading, saving, error, success, submit, setError, setSuccess };
}
