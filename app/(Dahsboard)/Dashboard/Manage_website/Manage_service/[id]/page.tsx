'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

interface ServiceFormData {
  icon: File | null;
  title: string;
  description: string;
  content: string;
  icon_path?: string; // for displaying existing icon
}

const EditServiceForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<ServiceFormData>({
    icon: null,
    title: '',
    description: '',
    content: '',
    icon_path: '',
  });

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info'>('info');
  const [alertMessage, setAlertMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/services/${id}`);
        const data = response.data;
        setFormData({
          icon: null,
          title: data.title,
          description: data.description,
          content: data.content,
          icon_path: data.icon_path,
        });
      } catch (err) {
        setAlertSeverity('error');
        setAlertMessage("Service not found or couldn't be fetched.");
        setAlertOpen(true);
      }
    };

    if (id) fetchService();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData(prev => ({ ...prev, icon: file }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) setFormData(prev => ({ ...prev, icon: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setAlertSeverity('error');
      setAlertMessage('Title is required.');
      setAlertOpen(true);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      if (formData.icon) data.append('icon', formData.icon);
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('content', formData.content);

      const response = await axios.put(`/api/services/${id}`, data);

      if (response.status === 200) {
        setAlertSeverity('success');
        setAlertMessage('Service updated successfully!');
        router.push('/Dashboard/Manage_website/Manage_service');
      } else {
        setAlertSeverity('error');
        setAlertMessage('Failed to update the service.');
      }
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage('An error occurred during update.');
    } finally {
      setAlertOpen(true);
      setLoading(false);
    }
  };

  const handleAlertClose = () => setAlertOpen(false);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Edit Service</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Service title"
          value={formData.title}
          onChange={handleInputChange}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required
        />

        <textarea
          name="description"
          placeholder="Short description"
          value={formData.description}
          onChange={handleInputChange}
          className={styles.searchInputSmall}
          rows={3}
        />

        <textarea
          name="content"
          placeholder="Detailed content of the service..."
          value={formData.content}
          onChange={handleInputChange}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          rows={6}
        />

        <div
          className={styles.dropZone}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>
            {formData.icon ? formData.icon.name : 'Click or drag an icon'}
          </p>
          <p className={styles.subText}>Recommended size: 80 × 80 px</p>
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleIconChange}
          />
        </div>

        {(formData.icon || formData.icon_path) && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => setFormData(prev => ({ ...prev, icon: null, icon_path: '' }))}
              >
                <CloseIcon fontSize="small" />
              </button>
              <img
                src={formData.icon ? URL.createObjectURL(formData.icon) : formData.icon_path ?? ''}
                alt="Icon preview"
                className={styles.image}
              />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" /> {loading ? 'Saving...' : 'Save Changes'}
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

export default EditServiceForm;
