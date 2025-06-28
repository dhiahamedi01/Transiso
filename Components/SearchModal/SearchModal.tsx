'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchModal.module.css';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Logique de recherche ici ou eventuelle redirection
    alert(`Recherche lancée pour : ${searchText}`);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className={styles.dialogTitle}>
        <span>ابحث في الموقع</span>
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <div className={styles.searchWrapper}>
          <TextField
            fullWidth
            placeholder="اكتب ما تبحث عنه..."
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            className={styles.searchInput}
            autoFocus
          />
        </div>
        <div className={styles.Footer}>
        <Button
          variant="contained"
          className={styles.searchButton}
          onClick={handleSearchSubmit}
          startIcon={<SearchIcon />}
        >
          بحث
        </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
