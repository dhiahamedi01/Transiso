'use client';
import * as React from 'react';
import { Box, AppBar, Tabs, Tab, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LogoUpload from '@/Components/Dahsboard/Manage_site/Configuration/Logo/LogoTab';
import SocialMediaLinks, { SocialLink } from '@/Components/Dahsboard/Manage_site/Configuration/SocialMediaLinks/SocialMediaLinks';
import FooterSettings from '@/Components/Dahsboard/Manage_site/Configuration/Footer/Footer';
import SmtpSettings from '@/Components/Dahsboard/Manage_site/Configuration/SmtpSettings/SmtpSettings';

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

export default function WebsiteSettingsTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  // States partagés
  const [logo, setLogo] = React.useState<string | null>(null);
  const [footerDesc, setFooterDesc] = React.useState('');
  const [socialLinks, setSocialLinks] = React.useState<SocialLink[]>([]);
  const [openingTime, setOpeningTime] = React.useState('09:00');
  const [closingTime, setClosingTime] = React.useState('18:00');
  const [smtpHost, setSmtpHost] = React.useState('');
  const [smtpPort, setSmtpPort] = React.useState('');
  const [smtpUser, setSmtpUser] = React.useState('');
  const [smtpPass, setSmtpPass] = React.useState('');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        pb: 7,
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

      <TabPanel value={value} index={0}>
        <LogoUpload/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <SocialMediaLinks socialLinks={socialLinks} setSocialLinks={setSocialLinks} visible={value === 1} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <FooterSettings
          footerDesc={footerDesc}
          setFooterDesc={setFooterDesc}
          openingTime={openingTime}
          setOpeningTime={setOpeningTime}
          closingTime={closingTime}
          setClosingTime={setClosingTime}
        />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <SmtpSettings
          smtpHost={smtpHost}
          setSmtpHost={setSmtpHost}
          smtpPort={smtpPort}
          setSmtpPort={setSmtpPort}
          smtpUser={smtpUser}
          setSmtpUser={setSmtpUser}
          smtpPass={smtpPass}
          setSmtpPass={setSmtpPass}
        />
      </TabPanel>

      {/* Footer affichant les horaires */}
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
