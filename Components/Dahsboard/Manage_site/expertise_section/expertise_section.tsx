'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

interface ExpertiseData {
  title: string;
  title_highlight: string;
  description: string;
  service_1_title: string;
  service_1_description: string;
  service_1_icon: File | null; 
  service_2_title: string;
  service_2_description: string;
  service_2_icon: File | null;  
  feature_1: string;
  feature_2: string;
  feature_3: string;
  feature_4: string;
  cta_text: string;
  founder_name: string;
  founder_role: string;
  founder_image: File | null;
  founder_signature: File | null;
  image_main: File | null;
}

const LANGUAGES = ['en', 'ar', 'tr'] as const;
type Language = typeof LANGUAGES[number];

const ExpertiseForm = () => {
  const [data, setData] = useState<ExpertiseData>({
    title: '',
    title_highlight: '',
    description: '',
    service_1_title: '',
    service_1_description: '',
    service_1_icon: null,
    service_2_title: '',
    service_2_description: '',
    service_2_icon: null,
    feature_1: '',
    feature_2: '',
    feature_3: '',
    feature_4: '',
    cta_text: '',
    founder_name: '',
    founder_role: '',
    founder_image: null,
    founder_signature: null,
    image_main: null,
  });

  const [lang, setLang] = useState<Language>('en');
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const service1IconRef = useRef<HTMLInputElement | null>(null);
  const service2IconRef = useRef<HTMLInputElement | null>(null);
  const founderImageRef = useRef<HTMLInputElement | null>(null);
  const founderSignatureRef = useRef<HTMLInputElement | null>(null);
  const mainImageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/expertise?lang=${lang}`);
        setData(prev => ({
          ...prev,
          ...res.data,
          service_1_icon: null,
          service_2_icon: null,
          founder_image: null,
          founder_signature: null,
          image_main: null,
        }));
      } catch {
        // handle error
      }
    }
    fetchData();
  }, [lang]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Pick<
      ExpertiseData,
      | 'service_1_icon'
      | 'service_2_icon'
      | 'founder_image'
      | 'founder_signature'
      | 'image_main'
    >
  ) => {
    const file = e.target.files?.[0] ?? null;
    setData(prev => ({ ...prev, [field]: file }));
  };

  const handleDropFile = (
    e: React.DragEvent<HTMLDivElement>,
    field: keyof Pick<
      ExpertiseData,
      | 'service_1_icon'
      | 'service_2_icon'
      | 'founder_image'
      | 'founder_signature'
      | 'image_main'
    >
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) {
      setData(prev => ({ ...prev, [field]: file }));
    }
  };

  const removeFile = (
    field: keyof Pick<
      ExpertiseData,
      | 'service_1_icon'
      | 'service_2_icon'
      | 'founder_image'
      | 'founder_signature'
      | 'image_main'
    >
  ) => {
    setData(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in data) {
        if (typeof data[key as keyof ExpertiseData] === 'string') {
          formData.append(key, data[key as keyof ExpertiseData] as string);
        }
      }
      if (data.service_1_icon) formData.append('service_1_icon', data.service_1_icon);
      if (data.service_2_icon) formData.append('service_2_icon', data.service_2_icon);
      if (data.founder_image) formData.append('founder_image', data.founder_image);
      if (data.founder_signature) formData.append('founder_signature', data.founder_signature);
      if (data.image_main) formData.append('image_main', data.image_main);

      formData.append('lang', lang);

      await axios.put('/api/expertise', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setAlertSeverity('success');
      setAlertMessage('Data updated successfully');
      setAlertOpen(true);
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Erreur lors de la mise à jour');
      setAlertOpen(true);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        {LANGUAGES.map((lng) => (
          <button
            key={lng}
            onClick={() => setLang(lng)}
            className={`${styles.langBtn} ${lang === lng ? styles.active : ''}`}
            type="button"
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      <h2 className={styles.title}>Edit Expertise Section ({lang.toUpperCase()})</h2>
      <form onSubmit={handleSubmit} className={styles.formi}>

       <div className={styles.block}>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          placeholder="Titre"
          className={styles.searchInputSmall}
          required
        />

        <input
          type="text"
          name="title_highlight"
          value={data.title_highlight}
          onChange={handleChange}
          placeholder="Titre Highlight"
          className={styles.searchInputSmall}
          required
        />
</div>

        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Description"
          className={styles.searchInputSmall}
          required
          rows={4}
        />
<div className={styles.block}>
        {/* Service 1 */}
        <input
          type="text"
          name="service_1_title"
          value={data.service_1_title}
          onChange={handleChange}
          placeholder="Service 1 Titre"
          className={styles.searchInputSmall}
          required
        />

</div>
<textarea
          name="service_1_description"
          value={data.service_1_description}
          onChange={handleChange}
          placeholder="Service 1 Description"
          className={styles.searchInputSmall}
          required
          rows={3}
        />
        {/* Upload Service 1 Icon */}
        <div
          className={styles.dropZone}
          onClick={() => service1IconRef.current?.click()}
          onDrop={(e) => handleDropFile(e, 'service_1_icon')}
          onDragOver={(e) => e.preventDefault()}
          aria-label="Upload Service 1 Icon"
          style={{ cursor: 'pointer' }}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>
            {data.service_1_icon ? data.service_1_icon.name : 'Click or drag Service 1 icon'}
          </p>
          <input
            ref={service1IconRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e, 'service_1_icon')}
          />
        </div>
        {data.service_1_icon && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => removeFile('service_1_icon')}
                aria-label="Supprimer l'icône Service 1"
              >
                <CloseIcon fontSize="small" />
              </button>
              <img
                src={URL.createObjectURL(data.service_1_icon)}
                alt="Service 1 Icon Preview"
                className={styles.image}
              />
            </div>
          </div>
        )}

        {/* Service 2 */}
        <input
          type="text"
          name="service_2_title"
          value={data.service_2_title}
          onChange={handleChange}
          placeholder="Service 2 Titre"
          className={styles.searchInputSmall}
          required
        />
        <textarea
          name="service_2_description"
          value={data.service_2_description}
          onChange={handleChange}
          placeholder="Service 2 Description"
          className={styles.searchInputSmall}
          required
          rows={3}
        />

        {/* Upload Service 2 Icon */}
        <div
          className={styles.dropZone}
          onClick={() => service2IconRef.current?.click()}
          onDrop={(e) => handleDropFile(e, 'service_2_icon')}
          onDragOver={(e) => e.preventDefault()}
          aria-label="Upload Service 2 Icon"
          style={{ cursor: 'pointer' }}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>
            {data.service_2_icon ? data.service_2_icon.name : 'Click or drag  Service 2 icon'}
          </p>
          <input
            ref={service2IconRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e, 'service_2_icon')}
          />
        </div>
        {data.service_2_icon && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => removeFile('service_2_icon')}
                aria-label="Supprimer l'icône Service 2"
              >
                <CloseIcon fontSize="small" />
              </button>
              <img
                src={URL.createObjectURL(data.service_2_icon)}
                alt="Service 2 Icon Preview"
                className={styles.image}
              />
            </div>
          </div>
        )}

        {/* Features */}
        <input
          type="text"
          name="feature_1"
          value={data.feature_1}
          onChange={handleChange}
          placeholder="Feature 1"
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          name="feature_2"
          value={data.feature_2}
          onChange={handleChange}
          placeholder="Feature 2"
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          name="feature_3"
          value={data.feature_3}
          onChange={handleChange}
          placeholder="Feature 3"
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          name="feature_4"
          value={data.feature_4}
          onChange={handleChange}
          placeholder="Feature 4"
          className={styles.searchInputSmall}
          required
        />

        {/* CTA */}
        <input
          type="text"
          name="cta_text"
          value={data.cta_text}
          onChange={handleChange}
          placeholder="Texte du CTA"
          className={styles.searchInputSmall}
          required
        />

        {/* Founder info */}
        <input
          type="text"
          name="founder_name"
          value={data.founder_name}
          onChange={handleChange}
          placeholder="Nom du fondateur"
          className={styles.searchInputSmall}
          required
        />
        <input
          type="text"
          name="founder_role"
          value={data.founder_role}
          onChange={handleChange}
          placeholder="Rôle du fondateur"
          className={styles.searchInputSmall}
          required
        />

        {/* Upload Founder Image */}
        <div
          className={styles.dropZone}
          onClick={() => founderImageRef.current?.click()}
          onDrop={(e) => handleDropFile(e, 'founder_image')}
          onDragOver={(e) => e.preventDefault()}
          aria-label="Upload Founder Image"
          style={{ cursor: 'pointer' }}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>
            {data.founder_image ? data.founder_image.name : 'Click or drag the founder photo'}
          </p>
          <input
            ref={founderImageRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e, 'founder_image')}
          />
        </div>
        {data.founder_image && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => removeFile('founder_image')}
                aria-label="Supprimer la photo du fondateur"
              >
                <CloseIcon fontSize="small" />
              </button>
              <img
                src={URL.createObjectURL(data.founder_image)}
                alt="Founder Image Preview"
                className={styles.image}
              />
            </div>
          </div>
        )}

        {/* Upload Founder Signature */}
        <div
          className={styles.dropZone}
          onClick={() => founderSignatureRef.current?.click()}
          onDrop={(e) => handleDropFile(e, 'founder_signature')}
          onDragOver={(e) => e.preventDefault()}
          aria-label="Upload Founder Signature"
          style={{ cursor: 'pointer' }}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>
            {data.founder_signature ? data.founder_signature.name : 'Click or drag the founder signature'}
          </p>
          <input
            ref={founderSignatureRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e, 'founder_signature')}
          />
        </div>
        {data.founder_signature && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => removeFile('founder_signature')}
                aria-label="Supprimer la signature du fondateur"
              >
                <CloseIcon fontSize="small" />
              </button>
              <img
                src={URL.createObjectURL(data.founder_signature)}
                alt="Founder Signature Preview"
                className={styles.image}
              />
            </div>
          </div>
        )}

        {/* Upload Main Image */}
        <div
          className={styles.dropZone}
          onClick={() => mainImageRef.current?.click()}
          onDrop={(e) => handleDropFile(e, 'image_main')}
          onDragOver={(e) => e.preventDefault()}
          aria-label="Upload Main Image"
          style={{ cursor: 'pointer' }}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>
            {data.image_main ? data.image_main.name : 'Click or drag the main image'}
          </p>
          <input
            ref={mainImageRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e, 'image_main')}
          />
        </div>
        {data.image_main && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => removeFile('image_main')}
                aria-label="Supprimer l'image principale"
              >
                <CloseIcon fontSize="small" />
              </button>
              <img
                src={URL.createObjectURL(data.image_main)}
                alt="Image principale Preview"
                className={styles.image}
              />
            </div>
          </div>
        )}
 <div className={styles.actions}>
        <button
          type="submit"
          className={styles.primary}
          disabled={loading}
          aria-busy={loading}
        >
          <SaveIcon />
          {loading ? 'Registration...' : 'Save'}
        </button>
        </div>
      </form>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ExpertiseForm;
