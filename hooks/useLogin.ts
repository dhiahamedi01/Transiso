import { useState } from "react";
import Cookies from "js-cookie";
import { login } from "@/services/authService";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);

      // 1) Toujours là si vous en avez encore besoin côté client
      localStorage.setItem("token", data.token);

      Cookies.set("token", data.token, {
        // durée de vie d’une semaine (ou ce que vous voulez)
        expires: 7,
        // envoyé sur tout le site
        path: "/",
        // empêche la plupart des CSRF
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
