import { useState } from "react";
import Cookies from "js-cookie";
import { login } from "@/services/authService";

interface User {
  id: number;
  name: string;
  role?: string;
}

interface LoginData {
  token: string;
  user: User;
}

interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string): Promise<LoginResult> => {
    setLoading(true);
    setError(null);
    try {
      const data: LoginData = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id.toString());
      localStorage.setItem("userName", data.user.name);
      if (data.user.role) {
        localStorage.setItem("role", data.user.role.toLowerCase());
      } else {
        localStorage.removeItem("role");
      }

      Cookies.set("token", data.token, {
        expires: 7,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return { success: true, user: data.user };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
