'use client';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
      sx={{ p: 3 }}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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

type SocialLink = {
  platform: keyof typeof socialIconComponents;
  url: string;
};

export default function WebsiteSettingsTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [logo, setLogo] = React.useState<string | null>(null);
  const [footerDesc, setFooterDesc] = React.useState('');
  const [socialLinks, setSocialLinks] = React.useState<SocialLink[]>([]);

  // New states for opening hours
  const [openingTime, setOpeningTime] = React.useState('09:00');
  const [closingTime, setClosingTime] = React.useState('18:00');

  // SMTP states
  const [smtpHost, setSmtpHost] = React.useState('');
  const [smtpPort, setSmtpPort] = React.useState('');
  const [smtpUser, setSmtpUser] = React.useState('');
  const [smtpPass, setSmtpPass] = React.useState('');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleSocialSubmit = (index: number) => {
    alert(`Submitted social link #${index + 1}: ${socialLinks[index].platform} - ${socialLinks[index].url}`);
  };

  const handleSmtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`SMTP settings submitted:
    Host: ${smtpHost}
    Port: ${smtpPort}
    User: ${smtpUser}`);
  };

  const fabStyle = {
    position: 'absolute' as const,
    bottom: 16,
    right: 16,
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 800,
        position: 'relative',
        borderRadius: 3,
        boxShadow: 4,
        mt: 8,
        mx: 'auto',
        pb: 7, // more padding for footer
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="website settings tabs"
        >
          <Tab label="Logo" id="action-tab-0" aria-controls="action-tabpanel-0" />
          <Tab label="Social Media" id="action-tab-1" aria-controls="action-tabpanel-1" />
          <Tab label="Footer" id="action-tab-2" aria-controls="action-tabpanel-2" />
          <Tab label="SMTP Email" id="action-tab-3" aria-controls="action-tabpanel-3" />
        </Tabs>
      </AppBar>

      {/* Tab 0: Logo Upload */}
      <TabPanel value={value} index={0}>
        <Typography variant="h6" gutterBottom>
          Upload Website Logo
        </Typography>
        <Box
          sx={{
            width: 600,
            height: 160,
            borderRadius: 3,
            border: `2px dashed ${blue[400]}`,
            bgcolor: logo ? 'transparent' : '#f9f9f9',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: blue[400],
            position: 'relative',
            overflow: 'hidden',
            mx: 'auto',
            transition: 'background-color 0.3s, border-color 0.3s',
            '&:hover': {
              bgcolor: logo ? 'transparent' : '#e3f2fd',
              borderColor: blue[600],
            },
          }}
          onClick={() => {
            const input = document.getElementById('logo-upload-input');
            input?.click();
          }}
        >
          {logo ? (
            <Avatar
              src={logo}
              alt="Website Logo"
              variant="rounded"
              sx={{ width: '100%', height: '100%', borderRadius: 3 }}
            />
          ) : (
            <>
              <UploadFileIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="body2" textAlign="center" sx={{ px: 2 }}>
                Drag & drop your logo here or click to select a file
              </Typography>
            </>
          )}

          <input
            id="logo-upload-input"
            type="file"
            accept="image/*"
            hidden
            onChange={handleLogoUpload}
            onClick={(e) => e.stopPropagation()} // prevent double open
          />
        </Box>
      </TabPanel>

      {/* Tab 1: Social Media Links */}
      <TabPanel value={value} index={1}>
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
                // Remove arrow
                '& .MuiSelect-icon': {
                  display: 'none',
                },
                // Remove border on focus
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
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
                    '& svg': {
                      color: 'white',
                    },
                  }}
                >
                  {icon}
                </MenuItem>
              ))}
            </Select>

            <IconButton
              aria-label="delete link"
              onClick={() => removeSocialLink(idx)}
              color="error"
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        {socialLinks.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => {
                console.log('Submitting all social links:', socialLinks);
              }}
            >
              Submit
            </Button>
          </Box>
        )}

        <Zoom
          in={value === 1}
          timeout={theme.transitions.duration.enteringScreen}
          style={{
            transitionDelay: `${value === 1 ? theme.transitions.duration.leavingScreen : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab color="primary" aria-label="add social link" sx={fabStyle} onClick={addSocialLink}>
            <AddIcon />
          </Fab>
        </Zoom>
      </TabPanel>

      {/* Tab 2: Footer Description + Hours */}
      <TabPanel value={value} index={2}>
        <Typography variant="h6" gutterBottom>
          Footer Description
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          placeholder="Enter footer description here..."
          value={footerDesc}
          onChange={(e) => setFooterDesc(e.target.value)}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <Typography variant="subtitle1" gutterBottom>
          Opening and Closing Hours
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Opening"
            type="time"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
          />
          <TextField
            label="Closing"
            type="time"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
          />
        </Box>
      </TabPanel>

      {/* Tab 3: SMTP Email Form */}
      <TabPanel value={value} index={3}>
        <Typography variant="h6" gutterBottom>
          SMTP Email Configuration
        </Typography>
        <Box
          component="form"
          onSubmit={handleSmtpSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="SMTP Host"
            value={smtpHost}
            onChange={(e) => setSmtpHost(e.target.value)}
            required
          />
          <TextField
            label="Port"
            type="number"
            value={smtpPort}
            onChange={(e) => setSmtpPort(e.target.value)}
            required
          />
          <TextField
            label="User"
            value={smtpUser}
            onChange={(e) => setSmtpUser(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={smtpPass}
            onChange={(e) => setSmtpPass(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">
            Save SMTP
          </Button>
        </Box>
      </TabPanel>

      {/* Footer showing hours */}
      <Box
        component="footer"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'grey.100',
          p: 1,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          fontSize: '0.875rem',
        }}
      >
        Opening: {openingTime} — Closing: {closingTime}
      </Box>
    </Box>
  );
}
