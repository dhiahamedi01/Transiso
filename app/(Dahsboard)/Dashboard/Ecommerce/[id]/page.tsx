'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BasicInfoCard from '@/Components/Dahsboard/Ecommerce/Form/BasicInfoCard';
import Form_Product from '@/Components/Dahsboard/Ecommerce/Form/Form_Product';
import { useProduct } from '@/hooks/useProduct';
import { useUpdateProduct } from '@/hooks/useUpdateProduct';
import { ImageKey } from '@/types';
import style from '../../../DashboardLayout.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const { product, loading: loadingProd, error: errorProd } = useProduct(Number(id));
  const { update, loading, error } = useUpdateProduct();
  const router = useRouter();

  const [productData, setProductData] = useState({
    productName: '',
    category: '',
    oldPrice: '',
    price: '',
    stock: '',
    description: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  /* ─ Pré‑remplissage ─ */
  useEffect(() => {
    if (!product) return;

    setProductData({
      productName: product.name,
      category: product.category,
      oldPrice: product.old_price ?? '',
      price: product.price,
      stock: product.stock,
      description: product.description ?? '',
    });

    const list: string[] = [];
    for (let i = 1; i <= 5; i++) {
      const key = `image${i}` as ImageKey;
      const url = product[key];
      if (url) list.push(url);
    }
    setImagesPreview(list);
  }, [product]);

  /* ─ Enregistrement ─ */
  const handleSave = async () => {
    try {
      await update(Number(id), productData, images);
      setSuccessOpen(true);
      router.push('/Dashboard/Ecommerce/Product');
    } catch {
      setErrorOpen(true);
    }
  };

  /* ─ Rendu ─ */
  if (loadingProd) return <p>Loading…</p>;
  if (errorProd)  return <p style={{ color: 'red' }}>{errorProd}</p>;

  return (
    <div>
      <BasicInfoCard form={productData} setForm={setProductData} />

      <Form_Product
        images={images}
        setImages={setImages}
        existingImageUrls={imagesPreview}
      />

      <div className={style.actions}>
        <button type="button" className={style.secondary} onClick={() => router.back()}>
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

      {/* Snackbars */}
      <Snackbar open={successOpen} autoHideDuration={4000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Product updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error || 'Update failed'}
        </Alert>
      </Snackbar>
    </div>
  );
}
