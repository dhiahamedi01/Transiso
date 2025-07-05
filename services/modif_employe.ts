import api from './axiosInstance';

export interface EmployeeForEdit {
  id: string;
  image: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  permission: string; 
}

export async function fetchEmployee(id: string) {
  const { data } = await api.get<{ success: boolean; employee: EmployeeForEdit }>(
    `/Modif_employee/${id}`
  );
  if (!data.success) throw new Error('Employé introuvable');
  return data.employee;
}


export async function updateEmployee(id: string, form: FormData) {
  const { data } = await api.patch<{ success: boolean; error?: string }>(
    `/Modif_employee/${id}`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
}
