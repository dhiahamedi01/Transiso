'use client';
import * as React from 'react';
import { Box, Typography, TextField, Select, MenuItem, IconButton, Button, Fab, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material/styles';

const socialIconComponents = {
  facebook: <FacebookIcon sx={{ color: 'white', fontSize: 20 }} />,
  twitter: <TwitterIcon sx={{ color: 'white', fontSize: 20 }} />,
  linkedin: <LinkedInIcon sx={{ color: 'white', fontSize: 20 }} />,
  instagram: <InstagramIcon sx={{ color: 'white', fontSize: 20 }} />,
};

const socialColors = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  linkedin: '#0077B5',
  instagram: '#E4405F',
};

export type SocialLink = {
  platform: keyof typeof socialIconComponents;
  url: string;
};

interface SocialMediaLinksProps {
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  visible: boolean;
}

export default function SocialMediaLinks({ socialLinks, setSocialLinks, visible }: SocialMediaLinksProps) {
  const theme = useTheme();

  const addSocialLink = () => {
    setSocialLinks((prev) => [...prev, { platform: 'facebook', url: '' }]);
  };

  const updateSocialLink = (index: number, key: keyof SocialLink, value: string) => {
    setSocialLinks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks((prev) => prev.filter((_el, i) => i !== index));
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

      {socialLinks.map((link, idx) => (
        <Box
          key={idx}
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
            onChange={(e) => updateSocialLink(idx, 'url', e.target.value)}
          />

          <Select
            value={link.platform}
            onChange={(e) =>
              updateSocialLink(idx, 'platform', e.target.value as keyof typeof socialIconComponents)
            }
            variant="outlined"
            sx={{
              width: 56,
              height: 55,
              borderRadius: 1,
              bgcolor: socialColors[link.platform],
              color: 'white',
              '& .MuiSelect-icon': { display: 'none' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  mt: 1,
                  '& .MuiMenuItem-root': {
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 1,
                    borderRadius: 0,
                  },
                  '& .MuiMenuItem-root.Mui-selected': {
                    bgcolor: (theme) => theme.palette.action.selected,
                    '& svg': {
                      color: (theme) => theme.palette.primary.main,
                    },
                  },
                },
              },
            }}
          >
            {Object.entries(socialIconComponents).map(([platform, icon]) => (
              <MenuItem
                key={platform}
                value={platform}
                sx={{
                  minWidth: 40,
                  bgcolor: socialColors[platform as keyof typeof socialIconComponents],
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: socialColors[platform as keyof typeof socialIconComponents],
                    opacity: 0.8,
                  },
                  '& svg': { color: 'white' },
                }}
              >
                {icon}
              </MenuItem>
            ))}
          </Select>

          <IconButton aria-label="delete link" onClick={() => removeSocialLink(idx)} color="error" size="large">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      {socialLinks.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => console.log('Submitting all social links:', socialLinks)}>
            Submit
          </Button>
        </Box>
      )}

      <Zoom
        in={visible}
        timeout={theme.transitions.duration.enteringScreen}
        style={{
          transitionDelay: `${visible ? theme.transitions.duration.leavingScreen : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab color="primary" aria-label="add social link" sx={{ position: 'absolute', bottom: 16, right: 16 }} onClick={addSocialLink}>
          <AddIcon />
        </Fab>
      </Zoom>
    </>
  );
}
