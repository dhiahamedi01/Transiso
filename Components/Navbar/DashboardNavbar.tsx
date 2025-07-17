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
  CircularProgress,
  Paper,
  ClickAwayListener,
} from '@mui/material';

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

const NOTIFICATIONS_API = '/api/notifications';

const DashboardNavbar: React.FC = () => {
  const [userName, setUserName] = useState<string>('Admin');
  const [userId, setUserId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('userName');
      const storedId = localStorage.getItem('userId');
      const role = localStorage.getItem('role');

      if (storedName) setUserName(storedName);
      if (storedId) setUserId(storedId);
      if (role === 'admin') setIsAdmin(true);
    }
  }, []);

  // Charger les notifications dès le début si admin
  useEffect(() => {
    if (isAdmin) {
      fetchNotifications();
    }
  }, [isAdmin]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(NOTIFICATIONS_API);
      const json = await res.json();
      if (json.success) {
        setNotifications(json.data);
      } else {
        setNotifications([]);
      }
    } catch {
      setNotifications([]);
    }
    setLoading(false);
  };

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAdmin) return;
    setNotifOpen((prev) => !prev);
  };

  const deleteNotifications = async () => {
    try {
      await fetch(NOTIFICATIONS_API, { method: 'DELETE' });
      setNotifications([]);
    } catch {
      // fail silently
    }
  };

  const handleNotificationItemClick = async (orderId: string) => {
    await deleteNotifications();
    setNotifOpen(false);
    router.push('/Dashboard/Ecommerce/Orders');
  };

  const [anchorUserMenu, setAnchorUserMenu] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorUserMenu);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorUserMenu(null);
  };

  const handleEditProfile = () => {
    if (userId) {
      router.push(`/Client/Profile/${userId}`);
    }
    handleUserMenuClose();
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

          {isAdmin && (
            <ClickAwayListener onClickAway={() => setNotifOpen(false)}>
              <Box sx={{ position: 'relative' }}>
                <IconButton size="large" aria-label="notifications" onClick={handleNotifClick}>
                  <Badge badgeContent={notifications.length} color="error" classes={{ badge: Style.badgeRoot }} overlap="circular">
                    <NotificationsIcon sx={{ color: '#4b506d' }} />
                  </Badge>
                </IconButton>

                {notifOpen && (
                  <Paper
                    sx={{
                      position: 'absolute',
                      right: 0,
                      mt: 1,
                      width: 320,
                      maxHeight: 400,
                      overflowY: 'auto',
                      boxShadow: 3,
                      borderRadius: 2,
                      zIndex: 1300,
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                        <CircularProgress size={24} />
                      </Box>
                    ) : notifications.length === 0 ? (
                      <Typography sx={{ p: 2, textAlign: 'center' }}>Aucune notification</Typography>
                    ) : (
                      notifications.map((notif) => (
                        <MenuItem
                          key={notif.orderId + notif.createdAt}
                          onClick={() => handleNotificationItemClick(notif.orderId)}
                          sx={{ whiteSpace: 'normal' }}
                        >
                          <Typography variant="body2">{notif.message}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            {new Date(notif.createdAt).toLocaleString()}
                          </Typography>
                        </MenuItem>
                      ))
                    )}
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleUserMenuOpen}>
            <Avatar alt={userName} src="/img/no_img.png" sx={{ width: 34, height: 34 }} />
            <Typography className={Style.avatarName} variant="subtitle1" sx={{ marginLeft: 1 }}>
              {userName}
            </Typography>
            <ExpandMoreIcon fontSize="small" sx={{ color: '#4b506d' }} />
          </Box>

          <Menu
            anchorEl={anchorUserMenu}
            open={openUserMenu}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
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