import api from './axiosInstance';

export type EmployeeRole = 'Admin' | 'Manager' | 'Employee';

export interface Employee {
  id: string;
  image: string | null;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: EmployeeRole;
  createdAt: string;
}

export async function fetchEmployees() {
  const { data } = await api.get<{ success: boolean; employees: Employee[] }>(
    '/Liste_employee'
  );
  if (!data.success) throw new Error('API returned success = false');
  return data.employees;
}
