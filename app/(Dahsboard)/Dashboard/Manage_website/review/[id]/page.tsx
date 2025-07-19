'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const EditReviewForm = () => {
  const { id } = useParams();
  const reviewId = parseInt(id as string, 10);

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!reviewId) return;
    fetch(`/api/reviews/${reviewId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setPosition(data.position);
        setComment(data.comment);
        setRating(data.rating);
        setImagePreview(data.image);
      })
      .catch(() => {
        setAlertSeverity('error');
        setAlertMessage('Error loading review data');
        setAlertOpen(true);
      });
  }, [reviewId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.startsWith('image/')) {
      setAlertSeverity('error');
      setAlertMessage('Invalid image file.');
      setAlertOpen(true);
      return;
    }
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !position || !comment || !rating) {
      setAlertSeverity('error');
      setAlertMessage('Please fill in all fields');
      setAlertOpen(true);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('position', position);
      formData.append('comment', comment);
      formData.append('rating', rating.toString());
      if (image) formData.append('image', image);

      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error();

      setAlertSeverity('success');
      setAlertMessage('Review updated successfully!');
      setAlertOpen(true);
    } catch {
      setAlertSeverity('error');
      setAlertMessage('Failed to update the review.');
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Edit Review</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className={styles.searchInputSmall}
          required
        />

        <textarea
          placeholder="Your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required
        />

        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className={styles.searchInputSmall}
          required
        />

        <div
          className={styles.dropZone}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CloudUploadIcon className={styles.icon} />
          <p className={styles.text}>
            {imagePreview ? 'Image selected' : 'Click or drag an image of the reviewer'}
          </p>
          <p className={styles.subText}>Recommended size: 400 × 400 px</p>
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {imagePreview && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                <CloseIcon fontSize="small" />
              </button>
              <img src={imagePreview} alt="Preview" className={styles.image} />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" /> {loading ? 'Updating...' : 'Update Review'}
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

export default EditReviewForm;
