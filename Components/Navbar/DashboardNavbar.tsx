'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  Logout as LogoutIcon,
  Edit as EditIcon,
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
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';

/* -------------------- Styled -------------------- */

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

/* -------------------- Component -------------------- */

const DashboardNavbar: React.FC = () => {
  const [userName, setUserName] = useState<string>('Admin');
  const [userId, setUserId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName');
      const storedId = localStorage.getItem('userId');
      if (storedName) setUserName(storedName);
      if (storedId) setUserId(storedId);
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    if (userId) {
      router.push(`/Client/Profile/${userId}`);
    }
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/Login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid #e5e7eb' }}>
      <Toolbar className={Style.toolbarRoot}>
        <IconButton size="large" edge="start" aria-label="open drawer">
          <MenuIcon sx={{ color: '#4b506d' }} />
        </IconButton>

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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            <Badge badgeContent={3} classes={{ badge: Style.badgeRoot }} overlap="circular">
              <NotificationsIcon sx={{ color: '#4b506d' }} />
            </Badge>
          </IconButton>

          {/* Profil avec Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenuOpen}>
            <Avatar alt={userName} src="/img/no_img.png" sx={{ width: 34, height: 34 }} />
            <Typography className={Style.avatarName} variant="subtitle1" sx={{ marginLeft: 1 }}>
              {userName}
            </Typography>
            <ExpandMoreIcon fontSize="small" sx={{ color: '#4b506d' }} />
          </Box>

          {/* Menu déroulant */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 4,
              sx: {
                borderRadius: 2,
                minWidth: 180,
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  fontSize: '14px',
                },
              },
            }}
          >
            <MenuItem onClick={handleEditProfile}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Éditer le profil
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Déconnexion
            </MenuItem>
          </Menu>

          <IconButton size="large" aria-label="settings">
            <SettingsIcon sx={{ color: '#4b506d' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
