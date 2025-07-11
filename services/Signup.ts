import axios from "axios";

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  permission?: string;
  password: string;
  role?: string;
}

export interface SignupResponse {
  success: boolean;
  error?: string;
}

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  try {
    const response = await axios.post("/api/signup", data);
    return response.data;
  } catch (error: any) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
};
