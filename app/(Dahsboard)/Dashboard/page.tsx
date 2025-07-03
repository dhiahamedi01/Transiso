import UserCard from '@/Components/Dahsboard/Card/UserCard'
import React from 'react'
import styles from '../DashboardLayout.module.css';
import Stat_Card from '@/Components/Dahsboard/Card/Stat_Card';
import Breadcrumbs2 from '@/Components/Dahsboard/Breadcrumbs/Breadcrumbs';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import DashboardOverview from '@/Components/Dahsboard/Overview_box/Overview';
import Chart from '@/Components/Dahsboard/Chart/Chart';

function page() {
  return (
    <div>

    <Breadcrumbs2/>
    <div className={styles.Globale}>
      <div className={styles.Liste1}>
      <UserCard/>
      <Stat_Card/>
      </div>
      <div className={styles.Liste2}>
        <DashboardOverview/>
        <Chart/>
      </div>
    </div>
    </div>
  )
}

export default page