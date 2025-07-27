'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './CheckoutPage.module.css';
import { CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('productId');

  const [product, setProduct] = useState<any | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    customer: '',
    address: '',
    products: '',
    status: 'pending',
    payment: 'unpaid',
    country: '',
    paymentMethod: t('checkout.cashOnDelivery'),
    phone: '',
    email: '',
    date: '',
    price: 0,
  });

  const [orderId, setOrderId] = useState('');

  // Direction dynamique selon langue
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    axios.get(`/api/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        setFormData(prev => ({
          ...prev,
          products: res.data.name,
          price: res.data.price,
          date: new Date().toISOString().split('T')[0],
        }));
        setOrderId('ORD-' + Math.floor(100000 + Math.random() * 900000));
      })
      .catch(err => {
        console.error('Error loading product', err);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setUserLoading(false);
      return;
    }

    setUserLoading(true);
    axios.get(`/api/User/${userId}`)
      .then(res => {
        const user = res.data;
        setFormData(prev => ({
          ...prev,
          customer: user.first_name || '',
          phone: user.phone || '',
          email: user.email || '',
          address: user.location || '',
          country: user.location || '',
        }));
      })
      .catch(err => {
        console.error('Error loading user', err);
        setUserError(true);
      })
      .finally(() => setUserLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullData = { ...formData, orderId, status: 'pending', payment: 'unpaid' };

    try {
      await axios.post('/api/orders', fullData);
      setSubmitted(true);
      setTimeout(() => router.push('/Liste_produit'), 3000);
    } catch (error) {
      alert(t('checkout.orderError') || 'An error occurred while sending the order.');
      console.error(error);
    }
  };

  const getImageUrl = (img?: string) => {
    if (!img || img.trim() === '') return '/img/no-image.png';
    if (img.startsWith('http')) return img;
    if (img.startsWith('/')) return img;
    return '/' + img;
  };

  if (!productId) {
    return (
      <p style={{ padding: '2rem', direction }}>
        {t('checkout.noProductSelected')}
      </p>
    );
  }

  if (loading || userLoading) {
    return (
      <div
        style={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          direction,
          fontSize: '1.5rem',
        }}
      >
        <CircularProgress />
        <span style={{ marginLeft: '1rem' }}>{t('checkout.loading')}</span>
      </div>
    );
  }

  const images = [
    product?.image1,
    product?.image2,
    product?.image3,
    product?.image4,
    product?.image5,
  ];

  const firstValidImage = images.find(img => typeof img === 'string' && img.trim() !== '') ?? '/img/no-image.png';
  const imageUrl = getImageUrl(firstValidImage);

  return (
    <div className={`${styles.container} ${direction === 'rtl' ? styles.rtl : styles.ltr}`} style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2 className={styles.title}>{t('checkout.orderDetails')}</h2>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{t('checkout.customer')}</label>
                <input
                  name="customer"
                  placeholder={t('checkout.customerPlaceholder')}
                  value={formData.customer}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{t('checkout.address')}</label>
                <input
                  name="address"
                  placeholder={t('checkout.addressPlaceholder')}
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{t('checkout.country')}</label>
                <input
                  name="country"
                  placeholder={t('checkout.countryPlaceholder')}
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{t('checkout.phone')}</label>
                <input
                  name="phone"
                  placeholder={t('checkout.phonePlaceholder')}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{t('checkout.email')}</label>
                <input
                  type="email"
                  name="email"
                  placeholder={t('checkout.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{t('checkout.paymentMethod')}</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value={t('checkout.creditCard')} disabled>{t('checkout.creditCard')}</option>
                  <option value={t('checkout.paypal')} disabled>{t('checkout.paypal')}</option>
                  <option value={t('checkout.cashOnDelivery')}>{t('checkout.cashOnDelivery')}</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>{t('checkout.products')}</label>
                <textarea
                  name="products"
                  value={formData.products}
                  onChange={handleChange}
                  required
                  className={styles.textarea}
                />
              </div>
            </div>

            {/* Ajout d'une classe dynamique pour gérer l'alignement du bouton selon la direction */}
            <div className={direction === 'rtl' ? styles.buttonContainerRTL : styles.buttonContainerLTR}>
              <button type="submit" className={styles.button}>
                {t('checkout.submitOrder')} <SaveIcon />
              </button>
            </div>
          </form>
        ) : (
          <div
            style={{
              textAlign: 'center',
              paddingTop: '2rem',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '15px',
            }}
            dir={direction}
          >
            <img
              src="/img/checked.gif"
              alt={t('checkout.orderSuccess')}
              width={150}
              height={150}
              style={{ marginBottom: '1rem' }}
            />
            <h2>{t('checkout.orderSuccess')}</h2>
            <p>{t('checkout.redirecting')}</p>
          </div>
        )}
      </div>

      {!submitted && (
        <div className={styles.productContainer} style={{ flexBasis: '400px' }}>
          <h2 className={styles.productTitle}>{t('checkout.productDetails')}</h2>
          <Image
            src={imageUrl}
            alt={product.name}
            width={370}
            height={370}
            className={styles.productImage}
            unoptimized
            priority
          />
          <p><strong>{t('checkout.name')}:</strong> {product.name}</p>
          <p><strong>{t('checkout.price')}:</strong> ${product.price}</p>
          <p><strong>{t('checkout.stock')}:</strong> {product.stock > 0 ? t('checkout.available') : t('checkout.unavailable')}</p>
        </div>
      )}
    </div>
  );
}
