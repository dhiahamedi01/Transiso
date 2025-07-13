'use client';

import React, { useState, useRef } from 'react';
import styles from '@/Components/Dahsboard/Blog/AddBlogForm/BasicInfoCard.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const EditBannerForm = () => {
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (index === 1) setImage1(file);
    else setImage2(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (index === 1) setImage1(file);
    else setImage2(file);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Modifier la bannière</h3>

      <form className={styles.form} style={{display:'flex',flexDirection:'column',gap:'10px'}}>
        {/* Ligne 1 : deux input */}
        <div className={styles.row}  style={{display:'flex',gap:'20px'}}>
          <input
            type="text"
            placeholder="Titre 1"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
            className={styles.searchInputSmall}
          />
          <input
            type="text"
            placeholder="Titre 2"
            value={title2}
            onChange={(e) => setTitle2(e.target.value)}
            className={styles.searchInputSmall}
          />
        </div>

        {/* Ligne 2 : deux textarea */}
        <div className={styles.row} style={{display:'flex',gap:'20px'}}>
          <textarea
            placeholder="Texte ligne 1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className={styles.searchInputSmall}
            rows={4}
          />
          <textarea
            placeholder="Texte ligne 2"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className={styles.searchInputSmall}
            rows={4}
          />
        </div>

       {/* Ligne 3 : deux uploaders côte à côte */}
<div className={styles.row} style={{ display: 'flex', gap: '20px' }}>
  {[1, 2].map((index) => {
    const image = index === 1 ? image1 : image2;
    const inputRef = index === 1 ? inputRef1 : inputRef2;

    return (
      <div
        key={index}
        className={styles.dropZone}
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={(e) => e.preventDefault()}
      >
        <CloudUploadIcon className={styles.icon} />
        <p className={styles.text}>
          {image ? image.name : `Uploader image ${index}`}
        </p>
        <p className={styles.subText}>Taille recommandée : 1200×400 px</p>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleImageChange(e, index)}
        />

        {image && (
          <div className={styles.previewContainer}>
            <div className={styles.imageWrapper}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => index === 1 ? setImage1(null) : setImage2(null)}
                aria-label="Supprimer l'image"
              >
                <CloseIcon fontSize="small" />
              </button>
              <img src={URL.createObjectURL(image)} alt="Aperçu" className={styles.image} />
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>

      </form>
    </div>
  );
};

export default EditBannerForm;
