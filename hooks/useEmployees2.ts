'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Employee, EmployeeRole,fetchEmployees} from '../services/employeeService2';
import { deleteEmployee} from '../services/Delete_emp';


export function useEmployees(itemsPerPage = 8) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 📦 fetch employées une seule fois
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔍 filtrage selon la recherche
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return employees.filter(
      e =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q)
    );
  }, [employees, search]);

  // 📄 pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const current = useMemo(
    () => filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filtered, page, itemsPerPage]
  );

  // 🔁 changement de rôle
  const changeRole = useCallback((id: string, role: EmployeeRole) => {
    setEmployees(prev =>
      prev.map(e => (e.id === id ? { ...e, role } : e))
    );
  }, []);

  // ❌ suppression d'un employé avec rollback en cas d'erreur
  const removeEmployee = useCallback(
    async (id: string) => {
      const backup = employees;
      setEmployees(prev => prev.filter(e => e.id !== id)); 
      try {
        await deleteEmployee(id); 
      } catch (error) {
        setEmployees(backup); 
        throw error;
      }
    },
    [employees]
  );

  return {
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    employees: current,
    changeRole,
    removeEmployee, 
  };
}
