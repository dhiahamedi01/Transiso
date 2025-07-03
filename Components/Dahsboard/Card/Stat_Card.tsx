import React from 'react';
import styles from './UserCard.module.css';
import { Button, Typography, Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function Stat_Card() {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      type: 'radialBar',
      height: 200,
      offsetY: 0,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -100,
        endAngle: 100,
        hollow: {
          margin: 0,
          size: '60%', // ✅ Plus petit → élargit la barre bleue principale
        },
        track: {
          background: theme.palette.grey[300],
          strokeWidth: '100%', // ✅ Pleine largeur pour le fond
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
      colors: ['#556EE6'], // ✅ Couleur des “aiguilles” (bleu)
    },
    stroke: {
      lineCap: 'butt',
      dashArray: 4 // ✅ Crée l’effet "tick"
    },
    labels: ['Series A'],
  };

  const chartSeries = [67];

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
        {/* Haut de carte */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600,color:'#343A40' }}>
            Monthly Earning
          </Typography>
         
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            This Month
            </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                $34,252
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="success.main" sx={{ fontWeight: 600, color:'#52CCA0' }}>
                  12%
                </Typography>
                <span style={{ color: '#52CCA0', fontSize: '1rem',marginBottom:'5px' }}>↑</span>
                <Typography variant="body2" color="text.secondary">
                  From previous period
                </Typography>
              </Box>
              <Button className={styles.viewButton} variant="contained" sx={{width:'130px',marginTop:'20px'}}>
                      View More →
              </Button>
            </Box>

            {/* Chart compteur style voiture */}
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

        {/* Bas de carte */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2,textAlign:'center' }}>
    

          <Typography variant="body2" color="text.secondary">
            We craft digital, graphic and dimensional thinking.
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Stat_Card;
