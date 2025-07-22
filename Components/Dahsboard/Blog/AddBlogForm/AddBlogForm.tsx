'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import useCreateBlog from '@/hooks/useCreateBlog';

const translations = {
  en: {
    addPost: 'Add a blog post',
    title: 'Title',
    author: 'Author',
    status: {
      published: 'Published',
      draft: 'Draft',
    },
    category: 'Category',
    date: 'Date',
    content: 'Blog content...',
    imagePrompt: 'Click or drag a cover image',
    imageSubText: 'Recommended size: 800 × 800 px',
    publish: 'Publish Blog Post',
    publishing: 'Publishing...',
    selectImageError: 'Please select a cover image.',
    success: 'Blog post published successfully!',
    error: 'An error occurred while publishing the blog post.',
  },
  tr: {
    addPost: 'Bir blog yazısı ekle',
    title: 'Başlık',
    author: 'Yazar',
    status: {
      published: 'Yayınlandı',
      draft: 'Taslak',
    },
    category: 'Kategori',
    date: 'Tarih',
    content: 'Blog içeriği...',
    imagePrompt: 'Kapak resmini tıklayın veya sürükleyin',
    imageSubText: 'Önerilen boyut: 800 × 800 px',
    publish: 'Blog Yazısını Yayınla',
    publishing: 'Yayınlanıyor...',
    selectImageError: 'Lütfen bir kapak resmi seçin.',
    success: 'Blog yazısı başarıyla yayınlandı!',
    error: 'Blog yazısı yayınlanırken hata oluştu.',
  },
  ar: {
    addPost: 'أضف منشور مدونة',
    title: 'العنوان',
    author: 'المؤلف',
    status: {
      published: 'منشور',
      draft: 'مسودة',
    },
    category: 'الفئة',
    date: 'التاريخ',
    content: 'محتوى المدونة...',
    imagePrompt: 'انقر أو اسحب صورة الغلاف',
    imageSubText: 'الحجم الموصى به: 800 × 800 بكسل',
    publish: 'نشر منشور المدونة',
    publishing: 'جارٍ النشر...',
    selectImageError: 'يرجى اختيار صورة الغلاف.',
    success: 'تم نشر منشور المدونة بنجاح!',
    error: 'حدث خطأ أثناء نشر منشور المدونة.',
  },
};

type Lang = 'en' | 'tr' | 'ar';

