'use client';

import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  StepIconProps,
  CircularProgress,
} from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import styles from './TrackingStatus.module.css';

// Étapes et icônes associées
const steps = [
  { label: 'Pending', Icon: HourglassEmptyIcon },
  { label: 'In Transit', Icon: LocalShippingIcon },
  { label: 'Delivered', Icon: CheckCircleIcon },
  { label: 'Delayed', Icon: ErrorOutlineIcon },
  { label: 'Cancelled', Icon: CancelIcon },
];

// Connecteur personnalisé
const CustomConnector = styled(StepConnector)(() => ({
  '& .MuiStepConnector-line': {
    height: 3,
    border: 0,
    backgroundColor: '#ccc',
    borderRadius: 1,
  },
}));

// Icône personnalisée
const CustomStepIcon: React.FC<StepIconProps & { Icon: React.ElementType }> = ({
  active,
  completed,
  className,
  icon,
  Icon,
}) => {
  const color = completed || active ? '#1976d2' : '#ccc';

  return (
    <div className={className}>
      <Icon style={{ color, fontSize: 28 }} />
    </div>
  );
};

const TrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async () => {
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentStatus(null);

    try {
      const res = await fetch(`/api/orders/${orderId.trim()}`);
      const json = await res.json();

      if (!json.success) {
        setError(json.error || 'Order not found');
        setLoading(false);
        return;
      }

      const status: string = json.data.status;

      if (!steps.find((s) => s.label === status)) {
        setError(`Unknown status: ${status}`);
        setLoading(false);
        return;
      }

      setCurrentStatus(status);
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const activeStep = currentStatus ? steps.findIndex((s) => s.label === currentStatus) : -1;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Order Tracking</h2>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className={styles.input}
          />
          <button
            onClick={handleTrack}
            disabled={!orderId.trim() || loading}
            className={styles.button}
          >
            Track
          </button>
        </div>

        {loading && (
          <div className={styles.loading}>
            <CircularProgress />
            <p>Loading order status...</p>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        {currentStatus && !loading && !error && (
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<CustomConnector />}
          >
            {steps.map(({ label, Icon }, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <CustomStepIcon {...props} Icon={Icon} />
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
