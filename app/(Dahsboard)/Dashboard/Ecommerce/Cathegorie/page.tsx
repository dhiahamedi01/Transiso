'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface Category {
  id: number;
  name: string;
  created_at: string;
}

export default function AddCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch {
      setErrorMessage('Failed to load categories.');
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify({ name: newCategory }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || 'Unknown error');
        setErrorOpen(true);
        return;
      }

      setNewCategory('');
      setSuccessOpen(true);
      fetchCategories();
    } catch {
      setErrorMessage('Error adding category.');
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || 'Failed to delete category.');
        setErrorOpen(true);
        return;
      }

      setSuccessOpen(true);
      fetchCategories();
    } catch {
      setErrorMessage('Error deleting category.');
      setErrorOpen(true);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Card elevation={3}>
        <CardHeader title="Add Category" />
        <CardContent>
          <Stack spacing={3}>
            <TextField
              label="Category name"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              fullWidth
            />
            <LoadingButton
              onClick={handleAdd}
              loading={loading}
              variant="contained"
              sx={{ alignSelf: 'flex-start', backgroundColor: '#4f46e5' }}
            >
              Add
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Categories list
        </Typography>
        <Divider />
        <Stack spacing={1} mt={2}>
          {categories.map((cat) => (
            <Paper
              key={cat.id}
              elevation={1}
              sx={{
                padding: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {cat.name}
              <IconButton onClick={() => handleDelete(cat.id)} aria-label="delete">
                <DeleteIcon sx={{color:'red'}}/>
              </IconButton>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Operation successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setErrorOpen(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
