'use client';

import UserCard from '@/Components/Dahsboard/Card/UserCard';
import Stat_Card from '@/Components/Dahsboard/Card/Stat_Card';
import DashboardOverview from '@/Components/Dahsboard/Overview_box/Overview';
import Breadcrumbs2 from '@/Components/Dahsboard/Breadcrumbs/Breadcrumbs';
import styles from '../DashboardLayout.module.css';
import dynamic from 'next/dynamic';

// Chart dépend probablement de window
const Chart = dynamic(() => import('@/Components/Dahsboard/Chart/Chart'), { ssr: false });

export default function DashboardPage() {
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
    </>
  );
}
