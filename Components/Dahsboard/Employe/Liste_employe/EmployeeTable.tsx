'use client';

import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Employee, EmployeeRole } from '@/services/employeeService';
import styles from './ListeEmp.module.css';
import Link from 'next/link';
const roles: EmployeeRole[] = ['Admin', 'Manager', 'Employee'];

interface Props {
  employees: Employee[];
  onRoleChange: (id: string, role: EmployeeRole) => void;
  onDelete: (id: string) => void;                // ← nouveau
}

export default function EmployeeTable({
  employees,
  onRoleChange,
  onDelete,
}: Props) {
  /* ---- state modal ---- */
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const target = employees.find(e => e.id === targetId);

  /* ---- handlers ---- */
  const openModal = (id: string) => {
    setTargetId(id);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setTargetId(null);
  };
  const confirmDelete = () => {
    if (targetId) onDelete(targetId);
    closeModal();
  };

  return (
    <>
      {/* ---------- TABLE ---------- */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Image</th>
              <th className={styles.tableHeader}>Name</th>
              <th className={styles.tableHeader}>Email</th>
              <th className={styles.tableHeader}>Phone</th>
              <th className={styles.tableHeader}>Location</th>
              <th className={styles.tableHeader}>Created At</th>
              <th className={styles.tableHeader}>Role</th>
              <th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.noData}>
                  Aucun employé trouvé.
                </td>
              </tr>
            )}

            {employees.map(emp => (
              <tr key={emp.id} className={styles.tableRow}>
                <td className={styles.tableData}>
                  <img
                    src={emp.image ?? '/img/no_img.png'}
                    alt={emp.name}
                    className={styles.employeeImage}
                  />
                </td>

                <td className={styles.tableData}>{emp.name}</td>
                <td className={styles.tableData}>{emp.email}</td>
                <td className={styles.tableData}>{emp.phone || '-'}</td>
                <td className={styles.tableData}>{emp.location || '-'}</td>
                <td className={styles.tableData}>
                  {emp.createdAt.split('T')[0]}
                </td>

                {/* rôle */}
                <td className={styles.tableData}>
                  <select
                    className={styles.selectRole}
                    value={emp.role}
                    onChange={e =>
                      onRoleChange(emp.id, e.target.value as EmployeeRole)
                    }
                  >
                    {roles.map(r => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </td>

                {/* actions */}
                <td className={styles.tableData}>
                <Link href={`/Dashboard/Employe/${emp.id}`}>
                  <button className={styles.actionButton} title="Edit">
                    <EditIcon />
                  </button>
                </Link>
                  <button
                    className={styles.actionButton}
                    title="Delete"
                    onClick={() => openModal(emp.id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- MODAL ---------- */}
      {showModal && target && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalCard}
            onClick={e => e.stopPropagation()} /* stop bubble */
          >
            <h3>Confirmer la suppression</h3>
            <p>
              Supprimer <strong>{target.name}</strong> ?
              <br />
            </p>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Annuler
              </button>
              <button className={styles.deleteBtn} onClick={confirmDelete}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
