'use client';

import React, { useEffect, useState } from 'react';
import styles from './BasicInfoCard.module.css';

interface Props {
  form: {
    productName: string;
    category: string;
    oldPrice: string;
    price: string;
    stock: string;
    description: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      productName: string;
      category: string;
      oldPrice: string;
      price: string;
      stock: string;
      description: string;
    }>
  >;
}

interface Category {
  id: number;
  name: string;
}

const BasicInfoCard: React.FC<Props> = ({ form, setForm }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () =>
    setForm({
      productName: '',
      category: '',
      oldPrice: '',
      price: '',
      stock: '',
      description: '',
    });

  return (
    <form
      className={styles.card}
      onSubmit={(e) => e.preventDefault()}
    >
      <h3 className={styles.title}>Basic Information</h3>
      <p className={styles.subtitle}>Fill all information below</p>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select a category…</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>  {/* <-- ici value=cat.name */}
                {cat.name}
              </option>
            ))}
          </select>

        </div>

        <div className={styles.field}>
          <label htmlFor="oldPrice">Old Price</label>
          <input
            id="oldPrice"
            name="oldPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Old Price"
            value={form.oldPrice}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Product Description"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default BasicInfoCard;
