'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useCreateReview from '@/hooks/useCreateReview';

const AddReviewForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);

  const { handleCreateReview, loading } = useCreateReview();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

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
      setAlertMessage('Please select an image for the reviewer.');
      setAlertOpen(true);
      return;
    }

    try {
      await handleCreateReview({
        name,
        position,
        comment,
        rating,
        image,
      });

      setAlertSeverity('success');
      setAlertMessage('Review added successfully!');
      setAlertOpen(true);

      // Reset form
      setName('');
      setPosition('');
      setComment('');
      setRating(5);
      setImage(null);
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage('Failed to submit the review.');
      setAlertOpen(true);
    }
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image as any);
    };
  }, [image]);

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Add a Review</h3>

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
          className={`${styles.searchInputSmall} ${styles.span4}`}
          placeholder="Your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          required
        />

        <input
          type="number"
          min={1}
          max={5}
          placeholder="Rating (1 to 5)"
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
            {image ? image.name : 'Click or drag an image of the reviewer'}
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

        {image && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => setImage(null)}
                aria-label="Remove selected image"
              >
                <CloseIcon fontSize="small" />
              </button>
              <img src={URL.createObjectURL(image)} alt="Preview" className={styles.image} />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" /> {loading ? 'Submitting...' : 'Submit Review'}
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
