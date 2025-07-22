'use client';

import React, { useState, useRef, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';

const translations = {
  en: {
    addSlider: 'Add Slider',
    titlePlaceholder: 'Title',
    descriptionPlaceholder: 'Description',
    uploadIcon: 'Click or drop an icon here',
    uploadImage: 'Click or drop an image here',
    iconSize: 'Recommended size: 40×40 px',
    imageSize: 'Recommended size: 800×400 px',
    add: 'Add',
    saving: 'Saving...',
    iconPreview: 'Icon preview',
    imagePreview: 'Image preview',
    success: 'Slider added successfully.',
    error: 'An unexpected error occurred.',
  },
  ar: {
    addSlider: 'إضافة سلايدر',
    titlePlaceholder: 'العنوان',
    descriptionPlaceholder: 'الوصف',
    uploadIcon: 'انقر أو اسحب أيقونة هنا',
    uploadImage: 'انقر أو اسحب صورة هنا',
    iconSize: 'الحجم الموصى به: 40×40 بكسل',
    imageSize: 'الحجم الموصى به: 800×400 بكسل',
    add: 'إضافة',
    saving: 'جارٍ الحفظ...',
    iconPreview: 'معاينة الأيقونة',
    imagePreview: 'معاينة الصورة',
    success: 'تمت إضافة السلايدر بنجاح.',
    error: 'حدث خطأ غير متوقع.',
  },
  tr: {
    addSlider: 'Slider Ekle',
    titlePlaceholder: 'Başlık',
    descriptionPlaceholder: 'Açıklama',
    uploadIcon: 'Buraya tıklayın veya simge bırakın',
    uploadImage: 'Buraya tıklayın veya görsel bırakın',
    iconSize: 'Önerilen boyut: 40×40 px',
    imageSize: 'Önerilen boyut: 800×400 px',
    add: 'Ekle',
    saving: 'Kaydediliyor...',
    iconPreview: 'Simge önizlemesi',
    imagePreview: 'Görsel önizlemesi',
    success: 'Slider başarıyla eklendi.',
    error: 'Beklenmeyen bir hata oluştu.',
  },
};

type Lang = 'en' | 'ar' | 'tr';

const AddSliderForm: React.FC = () => {
  const [language, setLanguage] = useState<Lang>('en');
  const t = translations[language];

  const [titles, setTitles] = useState<Record<Lang, string>>({
    en: '',
    ar: '',
    tr: '',
  });
  const [descriptions, setDescriptions] = useState<Record<Lang, string>>({
    en: '',
    ar: '',
    tr: '',
  });

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [showAlert, setShowAlert] = useState(false);

  const iconInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem('sliderLang') as Lang | null;
    if (storedLang && translations[storedLang]) {
      setLanguage(storedLang);
    }
  }, []);

  const handleLanguageChange = (lng: Lang) => {
    setLanguage(lng);
    localStorage.setItem('sliderLang', lng);
  };

  useEffect(() => {
    if (iconFile) {
      const url = URL.createObjectURL(iconFile);
      setIconPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setIconPreview('');
    }
  }, [iconFile]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview('');
    }
  }, [imageFile]);

  const showAlertMsg = (message: string, type: 'success' | 'error') => {
    setAlertMsg(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const canSubmit =
    !loading &&
    iconFile !== null &&
    imageFile !== null &&
    ['en', 'ar', 'tr'].every(
      (lng) => titles[lng as Lang].trim() !== '' && descriptions[lng as Lang].trim() !== ''
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);

    try {
      const form = new FormData();

      (['en', 'ar', 'tr'] as Lang[]).forEach((lng) => {
        form.append(`title_${lng}`, titles[lng]);
        form.append(`description_${lng}`, descriptions[lng]);
      });

      if (iconFile) form.append('icon', iconFile);
      if (imageFile) form.append('image', imageFile);

      const res = await fetch('/api/home-slider', {
        method: 'POST',
        body: form,
      });

      const result = await res.json();

      if (!res.ok) {
        showAlertMsg('Erreur : ' + (result.error || t.error), 'error');
      } else {
        showAlertMsg(t.success, 'success');

        setTitles({ en: '', ar: '', tr: '' });
        setDescriptions({ en: '', ar: '', tr: '' });
        setIconFile(null);
        setImageFile(null);
      }
    } catch (error) {
      showAlertMsg(t.error, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        fontFamily: language === 'ar' ? "'Noto Kufi Arabic', sans-serif" : undefined,
        direction: language === 'ar' ? 'rtl' : 'ltr',
        textAlign: language === 'ar' ? 'right' : 'left',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['en', 'ar', 'tr'] as const).map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => handleLanguageChange(lng)}
            style={{
              background: language === lng ? '#0070f3' : '#f0f0f0',
              color: language === lng ? '#fff' : '#000',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      <h3 className={styles.title}>{t.addSlider}</h3>

      <Collapse in={showAlert}>
        <Alert
          severity={alertType}
          action={
            <IconButton size="small" onClick={() => setShowAlert(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertMsg}
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder={t.titlePlaceholder}
          value={titles[language]}
          onChange={(e) => setTitles({ ...titles, [language]: e.target.value })}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required
        />

        <textarea
          placeholder={t.descriptionPlaceholder}
          value={descriptions[language]}
          onChange={(e) => setDescriptions({ ...descriptions, [language]: e.target.value })}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          rows={4}
          required
        />

        <div style={{ gridColumn: 'span 2' }}>
          <div
            className={styles.dropZone}
            onClick={() => iconInputRef.current?.click()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) setIconFile(file);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <CloudUploadIcon className={styles.icon} />
            <p className={styles.text}>{iconFile ? iconFile.name : t.uploadIcon}</p>
            <p className={styles.subText}>{t.iconSize}</p>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={iconInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setIconFile(file);
              }}
            />
          </div>

          {iconPreview && (
            <div className={styles.previewContainer} style={{ marginTop: '0.5rem' }}>
              <div className={styles.imageWrapper} style={{ width: 60, height: 60 }}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => setIconFile(null)}
                >
                  <CloseIcon fontSize="small" />
                </button>
                <img src={iconPreview} alt={t.iconPreview} className={styles.image} />
              </div>
            </div>
          )}
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <div
            className={styles.dropZone}
            onClick={() => imageInputRef.current?.click()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) setImageFile(file);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <CloudUploadIcon className={styles.icon} />
            <p className={styles.text}>{imageFile ? imageFile.name : t.uploadImage}</p>
            <p className={styles.subText}>{t.imageSize}</p>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imageInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImageFile(file);
              }}
            />
          </div>

          {imagePreview && (
            <div className={styles.previewContainer} style={{ marginTop: '0.5rem' }}>
              <div className={styles.imageWrapper} style={{ width: 180, height: 90 }}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => setImageFile(null)}
                >
                  <CloseIcon fontSize="small" />
                </button>
                <img src={imagePreview} alt={t.imagePreview} className={styles.image} />
              </div>
            </div>
          )}
        </div>

        <div className={styles.actions} style={{ gridColumn: 'span 4' }}>
          <button type="submit" className={styles.primary} disabled={!canSubmit}>
            <SaveIcon fontSize="small" />
            {loading ? t.saving : t.add}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSliderForm;
