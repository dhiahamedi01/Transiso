'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './CheckoutPage.module.css';
import { CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function CheckoutPage() {
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
    paymentMethod: 'الدفع عند التسليم',
    phone: '',
    email: '',
    date: '',
    price: 0,
  });

  const [orderId, setOrderId] = useState('');

  // 1. Charger produit
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
        console.error('Erreur récupération produit', err);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  // 2. Charger utilisateur si connecté (depuis localStorage userId)
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
          country: user.location || '', // <-- Mettre location dans البلد ici
        }));
      })
      .catch(err => {
        console.error('Erreur récupération utilisateur', err);
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
      alert('حدث خطأ أثناء إرسال الطلب');
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
    return <p style={{ padding: '2rem', direction: 'rtl' }}>لم يتم اختيار منتج.</p>;
  }

  if (loading || userLoading) {
    return (
      <div
        style={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          direction: 'rtl',
          fontSize: '1.5rem',
        }}
      >
        <CircularProgress />
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
    <div className={styles.container} dir="rtl" style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 1 }}>
        {!submitted ? (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2 className={styles.title}>تفاصيل الطلب</h2>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>العميل</label>
                <input
                  name="customer"
                  placeholder="اكتب اسم العميل"
                  value={formData.customer}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>العنوان</label>
                <input
                  name="address"
                  placeholder="اكتب العنوان بالتفصيل"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>البلد</label>
                <input
                  name="country"
                  placeholder="اسم البلد"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>الهاتف</label>
                <input
                  name="phone"
                  placeholder="رقم الهاتف"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>طريقة الدفع</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="بطاقة ائتمان" disabled>بطاقة ائتمان (قريباً)</option>
                  <option value="باي بال" disabled>باي بال (قريباً)</option>
                  <option value="الدفع عند التسليم">الدفع عند التسليم</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>المنتجات</label>
                <textarea
                  name="products"
                  value={formData.products}
                  onChange={handleChange}
                  required
                  className={styles.textarea}
                />
              </div>
            </div>

            <button type="submit" className={styles.button}>
              إرسال الطلب <SaveIcon />
            </button>
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
              gap: '15px'
            }}
            dir="rtl"
          >
            <img
              src="/img/checked.gif"
              alt="Commande réussie"
              width={150}
              height={150}
              style={{ marginBottom: '1rem' }}
            />
            <h2>شكراً لطلبك!</h2>
            <p>سيتم تحويلك إلى صفحة المنتجات خلال لحظات...</p>
          </div>
        )}
      </div>

      {!submitted && (
        <div className={styles.productContainer} style={{ flexBasis: '400px' }}>
          <h2 className={styles.productTitle}>🧾 تفاصيل المنتج</h2>
          <Image
            src={imageUrl}
            alt={product.name}
            width={370}
            height={370}
            className={styles.productImage}
            unoptimized
            priority
          />
          <p><strong>الاسم:</strong> {product.name}</p>
          <p><strong>السعر:</strong> ${product.price}</p>
          <p><strong>المخزون:</strong> {product.stock > 0 ? 'متوفر' : 'غير متوفر'}</p>
        </div>
      )}
    </div>
  );
}
