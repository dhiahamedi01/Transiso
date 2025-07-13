'use client';

import React, { useState, useRef, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';

interface EditSliderFormProps {
  id: string;
  initialTitle?: string;
  initialDescription?: string;
  initialIconUrl?: string;
  initialImageUrl?: string;
}

const EditSliderForm: React.FC<EditSliderFormProps> = ({
  id,
  initialTitle = '',
  initialDescription = '',
  initialIconUrl = '',
  initialImageUrl = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>(initialIconUrl || '');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialImageUrl || '');

  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [showAlert, setShowAlert] = useState(false);

  const iconInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (iconFile) {
      const url = URL.createObjectURL(iconFile);
      setIconPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [iconFile]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const showAlertMsg = (message: string, type: 'success' | 'error') => {
    setAlertMsg(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('title', title);
    form.append('description', description);

    if (iconFile) form.append('icon', iconFile);
    else form.append('iconUrl', initialIconUrl || '');

    if (imageFile) form.append('image', imageFile);
    else form.append('imageUrl', initialImageUrl || '');

    try {
      const res = await fetch(`/api/home-slider/${id}`, {
        method: 'PUT',
        body: form,
      });

      const result = await res.json();
      if (!res.ok) {
        showAlertMsg('Error: ' + result.error, 'error');
      } else {
        showAlertMsg('Slider updated successfully.', 'success');
      }
    } catch (error) {
      showAlertMsg('An unexpected error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Edit Slider</h3>

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
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          rows={4}
          required
        />

        {/* Icon uploader */}
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
            <p className={styles.text}>
              {iconFile ? iconFile.name : iconPreview ? 'Current Icon' : 'Click or drag an icon here'}
            </p>
            <p className={styles.subText}>Recommended size: 40×40 px</p>
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

          {/* Icon preview */}
          {(iconPreview || iconFile) && (
            <div className={styles.previewContainer} style={{ marginTop: '0.5rem' }}>
              <div className={styles.imageWrapper} style={{ width: 60, height: 60 }}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => {
                    setIconFile(null);
                    setIconPreview('');
                  }}
                >
                  <CloseIcon fontSize="small" />
                </button>
                <img src={iconPreview} alt="Icon preview" className={styles.image} />
              </div>
            </div>
          )}
        </div>

        {/* Image uploader */}
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
            <p className={styles.text}>
              {imageFile ? imageFile.name : imagePreview ? 'Current Image' : 'Click or drag an image here'}
            </p>
            <p className={styles.subText}>Recommended size: 800×400 px</p>
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

          {/* Image preview */}
          {(imagePreview || imageFile) && (
            <div className={styles.previewContainer} style={{ marginTop: '0.5rem' }}>
              <div className={styles.imageWrapper} style={{ width: 180, height: 90 }}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview('');
                  }}
                >
                  <CloseIcon fontSize="small" />
                </button>
                <img src={imagePreview} alt="Image preview" className={styles.image} />
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className={styles.actions} style={{ gridColumn: 'span 4' }}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSliderForm;
