'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Email, LocationOn } from '@mui/icons-material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { useTranslation } from 'react-i18next';
import styles from './contact.module.css';
import Hero from '@/Components/Feauture/Hero/Hero';
import { sendContactForm } from '@/services/contactService';

const Contact = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const dir = t('contacter.direction') || 'ltr';

  // Etats pour gérer le formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Gestion des changements dans les inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Gestion de l'envoi du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await sendContactForm(formData);
      setSuccessMsg(t('contacter.form.successMessage'));
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error: any) {
      setErrorMsg(error.message || t('contacter.form.errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero />
      <div className={styles.paper} dir={dir} style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
        <div className={styles.root}>
          <div className={styles.container}>
            {/* Form Section */}
            <div className={styles.formSection}>
              <Typography variant="h5" fontWeight="bold" gutterBottom className={styles.title}>
                {t('contacter.form.title')}
              </Typography>
              <Typography variant="body2" gutterBottom className={styles.subtitle}>
                {t('contacter.form.subtitle')}
              </Typography>

              <form className={styles.formGrid} onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="name"
                  placeholder={t('contacter.form.placeholders.name')}
                  className={styles.input}
                  dir={dir}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('contacter.form.placeholders.email')}
                  className={styles.input}
                  dir={dir}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder={t('contacter.form.placeholders.phone')}
                  className={styles.input}
                  dir={dir}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder={t('contacter.form.placeholders.subject')}
                  className={styles.input}
                  dir={dir}
                  value={formData.subject}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder={t('contacter.form.placeholders.message')}
                  rows={5}
                  className={`${styles.input} ${styles.textarea}`}
                  dir={dir}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <Button
                  type="submit"
                  variant="contained"
                  className={styles.sendButton}
                  disabled={loading}
                >
                  {loading ? t('contacter.form.sending') : t('contacter.form.sendButton')}
                </Button>

                {/* Messages de succès ou erreur */}
                {successMsg && (
                  <Typography color="success.main" mt={4}>
                    {successMsg}
                  </Typography>
                )}
                {errorMsg && (
                  <Typography color="error.main" mt={4}>
                    {errorMsg}
                  </Typography>
                )}
              </form>
            </div>

            {/* Info Section */}
            <div className={styles.infoSection}>
              <Typography variant="h5" fontWeight="bold" gutterBottom className={styles.title}>
                {t('contacter.contactInfo.title')}
              </Typography>

              <Typography variant="body2" className={styles.subtitle}>
                {t('contacter.contactInfo.subtitle')}
              </Typography>

              <Box className={styles.liste}>
                <Box className={styles.infoBox}>
                  <div className={styles.iconBox}>
                    <PhoneEnabledIcon sx={{ color: 'white', fontSize: '27px' }} />
                  </div>
                  <div>
                    <Typography fontWeight="bold" className={styles.arabicah}>{t('contacter.contactInfo.phoneQuestion')}</Typography>
                    <Typography className={styles.arabicah2}>{t('contacter.contactInfo.phoneNumber')}</Typography>
                  </div>
                </Box>

                <Box className={styles.infoBox}>
                  <div className={styles.iconBox}>
                    <Email sx={{ color: 'white', fontSize: '27px' }} />
                  </div>
                  <div>
                    <Typography fontWeight="bold" className={styles.arabicah}>{t('contacter.contactInfo.emailUs')}</Typography>
                    <Typography className={styles.arabicah2}>{t('contacter.contactInfo.emailAddress')}</Typography>
                  </div>
                </Box>

                <Box className={styles.infoBox}>
  <div className={styles.iconBox}>
    <LocationOn sx={{ color: 'white', fontSize: '27px' }} />
  </div>
  <div>
    <Typography fontWeight="bold" className={styles.arabicah}>
      {t('contacter.contactInfo.locationsTitle')}
    </Typography>
    <ul className={styles.locationList}>
      <li>
        {t('contacter.contactInfo.address')}
      </li>
      <li>
        {t('contacter.contactInfo.omanAddress')}
      </li>
      <li>
        {t('contacter.contactInfo.yemenAddress')}
      </li>
    </ul>
  </div>
</Box>

              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
