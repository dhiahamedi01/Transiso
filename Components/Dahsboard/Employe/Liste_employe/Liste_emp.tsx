'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './ListeEmp.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

type EmployeeRole = 'Admin' | 'Manager' | 'Employee';

interface Employee {
  id: string;
  image: string | null;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: EmployeeRole;
  createdAt: string;
}

const roles: EmployeeRole[] = ['Admin', 'Manager', 'Employee'];

function ListeEmp() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/api/Liste_employee');
        if (res.data.success) {
          setEmployees(res.data.employees);
          setFilteredEmployees(res.data.employees);
        } else {
          setError('Erreur lors de la récupération des employés');
        }
      } catch (err) {
        setError('Erreur réseau ou serveur');
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchTerm, employees]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleRoleChange = (id: string, newRole: EmployeeRole) => {
    const updated = employees.map(emp =>
      emp.id === id ? { ...emp, role: newRole } : emp
    );
    setEmployees(updated);
  };

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.leftHeader}>
          <input
            type="search"
            placeholder="Search..."
            className={style.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={style.rightHeader}>
        <Link href="/Employe/New_employe" passHref legacyBehavior>
          <button className={style.newEmpButton}>
            <span className={style.plusIcon}>+</span>
            <span>New Employee</span>
          </button>
        </Link>
        </div>
      </div>

      {loading && <p style={{ padding: '1rem' }}>Loading employees...</p>}
      {error && <p style={{ color: 'red', padding: '1rem' }}>{error}</p>}

      {!loading && !error && (
        <div className={style.tableWrapper}>
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.tableHeader}>Image</th>
                <th className={style.tableHeader}>Name</th>
                <th className={style.tableHeader}>Email</th>
                <th className={style.tableHeader}>Phone</th>
                <th className={style.tableHeader}>Location</th>
                <th className={style.tableHeader}>Created At</th>
                <th className={style.tableHeader}>Role</th>
                <th className={style.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map(emp => (
                <tr key={emp.id} className={style.tableRow}>
                  <td className={style.tableData}>
                    {emp.image ? (
                        <img
                        src={emp.image} 
                        alt={emp.name}
                        className={style.employeeImage}
                      />
                  
                    ) : (
                      <div className={style.noImage}>
                             <img
                        src="/img/no_img.png" 
                        alt='no_img'
                        className={style.employeeImage}
                      />
                      </div>
                    )}
                  </td>
                  <td className={style.tableData}>{emp.name}</td>
                  <td className={style.tableData}>{emp.email}</td>
                  <td className={style.tableData}>{emp.phone || '-'}</td>
                  <td className={style.tableData}>{emp.location || '-'}</td>
                  <td className={style.tableData}>{emp.createdAt.split('T')[0]}</td>
                  <td className={style.tableData}>
                    <select
                      className={style.selectRole}
                      value={emp.role}
                      onChange={e => handleRoleChange(emp.id, e.target.value as EmployeeRole)}
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={style.tableData}>
                    <button className={style.actionButton} title="Edit">
                      <EditIcon />
                    </button>
                    <button className={style.actionButton} title="Delete">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
              {currentEmployees.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center' }}>
                    Aucun employé trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className={style.pagination}>
          <button
            className={style.pageButton}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                className={`${style.pageButton} ${
                  page === currentPage ? style.activePage : ''
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className={style.pageButton}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ListeEmp;
