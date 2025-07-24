'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

type Lang = 'ar' | 'en' | 'tr';

const placeholders = {
  ar: {
    name: 'الاسم الكامل',
    position: 'المنصب',
    comment: 'تعليقك...',
    rating: 'التقييم (1 إلى 5)',
    upload: 'انقر أو اسحب صورة المراجع',
    recommendedSize: 'الحجم الموصى به: 400 × 400 بكسل',
    submit: 'إرسال',
    submitting: 'جارٍ الإرسال...',
    removeImage: 'إزالة الصورة المحددة',
    success: 'تمت إضافة التقييم بنجاح!',
    errorImage: 'يرجى اختيار صورة للمراجع.',
    errorSubmit: 'فشل في إرسال التقييم.',
  },
  en: {
    name: 'Full Name',
    position: 'Position',
    comment: 'Your comment...',
    rating: 'Rating (1 to 5)',
    upload: 'Click or drag an image of the reviewer',
    recommendedSize: 'Recommended size: 400 × 400 px',
    submit: 'Submit Review',
    submitting: 'Submitting...',
    removeImage: 'Remove selected image',
    success: 'Review added successfully!',
    errorImage: 'Please select an image for the reviewer.',
    errorSubmit: 'Failed to submit the review.',
  },
  tr: {
    name: 'Tam Adı',
    position: 'Pozisyon',
    comment: 'Yorumunuz...',
    rating: 'Derecelendirme (1-5)',
    upload: 'İnceleyen kişinin resmini tıklayın veya sürükleyin',
    recommendedSize: 'Önerilen boyut: 400 × 400 px',
    submit: 'Gönder',
    submitting: 'Gönderiliyor...',
    removeImage: 'Seçili resmi kaldır',
    success: 'Yorum başarıyla eklendi!',
    errorImage: 'Lütfen inceleyen için bir resim seçin.',
    errorSubmit: 'Yorum gönderilemedi.',
  },
};

const AddReviewForm = () => {
  const [lang, setLang] = useState<Lang>('en');

  const [names, setNames] = useState<Record<Lang, string>>({ ar: '', en: '', tr: '' });
  const [positions, setPositions] = useState<Record<Lang, string>>({ ar: '', en: '', tr: '' });
  const [comments, setComments] = useState<Record<Lang, string>>({ ar: '', en: '', tr: '' });

  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Preview image (revokeObjectURL pour éviter fuite mémoire)
  const [previewUrl, setPreviewUrl] = useState<string>('');
  useEffect(() => {
    if (!image) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImage(file);
  };

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  // Validation simple avant submit (pour toutes les langues)
  const canSubmitAllLangs = () =>
    image !== null &&
    ['ar', 'en', 'tr'].every(
      (lng) =>
        names[lng as Lang].trim() !== '' &&
        positions[lng as Lang].trim() !== '' &&
        comments[lng as Lang].trim() !== ''
    ) &&
    rating >= 1 &&
    rating <= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setAlertSeverity('error');
      setAlertMessage(placeholders[lang].errorImage);
      setAlertOpen(true);
      return;
    }

    if (!canSubmitAllLangs()) {
      setAlertSeverity('error');
      setAlertMessage(placeholders[lang].errorSubmit);
      setAlertOpen(true);
      return;
    }

    setLoading(true);

    try {
      // Pour chaque langue, envoyer une requête POST séparée avec les données correspondantes
      await Promise.all(
        (['ar', 'en', 'tr'] as Lang[]).map(async (lng) => {
          const formData = new FormData();
          formData.append('name', names[lng]);
          formData.append('position', positions[lng]);
          formData.append('comment', comments[lng]);
          formData.append('rating', rating.toString());
          formData.append('lang', lng);
          // On envoie toujours la même image
          if (image) formData.append('image', image);

          await axios.post('/api/reviews', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        })
      );

      setAlertSeverity('success');
      setAlertMessage(placeholders[lang].success);
      setAlertOpen(true);

      // Reset tous les champs pour toutes les langues + image + rating
      setNames({ ar: '', en: '', tr: '' });
      setPositions({ ar: '', en: '', tr: '' });
      setComments({ ar: '', en: '', tr: '' });
      setRating(5);
      setImage(null);
    } catch (error) {
      console.error(error);
      setAlertSeverity('error');
      setAlertMessage(placeholders[lang].errorSubmit);
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.container}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ fontFamily: lang === 'ar' ? "'Noto Kufi Arabic', sans-serif" : undefined }}
    >
      <h3 className={styles.title}>
        {lang === 'ar' ? 'إضافة تقييم' : lang === 'tr' ? 'Yorum Ekle' : 'Add a Review'}
      </h3>

      {/* Boutons langue */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        {(['ar', 'en', 'tr'] as Lang[]).map((lng) => (
          <button
            key={lng}
            onClick={() => setLang(lng)}
            className={`${styles.langButton} ${lang === lng ? styles.active : ''}`}
            type="button"
            style={{ marginRight: lng !== 'tr' ? 8 : 0 }}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <input
          type="text"
          placeholder={placeholders[lang].name}
          value={names[lang]}
          onChange={(e) => setNames((prev) => ({ ...prev, [lang]: e.target.value }))}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required
          autoComplete="name"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <input
          type="text"
          placeholder={placeholders[lang].position}
          value={positions[lang]}
          onChange={(e) => setPositions((prev) => ({ ...prev, [lang]: e.target.value }))}
          className={styles.searchInputSmall}
          required
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <textarea
          className={`${styles.searchInputSmall} ${styles.span4}`}
          placeholder={placeholders[lang].comment}
          value={comments[lang]}
          onChange={(e) => setComments((prev) => ({ ...prev, [lang]: e.target.value }))}
          rows={4}
          required
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />

        <input
          type="number"
          min={1}
          max={5}
          placeholder={placeholders[lang].rating}
          value={rating}
          onChange={(e) => setRating(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))}
          className={styles.searchInputSmall}
          required
        />

        <div
          className={styles.dropZone}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{ cursor: 'pointer' }}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>{image ? image.name : placeholders[lang].upload}</p>
          <p className={styles.subText}>{placeholders[lang].recommendedSize}</p>
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {previewUrl && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => setImage(null)}
                aria-label={placeholders[lang].removeImage}
              >
                <CloseIcon fontSize="small" />
              </button>
              <img src={previewUrl} alt="Preview" className={styles.image} />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading || !canSubmitAllLangs()}>
            <SaveIcon fontSize="small" />{' '}
            {loading ? placeholders[lang].submitting : placeholders[lang].submit}
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

export default AddReviewForm;
