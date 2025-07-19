import axios from "axios";

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  permission: string; 
  password: string;
}

export async function addEmployee(formData: FormData) {
  try {
    const response = await axios.post("/api/employees", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // ✅ On enveloppe la réponse dans un objet standard
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    // ✅ Gestion propre du message d'erreur
    return {
      success: false,
      error:
        error.response?.status === 409
          ? "Un employé avec cet email existe déjà."
          : error.response?.data?.message || error.message || "Erreur serveur",
    };
  }
}
