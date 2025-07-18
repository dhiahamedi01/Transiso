'use client';

import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import UserCard from '@/Components/Dahsboard/Card/UserCard';
import Stat_Card from '@/Components/Dahsboard/Card/Stat_Card';
import DashboardOverview from '@/Components/Dahsboard/Overview_box/Overview';
import Breadcrumbs2 from '@/Components/Dahsboard/Breadcrumbs/Breadcrumbs';
import styles from '../DashboardLayout.module.css';
import dynamic from 'next/dynamic';
import Transaction from '@/Components/Dahsboard/Transaction/Transaction';

// Chart dépend probablement de window
const Chart = dynamic(() => import('@/Components/Dahsboard/Chart/Chart'), { ssr: false });

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule le temps de chargement (tu peux remplacer ça par une vraie logique async si nécessaire)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 seconde pour le chargement

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <>
      <Breadcrumbs2 />

      <div className={styles.Globale}>
        <div className={styles.Liste1}>
          <UserCard />
          <Stat_Card />
        </div>

        <div className={styles.Liste2}>
          <DashboardOverview />
          <Chart />
        </div>
      </div>
      <Transaction />
    </>
  );
}
