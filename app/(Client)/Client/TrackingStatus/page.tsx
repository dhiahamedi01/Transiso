'use client';

import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  StepIconProps,
  CircularProgress,
  TextField,
  Button,
} from '@mui/material';
import Check from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StoreIcon from '@mui/icons-material/Store';
import HomeIcon from '@mui/icons-material/Home';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import GavelIcon from '@mui/icons-material/Gavel';
import { styled } from '@mui/material/styles';
import styles from './TrackingStatus.module.css';

// Étapes adaptées à l'import/export
const steps = [
  { label: 'Préparation', icon: <StoreIcon /> },
  { label: 'En transit local', icon: <LocalShippingIcon /> },
  { label: 'Départ à l’étranger', icon: <FlightTakeoffIcon /> },
  { label: 'Arrivée à destination', icon: <FlightLandIcon /> },
  { label: 'Déclaration Douanes', icon: <GavelIcon /> },
  { label: 'Livraison finale', icon: <HomeIcon /> },
];

// Connector personnalisé (gris)
const CustomConnector = styled(StepConnector)(() => ({
  '& .MuiStepConnector-line': {
    height: 3,
    border: 0,
    backgroundColor: '#ccc',
    borderRadius: 1,
  },
}));

// Icône de chaque étape personnalisée
interface CustomStepIconProps extends StepIconProps {
  iconNode: React.ReactElement;
  completed: boolean;
}

const CustomStepIcon: React.FC<CustomStepIconProps> = ({ completed, iconNode }) => {
  return (
    <div
      className={`${styles.stepIcon} ${
        completed ? styles.completed : styles.pending
      }`}
    >
      {completed ? <Check /> : iconNode}
    </div>
  );
};

const Page: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStepId, setCurrentStepId] = useState<number | null>(null);

  const handleTrack = () => {
    if (!trackingId) return;

    setLoading(true);
    setCurrentStepId(null);

    setTimeout(() => {
      const simulatedStep = Math.floor(Math.random() * steps.length);
      setCurrentStepId(simulatedStep);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Suivi d’expédition</h2>
        <div className={styles.inputWrapper}>
  <input
    type="text"
    placeholder="Entrer l'ID de suivi"
    value={trackingId}
    onChange={(e) => setTrackingId(e.target.value)}
    className={styles.input}
  />
  <button
    onClick={handleTrack}
    disabled={!trackingId || loading}
    className={styles.button}
  >
    search
  </button>
</div>


        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
            <p>Chargement des informations...</p>
          </div>
        ) : currentStepId !== null ? (
          <Stepper
            alternativeLabel
            activeStep={currentStepId}
            connector={<CustomConnector />}
          >
            {steps.map((step, index) => (
              <Step key={step.label} completed={index < currentStepId}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <CustomStepIcon
                      {...props}
                      iconNode={step.icon}
                      completed={index < currentStepId}
                    />
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
