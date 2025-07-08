'use client';

import React, { useRef, useEffect } from 'react';
import styles from './Form_Product.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  images: File[];                                            // nouveaux fichiers
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  existingImageUrls?: string[];                              // images déjà en DB (relative path)
}

const Form_Product: React.FC<Props> = ({
  images,
  setImages,
  existingImageUrls = [],                                     // par défaut []
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* ---------- helpers ---------- */
  const openPicker = () => inputRef.current?.click();

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files);
    setImages(prev => [...prev, ...list].slice(0, 5));       // max 5
  };

  /* ---------- events ---------- */
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    addFiles(e.target.files);

  const removeNewFile = (idx: number) =>
    setImages(prev => prev.filter((_, i) => i !== idx));

  /* ---------- cleanup des URL temporaires ---------- */
  useEffect(
    () => () => images.forEach(f => URL.revokeObjectURL(f as any)),
    [images]
  );

  /* ---------- UI ---------- */
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Product Images</h3>

      {/* zone drag & drop / click */}
      <div
        className={styles.dropZone}
        onClick={openPicker}
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
      >
        <CloudUploadIcon className={styles.icon} />
        <p className={styles.text}>Drop files here or click to upload.</p>
        <p className={styles.subText}>Recommended size: 800 × 800 px – max 5 images</p>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={onFileChange}
        />
      </div>

      {/* preview des images existantes */}
      {existingImageUrls.length > 0 && (
        <>
          <h4 className={styles.subtitle}>Existing images</h4>
          <div className={styles.previewContainer}>
            {existingImageUrls.map((url, i) => (
              <div key={i} className={styles.imageWrapper}>
                <img
                  src={`/${url}`}                             
                  alt={`existing-${i}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* preview des fichiers ajoutés */}
      {images.length > 0 && (
        <>
          <h4 className={styles.subtitle}>New images</h4>
          <div className={styles.previewContainer}>
            {images.map((file, idx) => (
              <div key={idx} className={styles.imageWrapper}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => removeNewFile(idx)}
                  aria-label="Delete image"
                >
                  <CloseIcon fontSize="small" />
                </button>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`new-${idx}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Form_Product;
