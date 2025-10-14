import * as React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import GroupIcon from '@mui/icons-material/Group';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'User', icon: <PersonOutlineIcon />, path: '/user' },
    { text: 'Trainer', icon: <FitnessCenterIcon />, path: '/trainer' },
    { text: 'Batch', icon: <ListAltIcon />, path: '/batch' },
    { text: 'Banner Management', icon: <ImageIcon />, path: '/banner' },
    { text: 'Page Management', icon: <ArticleIcon />, path: '/pages' },
    { text: 'Set Up', icon: <SettingsSuggestIcon />, path: '/setup' },
    { text: 'Team Management', icon: <GroupIcon />, path: '/team' },
    { text: 'Support Management', icon: <SupportAgentIcon />, path: '/support' },
    { text: 'Feedback', icon: <FeedbackIcon />, path: '/feedback' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Get current page title based on location
  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.text : 'Overview';
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => {
          const selected = location.pathname === item.path;
          return (
          <ListItem key={item.text} disablePadding>
            <ListItemButton selected={selected} onClick={() => navigate(item.path)} sx={{
              '&.Mui-selected': {
                bgcolor: '#C82D30',
                '& .MuiListItemIcon-root': { color: '#C82D30', bgcolor: '#ffffff', borderRadius: '50%' },
                '& .MuiListItemText-primary': { color: '#ffffff' },
              },
              '&.Mui-selected:hover': { bgcolor: '#C82D30' },
              '&:hover': { bgcolor: '#f3f4f6' },
              borderRadius: 1,
              mx: 1,
            }}>
              <ListItemIcon  sx={{
                    minWidth: 'auto',
                    color: '#6b7280',
                    bgcolor: '#f3f4f6',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.25,
                  }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ '.MuiListItemText-primary': { fontSize: 14 } }} />
            </ListItemButton>
          </ListItem>
        );})}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Fixed spacer to cover the top margin above the AppBar so content never shows behind it */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, height: '10px', bgcolor: '#f5f7fb', zIndex: (theme) => theme.zIndex.drawer + 2 }} />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px - 16px)` },
          mt: '10px',
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#ffffff',
          color: '#0f172a',
          boxShadow: 'none',
          border: '1px solid #e5e7eb',
          borderRadius: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundImage: 'none',
          opacity: 1,
          position: 'fixed',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: '#ffffff', borderRadius: 2, zIndex: 0 }} />
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" noWrap component="div" sx={{ fontWeight: 600 }}>
              {getCurrentPageTitle()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 30, height: 30, bgcolor: '#e5e7eb' }} />
            <Box>
              <Typography variant="body2" sx={{ lineHeight: 1 }}>Filippo Inzaghi</Typography>
              <Typography variant="caption" color="text.secondary">user@mail.com</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } , mt:" 10px ",}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer 
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
           
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Layout;

