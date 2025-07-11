import { useState } from "react";
import { signup, SignupData } from "../services/Signup";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submitSignup(data: SignupData) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const result = await signup(data);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || "Erreur inconnue");
    }
  }

  return { loading, error, success, submitSignup };
}
