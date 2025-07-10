import { useEffect, useState } from "react";
import { fetchUserPermissions } from "@/services/checkPermission";

export function useCheckPermissions() {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadPermissions() {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token non trouvé");

        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("UserId non trouvé");

        // Récupérer rôle dans localStorage
        const role = localStorage.getItem("role")?.toLowerCase() || "";

        // Si admin, on set directement isAdmin
        if (role === "admin") {
          setIsAdmin(true);
          setPermissions([]); // permissions non nécessaires ici
          return;
        }

        // Sinon fetch permissions depuis API
        const data = await fetchUserPermissions(userId);

        const permNames = data.permissions.map(p => p.name.toLowerCase());

        setPermissions(permNames);

        setIsAdmin(permNames.includes("admin"));
      } catch (e: any) {
        setPermissions([]);
        setIsAdmin(false);
        setError(e.message || "Erreur lors du chargement des permissions");
      } finally {
        setLoading(false);
      }
    }

    loadPermissions();
  }, []);

  return { permissions, loading, error, isAdmin };
}
