// src/components/SearchInput.tsx
'use client';
import { ChangeEvent } from 'react';
import styles from './ListeEmp.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      type="search"
      placeholder="Search..."
      className={styles.searchInput}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}
