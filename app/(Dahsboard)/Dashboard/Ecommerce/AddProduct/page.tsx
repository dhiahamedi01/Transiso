'use client';

import React, { useState, useEffect } from 'react';
import BasicInfoCard from '@/Components/Dahsboard/Ecommerce/Form/BasicInfoCard';
import Form_Product from '@/Components/Dahsboard/Ecommerce/Form/Form_Product';
import { useCreateProduct } from '@/hooks/useCreateProduct';

import style from '../../../DashboardLayout.module.css';

import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function AddProduct() {
  const [productData, setProductData] = useState({
    productName: '',
    category: '',
    oldPrice: '',
    price: '',
    stock: '',
    description: '',
  });

  const [images, setImages] = useState<File[]>([]);

  const { save, loading, error } = useCreateProduct();

  // Snackbar state
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async () => {
    try {
      const id = await save(productData, images);
      setSuccessMessage(`Produit créé avec l'id ${id}`);
      setSuccessOpen(true);
      // Reset form
      setProductData({
        productName: '',
        category: '',
        oldPrice: '',
        price: '',
        stock: '',
        description: '',
      });
      setImages([]);
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
      <BasicInfoCard form={productData} setForm={setProductData} />
      <Form_Product images={images} setImages={setImages} />

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
          sx={{backgroundColor:'#4f46e5'}}
        >
          Save Changes
        </LoadingButton>
      </div>

      {/* Snackbars pour succès et erreur */}
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
