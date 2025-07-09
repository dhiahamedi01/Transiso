"use client";

import React from 'react';
import styles from './DashboardLayout.module.css';

import DashboardSidebar from '@/Components/Sidebar/Sidebar';
import DashboardNavbar from '@/Components/Navbar/DashboardNavbar';
import ProtectedRoute from '@/Components/ProtectedRoute'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <DashboardSidebar />
        </div>
        <div className={styles.content}>
          <div className={styles.navbar}>
            <DashboardNavbar />
          </div>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
