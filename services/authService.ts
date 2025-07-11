export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  console.log("Réponse API login:", data);

  if (!res.ok) {
    throw new Error(data.error || "Erreur de connexion");
  }

  if (!data.user || !data.user.role) {
    throw new Error("Utilisateur ou rôle manquant dans la réponse");
  }

  return data; 
}
