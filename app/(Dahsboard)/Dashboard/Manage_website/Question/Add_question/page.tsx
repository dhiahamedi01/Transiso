'use client';

import React, { useState } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

type Lang = 'en' | 'tr' | 'ar';

const translations = {
  en: {
    addFAQ: 'Add a question/answer',
    question: 'Question',
    answer: 'Answer',
    submit: 'Submit',
    success: 'FAQ entry added successfully!',
    error: 'An error occurred while saving.',
  },
  tr: {
    addFAQ: 'Soru/Cevap ekle',
    question: 'Soru',
    answer: 'Cevap',
    submit: 'Gönder',
    success: 'SSS başarıyla eklendi!',
    error: 'Kaydederken bir hata oluştu.',
  },
  ar: {
    addFAQ: 'أضف سؤال/جواب',
    question: 'السؤال',
    answer: 'الجواب',
    submit: 'إرسال',
    success: 'تمت إضافة السؤال بنجاح!',
    error: 'حدث خطأ أثناء الحفظ.',
  },
};

const AddFAQForm = () => {
  const [lang, setLang] = useState<Lang>('en');

  const [translationsData, setTranslationsData] = useState({
    en: { question: '', answer: '' },
    tr: { question: '', answer: '' },
    ar: { question: '', answer: '' },
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleLangFieldChange = (field: 'question' | 'answer', value: string) => {
    setTranslationsData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/faq', {
        method: 'POST',
        body: JSON.stringify({ translations: translationsData }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error();

      setAlertSeverity('success');
      setAlertMessage(translations[lang].success);
      setAlertOpen(true);

      setTranslationsData({
        en: { question: '', answer: '' },
        tr: { question: '', answer: '' },
        ar: { question: '', answer: '' },
      });
    } catch {
      setAlertSeverity('error');
      setAlertMessage(translations[lang].error);
      setAlertOpen(true);
    }
  };

  const arabicStyle = lang === 'ar' ? {
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    direction: 'rtl' as const,
    textAlign: 'right' as const,
  } : {};

  return (
    <div className={styles.container} style={arabicStyle}>
      <h3 className={styles.title}>{translations[lang].addFAQ}</h3>

      <div style={{ display: 'flex', gap: '12px', marginBottom: 16 }}>
        {(['ar', 'en', 'tr'] as Lang[]).map((lng) => (
          <button
            key={lng}
            onClick={() => setLang(lng)}
            className={`${styles.langBtn} ${lang === lng ? styles.langBtnActive : ''}`}
            type="button"
          >
            <img src={`/img/flags/${lng}.jpg`} alt={lng} className={styles.flagIcon} />
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.form} style={arabicStyle}>
        <input
          type="text"
          placeholder={translations[lang].question}
          value={translationsData[lang].question}
          onChange={(e) => handleLangFieldChange('question', e.target.value)}
          className={styles.searchInputSmall}
          required
        />
        <textarea
          placeholder={translations[lang].answer}
          value={translationsData[lang].answer}
          onChange={(e) => handleLangFieldChange('answer', e.target.value)}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          rows={5}
          required
        />

        <button type="submit" className={styles.primary}>
          <SaveIcon fontSize="small" /> {translations[lang].submit}
        </button>
      </form>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddFAQForm;
