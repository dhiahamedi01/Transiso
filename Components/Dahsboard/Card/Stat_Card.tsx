import React, { useEffect, useState } from 'react';
import styles from './UserCard.module.css';
import { Button, Typography, Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function Stat_Card() {
  const theme = useTheme();

  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const UNIT_PRICE = 120;
  const MONTHLY_GOAL = 50000;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/Liste_order');
        const json = await res.json();
        if (json.success) {
          const orders = json.data;

          // Date actuelle (UTC)
          const now = new Date();
          const currentMonth = now.getMonth() + 1; // ⚠️ getMonth() = 0 (janvier) → on ajoute +1
          const currentYear = now.getFullYear();

          const monthlyOrders = orders.filter((order: any) => {
            const dateParts = order.createdAt.split(/[- :]/); // ['2025','07','11','02','50','32']
            const orderYear = parseInt(dateParts[0]);
            const orderMonth = parseInt(dateParts[1]);

            return orderYear === currentYear && orderMonth === currentMonth;
          });

          const totalOrders = monthlyOrders.length;
          const totalRevenue = totalOrders * UNIT_PRICE;

          setOrderCount(totalOrders);
          setRevenue(totalRevenue);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const revenuePercentage = Math.min((revenue / MONTHLY_GOAL) * 100, 100).toFixed(0);
  const chartSeries = [parseInt(revenuePercentage)];

  const chartOptions = {
    chart: {
      type: 'radialBar',
      height: 200,
      offsetY: 0,
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        startAngle: -100,
        endAngle: 100,
        hollow: {
          margin: 0,
          size: '60%',
        },
        track: {
          background: theme.palette.grey[300],
          strokeWidth: '100%',
          margin: 0,
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '16px',
            color: '#ADB5BD',
            offsetY: 50
          },
          value: {
            fontSize: '22px',
            color: '#556EE6',
            offsetY: -10,
            formatter: (val: number) => `${val}%`
          }
        }
      }
    },
    fill: {
      type: 'solid',
      colors: ['#556EE6'],
    },
    stroke: {
      lineCap: 'butt',
      dashArray: 4
    },
    labels: ['Progress'],
  };

  return (
    <div>
      <Box
        className={styles.card2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          p: 3,
          boxSizing: 'border-box'
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: '#343A40' }}>
            Monthly Earning
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                This Month
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                ${revenue.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#52CCA0' }}>
                  +{chartSeries[0]}%
                </Typography>
                <span style={{ color: '#52CCA0', fontSize: '1rem', marginBottom: '5px' }}>↑</span>
                <Typography variant="body2" color="text.secondary">
                  From goal of ${MONTHLY_GOAL.toLocaleString()}
                </Typography>
              </Box>
              <Button className={styles.viewButton} variant="contained" sx={{ width: '130px', marginTop: '20px' }}>
                View More →
              </Button>
            </Box>

            <Box sx={{ width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ReactApexChart
                options={chartOptions as ApexCharts.ApexOptions}
                series={chartSeries}
                type="radialBar"
                height={200}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            We craft digital, graphic and dimensional thinking.
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Stat_Card;
