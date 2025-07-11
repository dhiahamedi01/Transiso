'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactCard = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName') || '';
    const email = localStorage.getItem('userEmail') || '';
    setFormData(prev => ({ ...prev, name, email }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await sendContactForm(formData);
      setSuccessMsg('Message sent successfully!');
      setFormData(prev => ({ ...prev, subject: '', message: '' }));
    } catch (error: any) {
      setErrorMsg(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 700,
        margin: '50px auto',
        borderRadius: 4,
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        backgroundColor: '#fafafa',
      }}
      elevation={10}
    >
      <CardContent sx={{ padding: 5 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="700" color="primary.main">
            Contact Support
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={5}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 4,
              py: 1.8,
              fontWeight: '700',
              fontSize: '1.1rem',
              background:
                'linear-gradient(45deg, #3f51b5 30%, #1a237e 90%)',
              boxShadow: '0 5px 20px rgba(63,81,181,0.5)',
              '&:hover': {
                background:
                  'linear-gradient(45deg, #283593 30%, #0d1441 90%)',
                boxShadow: '0 7px 25px rgba(40,53,147,0.7)',
              },
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>

          {successMsg && (
            <Typography
              color="success.main"
              mt={3}
              textAlign="center"
              fontWeight={600}
            >
              {successMsg}
            </Typography>
          )}
          {errorMsg && (
            <Typography
              color="error.main"
              mt={3}
              textAlign="center"
              fontWeight={600}
            >
              {errorMsg}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactCard;

async function sendContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    let errorMessage = 'Failed to send message';

    try {
      const errorData = JSON.parse(text);
      if (errorData.message) errorMessage = errorData.message;
    } catch {
      if (text) errorMessage = text;
    }

    throw new Error(errorMessage);
  }

  return res.json();
}
