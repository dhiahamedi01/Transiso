'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import useCreateBlog from '@/hooks/useCreateBlog';

const AddBlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Draft');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { handleCreateBlog, loading } = useCreateBlog();

  // Pour gérer l'affichage des alertes MUI
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info'>('info');
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
      setAlertMessage('Please select a cover image.');
      setAlertOpen(true);
      return;
    }

    try {
      await handleCreateBlog({
        title,
        author,
        date,
        status,
        category,
        content,
        image,
      });
      setAlertSeverity('success');
      setAlertMessage('Blog post published successfully!');
      setAlertOpen(true);

      setTitle('');
      setAuthor('');
      setDate('');
      setStatus('Draft');
      setCategory('');
      setContent('');
      setImage(null);
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage('An error occurred while publishing the blog post.');
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
      <h3 className={styles.title}>Add a blog post</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.searchInputSmall} ${styles.span4}`}
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={styles.searchInputSmall}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Published' | 'Draft')}
          className={styles.searchInputSmall}
        >
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.searchInputSmall}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.searchInputSmall}
          required
        />

        <textarea
          className={`${styles.searchInputSmall} ${styles.span4}`}
          placeholder="Blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
            {image ? image.name : 'Click or drag a cover image'}
          </p>
          <p className={styles.subText}>Recommended size: 800 × 800 px</p>
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
            <SaveIcon fontSize="small" /> {loading ? 'Publishing...' : 'Publish Blog Post'}
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
