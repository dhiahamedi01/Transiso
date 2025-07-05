
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
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Erreur serveur",
    };
  }
}
