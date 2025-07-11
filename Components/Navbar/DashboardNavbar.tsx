'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Style from './DashboardNavbar.module.css';
import {
  Menu as MenuIcon,
  Apps as AppsIcon,
  CropFree as FullscreenIcon,
  NotificationsNone as NotificationsIcon,
  SettingsOutlined as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Typography,
  Box,
} from '@mui/material';

/* -------------------------------------------------------------------------- */
/*                               Styled pieces                               */
/* -------------------------------------------------------------------------- */

const Spacer = styled('div')({
  flexGrow: 1,
});

const StyledInputBase = styled(InputBase)({
  height: '37px',
  fontSize: '14px',
  color: '#2a3042',
  '& .MuiInputBase-input::placeholder': {
    color: '#2a3042', 
    opacity: 0.8,        
  },
});

/* -------------------------------------------------------------------------- */
/*                               Main component                              */
/* -------------------------------------------------------------------------- */

const DashboardNavbar: React.FC = () => {
  const [userName, setUserName] = useState<string>(''); // État pour le nom d'utilisateur

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, []);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: 'background.paper', borderBottom: '1px solid #e5e7eb' }}
    >
      <Toolbar className={Style.toolbarRoot}>
        {/* Burger menu */}
        <IconButton size="large" edge="start" aria-label="open drawer">
          <MenuIcon sx={{ color: '#4b506d' }} />
        </IconButton>

        {/* Search bar */}
        <div className={Style.searchContainer}>
          <SearchIcon className={Style.searchIcon} />
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            fullWidth
            sx={{ paddingLeft: '10px', color: '#2a3042' }} 
          />
        </div>

        <Spacer />

        {/* Right controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Langue */}
          <Box component="span" sx={{ width: 24, height: 16 }}>
            <Image src="/img/flags/eng.jpg" alt="English" width={24} height={16} />
          </Box>

          <IconButton size="large" aria-label="apps">
            <AppsIcon sx={{ color: '#4b506d' }} />
          </IconButton>

          <IconButton size="large" aria-label="fullscreen">
            <FullscreenIcon sx={{ color: '#4b506d' }} />
          </IconButton>

          <IconButton size="large" aria-label="notifications">
            <Badge
              badgeContent={3}
              classes={{ badge: Style.badgeRoot }}
              overlap="circular"
            >
              <NotificationsIcon sx={{ color: '#4b506d' }} />
            </Badge>
          </IconButton>

          {/* Profil utilisateur */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 0.5 }}>
            <Avatar alt={userName || "Admin"} src="/img/no_img.png" sx={{ width: 34, height: 34 }} />
            <Typography className={Style.avatarName} variant="subtitle1">
              {userName || 'Admin'}
            </Typography>
            <ExpandMoreIcon fontSize="small" sx={{ color: '#4b506d' }} />
          </Box>

          <IconButton size="large" aria-label="settings">
            <SettingsIcon sx={{ color: '#4b506d' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
