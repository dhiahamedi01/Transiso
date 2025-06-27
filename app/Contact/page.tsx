'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { Email, LocationOn, Phone } from '@mui/icons-material';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import styles from './contact.module.css';
import Hero from '@/Components/Feauture/Hero/Hero';

const Contact = () => {
  return (
    <>
    <Hero/>
    <div className={styles.paper}>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.formSection}>
            <Typography variant="h5" fontWeight="bold" gutterBottom className={styles.title}>
              لا تتردد في الكتابة
            </Typography>
            <Typography variant="body2" gutterBottom className={styles.subtitle}>
              تتضمن اللوجستيات التخطيط الفعال والإدارة والتنسيق لحركة السلع والخدمات والمعلومات.
            </Typography>

            <div className={styles.formGrid}>
              <input type="text" placeholder="الاسم" className={styles.input} />
              <input type="email" placeholder="البريد الإلكتروني" className={styles.input} />
              <input type="text" placeholder="الهاتف" className={styles.input} />
              <input type="text" placeholder="الموضوع" className={styles.input} />
              <textarea placeholder="الرسالة" rows={5} className={`${styles.input} ${styles.textarea}`}></textarea>
            </div>
            <Button variant="contained" className={styles.sendButton}>
              إرسال الرسالة
            </Button>
          </div>

          <div className={styles.infoSection}>
            <Typography variant="h5" fontWeight="bold" gutterBottom className={styles.title}>
              تواصل معنا
            </Typography>

            <Typography variant="body2" className={styles.subtitle}>
              نحن هنا لمساعدتك في كل استفساراتك. لا تتردد في التواصل معنا.
            </Typography>

            <Box className={styles.liste}>
              <Box className={styles.infoBox}>
                <div className={styles.iconBox}><PhoneEnabledIcon sx={{ color: 'white',fontSize:'27px' }} /></div>
                <div >
                  <Typography className={styles.arabic} fontWeight="bold">هل لديك أي سؤال؟</Typography>
                  <Typography className={styles.number}>5377671027 (90+) </Typography>
                </div>
              </Box>

              <Box className={styles.infoBox}>
                <div className={styles.iconBox}><Email sx={{ color: 'white',fontSize:'27px' }} /></div>
                <div >
                  <Typography className={styles.arabic} fontWeight="bold">راسلنا عبر البريد الإلكتروني</Typography>
                  <Typography className={styles.number}>info@transisologistic.com</Typography>
                </div>
              </Box>

              <Box className={styles.infoBox}>
                <div className={styles.iconBox}><LocationOn sx={{ color: 'white',fontSize:'27px' }} /></div>
                <div className={styles.arabic}>
                  <Typography className={styles.arabic} fontWeight="bold">المقر الرئيسي</Typography>
                  <Typography className={styles.number}>اسطنبول، تركيا شارع ١٥٨٢</Typography>
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