const AddBlogForm = () => {
  const [lang, setLang] = useState<Lang>('en');

  // Global (shared) fields
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Draft');
  const [image, setImage] = useState<File | null>(null);

  // Champs par langue (title, author, category, content)
  const [translationsData, setTranslationsData] = useState({
    en: { title: '', author: '', category: '', content: '' },
    tr: { title: '', author: '', category: '', content: '' },
    ar: { title: '', author: '', category: '', content: '' },
  });

  const { handleCreateBlog, loading } = useCreateBlog();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info'>('info');
  const [alertMessage, setAlertMessage] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handler pour champs par langue
  const handleLangFieldChange = (field: keyof typeof translationsData.en, value: string) => {
    setTranslationsData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  // Image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setAlertSeverity('error');
      setAlertMessage(translations.en.selectImageError); // Toujours en anglais par défaut
      setAlertOpen(true);
      return;
    }
    if (!date) {
      setAlertSeverity('error');
      setAlertMessage('Please select a date.');
      setAlertOpen(true);
      return;
    }

    // Préparer les données, si un champ d'une langue est vide => chaîne vide
    const payload = {
      date,
      status,
      image,
      translations: {
        en: {
          title: translationsData.en.title.trim(),
          author: translationsData.en.author.trim(),
          category: translationsData.en.category.trim(),
          content: translationsData.en.content.trim(),
        },
        tr: {
          title: translationsData.tr.title.trim(),
          author: translationsData.tr.author.trim(),
          category: translationsData.tr.category.trim(),
          content: translationsData.tr.content.trim(),
        },
        ar: {
          title: translationsData.ar.title.trim(),
          author: translationsData.ar.author.trim(),
          category: translationsData.ar.category.trim(),
          content: translationsData.ar.content.trim(),
        },
      },
    };

    try {
      await handleCreateBlog(payload);
      setAlertSeverity('success');
      setAlertMessage(translations[lang].success);
      setAlertOpen(true);

      // Reset tout
      setDate('');
      setStatus('Draft');
      setImage(null);
      setTranslationsData({
        en: { title: '', author: '', category: '', content: '' },
        tr: { title: '', author: '', category: '', content: '' },
        ar: { title: '', author: '', category: '', content: '' },
      });
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage(translations[lang].error);
      setAlertOpen(true);
    }
  };

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  // Style RTL + font arabe si arabe sélectionné
  const arabicStyle = lang === 'ar' ? {
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    direction: 'rtl' as const,
    textAlign: 'right' as const,
  } : {};

  return (
    <div className={styles.container} style={arabicStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 className={styles.title}>{translations[lang].addPost}</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setLang('ar')}
            className={`${styles.langBtn} ${lang === 'ar' ? styles.langBtnActive : ''}`}
            aria-label="Arabic"
            type="button"
          >
            <img src="/img/flags/AR.jpg" alt="Arabic flag" className={styles.flagIcon} />
            Arabic
          </button>
          <button
            onClick={() => setLang('en')}
            className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`}
            aria-label="English"
            type="button"
          >
            <img src="/img/flags/eng.jpg" alt="English flag" className={styles.flagIcon} />
            Anglais
          </button>
          <button
            onClick={() => setLang('tr')}
            className={`${styles.langBtn} ${lang === 'tr' ? styles.langBtnActive : ''}`}
            aria-label="Turkish"
            type="button"
          >
            <img src="/img/flags/tr.jpg" alt="Turkish flag" className={styles.flagIcon} />
            Turc
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} style={arabicStyle}>
      <input
          type="text"
          placeholder={translations[lang].title}
          value={translationsData[lang].title}
          onChange={(e) => handleLangFieldChange('title', e.target.value)}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required={lang === 'en'} // optionnel: forcer anglais requis par ex
          aria-label={`${translations[lang].title} (${lang.toUpperCase()})`}
        />
        {/* Champs globaux */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.searchInputSmall}
          required
          aria-label={translations[lang].date}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Published' | 'Draft')}
          className={styles.searchInputSmall}
          aria-label="Status"
        >
          <option value="Published">{translations[lang].status.published}</option>
          <option value="Draft">{translations[lang].status.draft}</option>
        </select>

        {/* Champs langue courante */}
  
        <input
          type="text"
          placeholder={translations[lang].author}
          value={translationsData[lang].author}
          onChange={(e) => handleLangFieldChange('author', e.target.value)}
          className={styles.searchInputSmall}
          aria-label={`${translations[lang].author} (${lang.toUpperCase()})`}
        />
        <input
          type="text"
          placeholder={translations[lang].category}
          value={translationsData[lang].category}
          onChange={(e) => handleLangFieldChange('category', e.target.value)}
          className={styles.searchInputSmall}
          aria-label={`${translations[lang].category} (${lang.toUpperCase()})`}
        />
        <textarea
          className={`${styles.searchInputSmall} ${styles.span4}`}
          placeholder={translations[lang].content}
          value={translationsData[lang].content}
          onChange={(e) => handleLangFieldChange('content', e.target.value)}
          rows={6}
          aria-label={`${translations[lang].content} (${lang.toUpperCase()})`}
        />

        {/* Zone image */}
        <div
          className={styles.dropZone}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>{image ? image.name : translations[lang].imagePrompt}</p>
          <p className={styles.subText}>{translations[lang].imageSubText}</p>
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
            aria-label="Upload cover image"
          />
        </div>

        {image && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => setImage(null)}
                aria-label="Delete selected image"
              >
                <CloseIcon fontSize="small" />
              </button>
              <img src={URL.createObjectURL(image)} alt="Preview" className={styles.image} />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" /> {loading ? translations[lang].publishing : translations[lang].publish}
          </button>
        </div>
      </form>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddBlogForm;
