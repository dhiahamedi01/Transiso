
import React from 'react';

import styles from './DashboardLayout.module.css';
import DashboardSidebar from '@/Components/Sidebar/Sidebar';
import DashboardNavbar from '@/Components/Navbar/DashboardNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
      <DashboardSidebar/>
      </div>
      <div className={styles.content}>
        <div className={styles.navbar}>
        <DashboardNavbar/>
        </div>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
