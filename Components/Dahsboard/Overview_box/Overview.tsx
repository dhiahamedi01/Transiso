import React from 'react';
import styles from './Overview.module.css';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface DataItem {
  label: string;
  number: number;
  trend: 'up' | 'down';
  iconClass: keyof typeof styles;
  icon: React.ReactNode;
}

const data: DataItem[] = [
  {
    label: 'Orders',
    number: 22,
    trend: 'up',
    iconClass: 'cart',
    icon: <ShoppingCartIcon  fontSize="large" />,
  },
  {
    label: 'Revenue',
    number: 352.342,
    trend: 'up',
    iconClass: 'cartTwo',
    icon: <AttachMoneyIcon fontSize="large" />,
  },
  {
    label: 'Average Price',
    number: 112.220,
    trend: 'down',
    iconClass: 'cartFour',
    icon: <TrendingUpIcon  fontSize="large" />,
  }
];

const Overview: React.FC = () => {
  return (
    <div className={styles['overview-boxes']}>
      {data.map((item, index) => (
        <div key={index} className={styles.box}>
          <div className={styles.rightSide}>
            <div className={styles.boxTopic}>{item.label}</div>
            <div className={styles.number}>{item.number}</div>
            <div className={styles.indicator}>
              {item.trend === 'up' ? (
                <ArrowUpwardIcon className={styles.indicatorIcon} />
              ) : (
                <ArrowDownwardIcon className={`${styles.indicatorIcon} ${styles.indicatorIconDown}`} />
              )}
              <span className={styles.text}>
                {item.trend === 'up' ? 'Up from yesterday' : 'Down from today'}
              </span>
            </div>
          </div>
          <div className={styles[item.iconClass]}>{item.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default Overview;
