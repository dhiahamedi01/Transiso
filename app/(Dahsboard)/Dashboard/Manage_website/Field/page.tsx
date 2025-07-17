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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Field {
  id: number;
  name: string;
  created_at: string;
}

export default function AddField() {
  const [fields, setFields] = useState<Field[]>([]);
  const [newField, setNewField] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pour édition
  const [editOpen, setEditOpen] = useState(false);
  const [editFieldName, setEditFieldName] = useState('');
  const [editFieldId, setEditFieldId] = useState<number | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchFields = async () => {
    try {
      const res = await fetch('/api/fields');
      const data = await res.json();
      setFields(data);
    } catch {
      setErrorMessage('Failed to load fields.');
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const handleAdd = async () => {
    if (!newField.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/fields', {
        method: 'POST',
        body: JSON.stringify({ name: newField }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || 'Unknown error');
        setErrorOpen(true);
        return;
      }

      setNewField('');
      setSuccessOpen(true);
      fetchFields();
    } catch {
      setErrorMessage('Error adding field.');
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this field?')) return;

    try {
      const res = await fetch(`/api/fields/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || 'Failed to delete field.');
        setErrorOpen(true);
        return;
      }

      setSuccessOpen(true);
      fetchFields();
    } catch {
      setErrorMessage('Error deleting field.');
      setErrorOpen(true);
    }
  };

  // Ouvre modal édition
  const openEditModal = (field: Field) => {
    setEditFieldId(field.id);
    setEditFieldName(field.name);
    setEditOpen(true);
  };

  // Enregistre la modification
  const handleEditSave = async () => {
    if (!editFieldName.trim() || editFieldId === null) return;

    setEditLoading(true);
    try {
      const res = await fetch(`/api/fields/${editFieldId}`, {
        method: 'PUT',
        body: JSON.stringify({ name: editFieldName }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || 'Failed to update field.');
        setErrorOpen(true);
        return;
      }

      setEditOpen(false);
      setSuccessOpen(true);
      fetchFields();
    } catch {
      setErrorMessage('Error updating field.');
      setErrorOpen(true);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Card elevation={3}>
        <CardHeader title="Add Field" />
        <CardContent>
          <Stack spacing={3}>
            <TextField
              label="Field name"
              variant="outlined"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
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
          Fields list
        </Typography>
        <Divider />
        <Stack spacing={1} mt={2}>
          {fields.map((field) => (
            <Paper
              key={field.id}
              elevation={1}
              sx={{
                padding: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{field.name}</Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="edit"
                  onClick={() => openEditModal(field)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(field.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Modal édition */}


{/* Modal édition */}
<Dialog
  open={editOpen}
  onClose={() => setEditOpen(false)}
  maxWidth="sm"        // contrôle la largeur max (sm = small, md = medium, lg = large)
  fullWidth             // prend toute la largeur possible dans maxWidth
  PaperProps={{
    sx: {
      padding: 3,
      borderRadius: 2,
      minHeight: 250,   // hauteur minimale pour plus d'espace
    },
  }}
>
  <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
    Edit Field
  </DialogTitle>
  <DialogContent sx={{ mt: 1 }}>
    <TextField
      autoFocus
      margin="dense"
      label="Field name"
      type="text"
      fullWidth
      variant="outlined"  // un peu plus visible qu’"standard"
      value={editFieldName}
      onChange={(e) => setEditFieldName(e.target.value)}
      sx={{ fontSize: '1.1rem' }}
    />
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'center', mt: 2, mb: 1,gap:'30px' }}>
    <Button
      onClick={() => setEditOpen(false)}
      disabled={editLoading}
      variant="outlined"
      sx={{ minWidth: 120 }}
    >
      Cancel
    </Button>
    <LoadingButton
      onClick={handleEditSave}
      loading={editLoading}
      variant="contained"
      sx={{ minWidth: 120 }}
    >
      Save
    </LoadingButton>
  </DialogActions>
</Dialog>

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
