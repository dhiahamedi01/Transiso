'use client';

import Link from 'next/link';
import SearchInput   from '@/Components/Dahsboard/Employe/Liste_employe/SearchInput';
import Pagination    from '@/Components/Dahsboard/Employe/Liste_employe/Pagination';
import EmployeeTable from '@/Components/Dahsboard/Employe/Liste_employe/EmployeeTable';
import { useEmployees } from '@/hooks/useEmployees';           
import styles from '@/Components/Dahsboard/Employe/Liste_employe/ListeEmp.module.css';

export default function EmployeeListPage() {
  const {
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    employees,
    changeRole,
    removeEmployee,        
  } = useEmployees(6);

  return (
    <div className={styles.card}>
      {/* ----- HEADER ----- */}
      <header className={styles.header}>
        <SearchInput value={search} onChange={setSearch} />

        <Link href="/Employe/New_employe">
          <button className={styles.newEmpButton}>
            <span className={styles.plusIcon}>+</span> New Employee
          </button>
        </Link>
      </header>

      {/* ----- CONTENT ----- */}
      {loading && <p className={styles.info}>Loading…</p>}
      {error   && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <EmployeeTable
            employees={employees}
            onRoleChange={changeRole}
            onDelete={async id => {
              try {
                await removeEmployee(id);             
              } catch {
                alert('Erreur lors de la suppression');
              }
            }}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
