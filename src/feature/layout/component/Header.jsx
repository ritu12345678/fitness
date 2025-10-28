import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  KeyboardArrowDown
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logout } from '../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';

const Header = ({ drawerWidth, pageTitle = "Overview" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { showSuccess, showError } = useToast();

  // Fetch user profile on mount
  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      showSuccess('Logged out successfully!');
      handleClose();
      navigate('/login');
    } catch (error) {
      showError('Logout failed. Please try again.');
      console.error('Logout error:', error);
    }
  };

  const handleProfile = () => {
    handleClose();
    // Navigate to profile page if you have one
    console.log('Navigate to profile');
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    const firstName = user.firstName || user.name || user.fullName || '';
    const lastName = user.lastName || '';
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return firstName[0]?.toUpperCase() || 'U';
  };

  // Get display name
  const getDisplayName = () => {
    if (!user) return 'Loading...';
    return user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}`
      : user.name || user.fullName || user.email?.split('@')[0] || 'User';
  };

  // Get display email
  const getDisplayEmail = () => {
    if (!user) return 'Loading...';
    return user.email || 'No email';
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px - 2rem)` }, // Account for sidebar + spacing
        ml: { sm: `${drawerWidth + 16}px` }, // Sidebar width + 16px spacing
        mt: '1rem', // Space from top
        mr:"1rem",
        borderRadius: '0.75rem', // Rounded corners
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        height: '4rem', // Fixed height
        minHeight: '4rem',
        maxHeight: '4rem',
        zIndex: 1400, // Ensure it stays above content
      }}
    >
      <Toolbar
        sx={{
          height: '4rem',
          minHeight: '4rem',
          px: 4, // Horizontal padding
          justifyContent: 'space-between',
        }}
      >
        {/* Left side - Page Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            color: '#111827',
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
          }}
        >
          {pageTitle}
        </Typography>

        {/* Right side - User Profile */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          {/* User Info */}
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: '#111827',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                margin: 0,
              }}
            >
              {getDisplayName()}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                fontSize: '0.75rem',
                lineHeight: '1rem',
                margin: 0,
              }}
            >
              {getDisplayEmail()}
            </Typography>
          </Box>

          {/* Avatar */}
          {loading ? (
            <CircularProgress size={24} sx={{ mx: 2 }} />
          ) : (
            <Avatar
              sx={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {getUserInitials()}
            </Avatar>
          )}

          {/* Dropdown Arrow */}
          <IconButton
            size="small"
            sx={{
              color: '#6b7280',
              padding: '0.25rem',
            }}
          >
            <KeyboardArrowDown />
          </IconButton>
        </Box>

        {/* User Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: '12rem',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}
        >
          <MenuItem onClick={handleProfile}>
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <Typography variant="body2">Settings</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} disabled={loading}>
            <Typography variant="body2" color="error">
              {loading ? 'Logging out...' : 'Logout'}
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;