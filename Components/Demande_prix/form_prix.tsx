'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import styles from './form_prix.module.css';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

const Alert = MuiAlert as React.FC<any>;

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  destination: string;
  shippingType: string;
  description: string;
  weight: string;
  services: string[];
}

export default function ShippingForm() {
  const { t, i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '',
    destination: '',
    shippingType: '',
    description: '',
    weight: '',
    services: [],
  });

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const demande = {
    destinations: [
      t('dest.saudi'), t('dest.uae'), t('dest.qatar'), t('dest.bahrain'),
      t('dest.kuwait'), t('dest.oman'), t('dest.yemen'), t('dest.lebanon'), t('dest.jordan')
    ],
    countries: [
      { code: '+966', name: t('dest.saudi'), flag: '🇸🇦' },
      { code: '+971', name: t('dest.uae'), flag: '🇦🇪' },
      { code: '+974', name: t('dest.qatar'), flag: '🇶🇦' },
      { code: '+973', name: t('dest.bahrain'), flag: '🇧🇭' },
      { code: '+965', name: t('dest.kuwait'), flag: '🇰🇼' },
      { code: '+968', name: t('dest.oman'), flag: '🇴🇲' },
      { code: '+967', name: t('dest.yemen'), flag: '🇾🇪' },
      { code: '+961', name: t('dest.lebanon'), flag: '🇱🇧' },
      { code: '+962', name: t('dest.jordan'), flag: '🇯🇴' },
    ],
    shippingOptions: [
      { label: t('shipping.air'), icon: '/img/icon de form/air.svg' },
      { label: t('shipping.ocean'), icon: '/img/icon de form/ocean.svg' },
      { label: t('shipping.land'), icon: '/img/icon de form/land.svg' },
      { label: t('shipping.partial'), icon: '/img/icon de form/international.svg' },
    ],
    extraServices: [
      { label: t('services12.packaging'), icon: '/icons/box.png' },
      { label: t('services12.clearance'), icon: '/icons/tools.png' },
      { label: t('services12.tracking'), icon: '/icons/track.png' },
      { label: t('services12.storage'), icon: '/icons/store.png' },
    ]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter(item => item !== value),
      }));
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, shippingType: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fullPhone = `${formData.countryCode}${formData.phone}`;

    try {
      await axios.post('/api/demande', {
        ...formData,
        phone: fullPhone,
      });

      setSnack({ open: true, message: t('form.success'), severity: 'success' });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        countryCode: '',
        destination: '',
        shippingType: '',
        description: '',
        weight: '',
        services: [],
      });
    } catch (error) {
      console.error(error);
      setSnack({ open: true, message: t('form.error'), severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} dir={direction}>
      <div className={styles.formSide}>
        <p className={styles.description}>{t('form.description')}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            {t('form.fullName')}:
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={styles.input} />
          </label>

          <label>
            {t('form.email')}:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} />
          </label>

          <label className={styles.phoneContainer}>
            {t('form.phone')}:
            <div className={styles.phoneGroup}>
              <select name="countryCode" value={formData.countryCode} onChange={handleChange} required className={styles.select}>
                <option value="">{t('form.countryCode')}</option>
                {demande.countries.map(({ code, name, flag }) => (
                  <option key={code} value={code}>
                    {flag} {name} {code}
                  </option>
                ))}
              </select>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={styles.input} />
            </div>
          </label>

          <label>
            {t('form.destination')}:
            <select name="destination" value={formData.destination} onChange={handleChange} required className={styles.select}>
              <option value="">{t('form.destinationPlaceholder')}</option>
              {demande.destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </label>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{t('form.shippingType')}:</legend>
            <div className={styles.optionGrid}>
              {demande.shippingOptions.map(({ label, icon }) => (
                <label key={label} className={styles.iconOption}>
                  <input
                    type="radio"
                    name="shippingType"
                    value={label}
                    checked={formData.shippingType === label}
                    onChange={handleChange}
                  />
                  <img src={icon} alt={label} className={styles.iconImage} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label>
            {t('form.descriptionLabel')}:
            <input type="text" name="description" value={formData.description} onChange={handleChange} required className={styles.input} />
          </label>

          <label>
            {t('form.weight')}:
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} required className={styles.input} />
          </label>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{t('form.extraServices')}</legend>
            <div className={styles.optionGrid}>
              {demande.extraServices.map(({ label }) => (
                <label key={label} className={styles.iconOption}>
                  <input
                    type="checkbox"
                    value={label}
                    checked={formData.services.includes(label)}
                    onChange={handleChange}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.footer}>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : <>
                {t('form.submit')} <SaveIcon />
              </>}
            </button>
          </div>
        </form>
      </div>

      {/* Snackbar MUI */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: '100%' }}>
        <div className={styles.arabic}>{snack.message}</div>
        </Alert>
      </Snackbar>
    </div>
  );
}
