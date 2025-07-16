'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  Fab,
  Zoom,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useSocialLinks } from '@/hooks/useSocialLinks';

type Platform = 'facebook' | 'twitter' | 'linkedin' | 'instagram';

const socialIconComponents: Record<Platform, React.ReactElement> = {
  facebook: <FacebookIcon sx={{ color: '#fff', fontSize: 20 }} />,
  twitter: <TwitterIcon sx={{ color: '#fff', fontSize: 20 }} />,
  linkedin: <LinkedInIcon sx={{ color: '#fff', fontSize: 20 }} />,
  instagram: <InstagramIcon sx={{ color: '#fff', fontSize: 20 }} />,
};

const socialColors: Record<Platform, string> = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  linkedin: '#0077B5',
  instagram: '#E4405F',
};

export default function SocialMediaLinks() {
  const theme = useTheme();
  const { socialLinks, addSocialLink, deleteSocialLink, setSocialLinks } = useSocialLinks();
  const [visible, setVisible] = useState(true);
  const [alert, setAlert] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({
    open: false,
    message: '',
    type: 'success',
  });

  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    setAlert({ open: true, message, type });
  };

  const handleChange = (id: number, key: 'url' | 'platform', value: string) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [key]: value } : link))
    );
  };

  const handleAdd = () => {
    const tempId = Math.random();
    setSocialLinks((prev) => [
      ...prev,
      { id: tempId, platform: 'facebook', url: '', isNew: true },
    ]);
  };

  const handleSubmit = () => {
    const newLinks = socialLinks.filter((link) => link.isNew && link.url.trim() !== '');
    if (newLinks.length === 0) {
      showAlert('Please add a valid URL before submitting.', 'error');
      return;
    }

    newLinks.forEach((link) =>
      addSocialLink({ platform: link.platform, url: link.url.trim() })
    );

    showAlert(`${newLinks.length} link(s) added successfully 🎉`);

    setSocialLinks((prev) => prev.filter((l) => !l.isNew));
  };

  const handleDelete = (id: number) => {
    const target = socialLinks.find((l) => l.id === id);
    if (target?.isNew) {
      setSocialLinks((prev) => prev.filter((l) => l.id !== id));
      showAlert('New link removed 🗑️');
    } else {
      deleteSocialLink(id);
      showAlert('Link deleted successfully 🗑️');
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Manage Social Media Links
      </Typography>

      {socialLinks.length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          No social links added. Click + to add one.
        </Typography>
      )}

      {socialLinks.map((link) => (
        <Box
          key={link.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Social media URL"
            value={link.url}
            onChange={(e) => handleChange(link.id, 'url', e.target.value)}
          />

          <Select
            value={link.platform}
            onChange={(e) =>
              handleChange(link.id, 'platform', e.target.value as Platform)
            }
            variant="outlined"
            sx={{
              width: 56,
              height: 55,
              bgcolor: socialColors[link.platform as Platform],
              color: 'white',
              '& .MuiSelect-icon': { display: 'none' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              padding: 0,
            }}
          >
            {(Object.keys(socialIconComponents) as Platform[]).map((platform) => (
              <MenuItem
                key={platform}
                value={platform}
                sx={{
                  minWidth: 40,
                  bgcolor: socialColors[platform],
                  '& svg': { color: 'white' },
                }}
              >
                {socialIconComponents[platform]}
              </MenuItem>
            ))}
          </Select>

          <IconButton onClick={() => handleDelete(link.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      {socialLinks.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      )}

      <Zoom in={visible}>
        <Fab
          color="primary"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClick={handleAdd}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Zoom>

      {/* Snackbar for alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={alert.type} variant="filled" sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}
