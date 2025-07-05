import { useState } from "react";
import { addEmployee } from "@/services/Add_emp";

export function useAddEmployee() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submitEmployee(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await addEmployee(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Erreur inconnue");
      }
    } catch (err: any) {
      setError(err.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, success, submitEmployee, setError, setSuccess };
}
