'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';

import { fetchBlogById, updateBlog } from '@/services/blogService';

const UpdateBlogForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  // Vérification stricte que params.id existe
  if (!params.id) {
    return <p>Blog ID is missing</p>;
  }

  // S'il y a plusieurs id (tableau), on prend le premier sinon l'id direct
  const blogId: string = Array.isArray(params.id) ? params.id[0] : params.id;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Draft');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [existingImagePath, setExistingImagePath] = useState('');

  const [loading, setLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info'>('info');
  const [alertMessage, setAlertMessage] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function loadBlog() {
      try {
        const blog = await fetchBlogById(blogId);
        setTitle(blog.title);
        setAuthor(blog.author);
        setDate(blog.date);
        setStatus(blog.status);
        setCategory(blog.category);
        setContent(blog.content);
        setExistingImagePath(blog.image_path || '');
      } catch {
        setAlertSeverity('error');
        setAlertMessage('Erreur lors du chargement de l’article.');
        setAlertOpen(true);
      }
    }
    loadBlog();
  }, [blogId]);

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

    setLoading(true);
    try {
      await updateBlog(blogId, {
        title,
        author,
        date,
        status,
        category,
        content,
        image,
      });
      setAlertSeverity('success');
      setAlertMessage('Article mis à jour avec succès !');
      setAlertOpen(true);

      router.push('/Dashboard/blog');
    } catch {
      setAlertSeverity('error');
      setAlertMessage("Erreur lors de la mise à jour de l'article.");
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
      <h3 className={styles.title}>Update Blog Post</h3>

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
            {image
              ? image.name
              : existingImagePath
              ? `Current image loaded`
              : 'Click or drag a cover image'}
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

        {!image && existingImagePath && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <img src={existingImagePath} alt="Current" className={styles.image} />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={loading}>
            <SaveIcon fontSize="small" /> {loading ? 'Updating...' : 'Update Blog Post'}
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

export default UpdateBlogForm;
