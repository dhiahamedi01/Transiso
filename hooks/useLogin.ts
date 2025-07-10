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

      // Sauvegarde du token
      localStorage.setItem("token", data.token);

      // Sauvegarde des infos utilisateur (id, name, role)
      localStorage.setItem("userId", data.user.id.toString());
      localStorage.setItem("userName", data.user.name);

      // Ajout du rôle dans localStorage
      // Assumons que data.user.role contient le rôle en clair (ex: "admin", "user", etc.)
      if (data.user.role) {
        localStorage.setItem("role", data.user.role.toLowerCase());
      } else {
        localStorage.removeItem("role");
      }

      // Set cookie pour session côté serveur / SSR si besoin
      Cookies.set("token", data.token, {
        expires: 7,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err; // propager l'erreur si besoin
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
