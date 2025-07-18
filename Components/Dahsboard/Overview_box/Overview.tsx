import React, { useEffect, useState } from 'react';
import styles from './Overview.module.css';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface Order {
  id: number;
  orderId: string;
  customer: string;
  date: string;
  address: string;
  country: string;
  products: string;
  status: string;
  payment: string;
  paymentMethod: string;
  createdAt: string;
  phone: string;
  email: string;
}

const Overview: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/Liste_order');
        const json = await res.json();
        if (json.success) {
          setOrders(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const orderCount = orders.length;
  const FAKE_UNIT_PRICE = 120;

  const totalRevenue = orderCount * FAKE_UNIT_PRICE;
  const averagePrice = orderCount > 0 ? totalRevenue / orderCount : 0;

  const data = [
    {
      label: 'Orders',
      number: orderCount,
      trend: 'up',
      iconClass: 'cart',
      icon: <ShoppingCartIcon fontSize="large" />,
    },
    {
      label: 'Total Revenue',
      number: totalRevenue.toFixed(2),
      trend: 'up',
      iconClass: 'cartTwo',
      icon: <AttachMoneyIcon fontSize="large" />,
    },
    {
      label: 'Average Order Value',
      number: averagePrice.toFixed(2),
      trend: 'down',
      iconClass: 'cartFour',
      icon: <TrendingUpIcon fontSize="large" />,
    },
  ];

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
