'use client';
import React, { useState } from 'react';
import style from './ListeEmp.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type EmployeeRole = 'Admin' | 'Manager' | 'Employee';

interface Employee {
  id: string;
  image: string;
  name: string;
  email: string;
  password: string;
  role: EmployeeRole;
  createdAt: string;
}
const dataInitial: Employee[] = [
    {
      id: 'E001',
      image: 'https://i.pravatar.cc/40?img=1',
      name: 'Zakaria Ben Salah',
      email: 'zakaria@example.com',
      password: '********',
      role: 'Admin',
      createdAt: '2025-07-01',
    },
    {
      id: 'E002',
      image: 'https://i.pravatar.cc/40?img=2',
      name: 'Nour Youssef',
      email: 'nour@example.com',
      password: '********',
      role: 'Manager',
      createdAt: '2025-06-20',
    },
    {
      id: 'E003',
      image: 'https://i.pravatar.cc/40?img=3',
      name: 'Lina Amari',
      email: 'lina@example.com',
      password: '********',
      role: 'Employee',
      createdAt: '2025-06-15',
    },
    // Nouveaux exemples :
    {
      id: 'E004',
      image: 'https://i.pravatar.cc/40?img=4',
      name: 'Karim Haddad',
      email: 'karim.haddad@example.com',
      password: '********',
      role: 'Employee',
      createdAt: '2025-05-10',
    },
    {
      id: 'E005',
      image: 'https://i.pravatar.cc/40?img=5',
      name: 'Sara Bensalem',
      email: 'sara.bensalem@example.com',
      password: '********',
      role: 'Manager',
      createdAt: '2025-04-25',
    },
    {
      id: 'E006',
      image: 'https://i.pravatar.cc/40?img=6',
      name: 'Omar Farhat',
      email: 'omar.farhat@example.com',
      password: '********',
      role: 'Admin',
      createdAt: '2025-03-30',
    },
    {
      id: 'E007',
      image: 'https://i.pravatar.cc/40?img=7',
      name: 'Maya Saidi',
      email: 'maya.saidi@example.com',
      password: '********',
      role: 'Employee',
      createdAt: '2025-07-02',
    },
    {
      id: 'E008',
      image: 'https://i.pravatar.cc/40?img=8',
      name: 'Youssef Mansour',
      email: 'youssef.mansour@example.com',
      password: '********',
      role: 'Manager',
      createdAt: '2025-06-18',
    },
  ];
  

const roles: EmployeeRole[] = ['Admin', 'Manager', 'Employee'];

function ListeEmp() {
  const [employees, setEmployees] = useState<Employee[]>(dataInitial);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination calculation
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = employees.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  // Changer de page
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Modifier statut (role) via select
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
            // tu peux ajouter gestion filtre ici si tu veux
          />
        </div>
        <div className={style.rightHeader}>
          <button className={style.newEmpButton}>
          <span className={style.plusIcon}>+</span>
            <span>New Employee</span>

          </button>
        </div>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.tableHeader}>Image</th>
              <th className={style.tableHeader}>Name</th>
              <th className={style.tableHeader}>Email</th>
              <th className={style.tableHeader}>Password</th>
              <th className={style.tableHeader}>Created At</th>
              <th className={style.tableHeader}>Role</th>
              <th className={style.tableHeader}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentEmployees.map((emp) => (
              <tr key={emp.id} className={style.tableRow}>
                <td className={style.tableData}>
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className={style.employeeImage}
                  />
                </td>
                <td className={style.tableData}>{emp.name}</td>
                <td className={style.tableData}>{emp.email}</td>
                <td className={style.tableData}>{emp.password}</td>
                <td className={style.tableData}>{emp.createdAt}</td>
                <td className={style.tableData}>
                  <select
                    className={style.selectRole}
                    value={emp.role}
                    onChange={(e) =>
                      handleRoleChange(emp.id, e.target.value as EmployeeRole)
                    }
                  >
                    {roles.map((role) => (
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
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
    </div>
  );
}

export default ListeEmp;
