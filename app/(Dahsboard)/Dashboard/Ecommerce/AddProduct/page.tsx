'use client';

import React, { useState, useEffect } from 'react';
import BasicInfoCard from '@/Components/Dahsboard/Ecommerce/Form/BasicInfoCard';
import Form_Product from '@/Components/Dahsboard/Ecommerce/Form/Form_Product';
import { useCreateProduct } from '@/hooks/useCreateProduct';

import style from '../../../DashboardLayout.module.css';

import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Lang = 'en' | 'ar' | 'tr';

interface ProductData {
  productName: string;
  category: string;
  oldPrice: string;
  price: string;
  stock: string;
  description: string;
}

function AddProduct() {
  const [lang, setLang] = useState<Lang>('en');

  const [productsData, setProductsData] = useState<Record<Lang, ProductData>>({
    en: { productName: '', category: '', oldPrice: '', price: '', stock: '', description: '' },
    ar: { productName: '', category: '', oldPrice: '', price: '', stock: '', description: '' },
    tr: { productName: '', category: '', oldPrice: '', price: '', stock: '', description: '' },
  });

  const [images, setImages] = useState<File[]>([]);

  const { save, loading, error } = useCreateProduct();

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
  };

  // Fonction pour mettre à jour le produit de la langue active
  const setProductDataForLang = (data: ProductData) => {
    setProductsData((prev) => ({
      ...prev,
      [lang]: data,
    }));
  };

  const handleSave = async () => {
    try {
      // Sauvegarde dans chaque langue
      for (const language of ['en', 'ar', 'tr'] as Lang[]) {
        await save({ ...productsData[language], lang: language }, images);
      }

      setSuccessMessage(`Produit créé dans les 3 langues`);
      setSuccessOpen(true);

      // Reset form
      setProductsData({
        en: { productName: '', category: '', oldPrice: '', price: '', stock: '', description: '' },
        ar: { productName: '', category: '', oldPrice: '', price: '', stock: '', description: '' },
        tr: { productName: '', category: '', oldPrice: '', price: '', stock: '', description: '' },
      });
      setImages([]);
      setLang('en');
    } catch {
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  const handleSuccessClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSuccessOpen(false);
  };

  const handleErrorClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setErrorOpen(false);
  };

  return (
    <div>
      {/* Boutons langue */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
        {(['ar', 'tr', 'en'] as Lang[]).map((l) => (
          <button
            key={l}
            style={{
              padding: '6px 12px',
              backgroundColor: lang === l ? '#4f46e5' : '#e0e0e0',
              color: lang === l ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: lang === l ? 'bold' : 'normal',
            }}
            onClick={() => handleLangChange(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Formulaire */}
      <BasicInfoCard form={productsData[lang]} setForm={setProductDataForLang} />
      <Form_Product images={images} setImages={setImages} />

      {/* Actions */}
      <div className={style.actions}>
        <button type="button" className={style.secondary}>
          Cancel
        </button>
        <LoadingButton
          onClick={handleSave}
          loading={loading}
          loadingIndicator="Saving..."
          variant="contained"
          className={style.primary}
          disabled={loading}
          sx={{ backgroundColor: '#4f46e5' }}
        >
          Save Changes
        </LoadingButton>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          {error || 'Erreur lors de la création du produit'}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddProduct;
