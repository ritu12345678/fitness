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
import Collapse from '@mui/material/Collapse';
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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmationModal from '../../components/ConfirmationModal';

const drawerWidth = 240;

function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);
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
    {
      text: 'Set Up', icon: <SettingsSuggestIcon />, path: '/setup',
      children: [
        { text: 'Studio Packages', icon: <CreditCardOutlinedIcon />, path: '/setup/studio-packages' },
        { text: 'Program', icon: <CategoryOutlinedIcon />, path: '/setup/program' },
        { text: 'Studio', icon: <StorefrontOutlinedIcon />, path: '/setup/studio' },
      ],
    },
    {
      text: 'Team Management', icon: <GroupIcon />, path: '/team',
      children: [
        { text: 'Team Role', icon: <BadgeOutlinedIcon />, path: '/team/role' },
        { text: 'Team List', icon: <BadgeOutlinedIcon />, path: '/team/list' },
      ],
    },
    {
      text: 'Support Management', icon: <SupportAgentIcon />, path: '/support',
      children: [
        { text: 'Ticket', icon: <ConfirmationNumberOutlinedIcon />, path: '/support/ticket' },
        { text: 'Faq', icon: <HelpOutlineOutlinedIcon />, path: '/support/faq' },
        { text: 'Delete Request', icon: <DeleteOutlineOutlinedIcon />, path: '/support/delete-request' },
      ],
    },
    { text: 'Feedback', icon: <FeedbackIcon />, path: '/feedback' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Normalize detail routes to their parent sections for title/selection
  const getNormalizedPath = () => {
    const p = location.pathname;
    if (p.startsWith('/user/')) return '/user';
    if (p.startsWith('/trainer/')) return '/trainer';
    if (p.startsWith('/batch/')) return '/batch';
    return p;
  };

  // Get current page title based on normalized location, including child items
  const getCurrentPageTitle = () => {
    const p = location.pathname;
    for (const item of menuItems) {
      if (item.children) {
        const child = item.children.find((c) => p.startsWith(c.path));
        if (child) return child.text;
      }
    }
    const currentItem = menuItems.find(item => item.path === getNormalizedPath());
    return currentItem ? currentItem.text : 'Overview';
  };

  const [openSections, setOpenSections] = React.useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('User logged out');
    setOpenLogoutModal(false);
    // You can add navigation to login page or clear user session here
    // navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar sx={{ minHeight: 40 }} />
      <Box sx={{ px: 2, py: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>Fitness</Typography>
      </Box>
   
      <Divider />
      <List>
        {menuItems.map((item) => {
          const normalized = getNormalizedPath();
          const selected = normalized === item.path || (item.children && item.children.some((c) => normalized.startsWith(c.path.split('/').slice(0,2).join('/'))));
          const hasChildren = Array.isArray(item.children) && item.children.length > 0;
          const isOpen = openSections[item.text] === true;
          return (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={selected} onClick={() => hasChildren ? toggleSection(item.text) : navigate(item.path)} sx={{
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
              {hasChildren && (isOpen ? <ExpandLess sx={{ color: selected ? '#ffffff' : '#6b7280' }} /> : <ExpandMore sx={{ color: selected ? '#ffffff' : '#6b7280' }} />)}
            </ListItemButton>
            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ mx: 1.5, mb: 1, mt: 0.5, bgcolor: '#eaa5a5', borderRadius: 2, p: 1 }}>
                  {item.children.map((child) => {
                    const childSelected = location.pathname.startsWith(child.path);
                    return (
                      <ListItemButton key={child.text} onClick={() => navigate(child.path)} sx={{
                        borderRadius: 1.5,
                        mb: 0.5,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                        bgcolor: childSelected ? 'rgba(255,255,255,0.35)' : 'transparent',
                      }}>
                        <ListItemIcon sx={{ minWidth: 28, color: '#ffffff' }}>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText primary={child.text} sx={{ '.MuiListItemText-primary': { fontSize: 13, color: '#ffffff' } }} />
                      </ListItemButton>
                    );
                  })}
                </Box>
              </Collapse>
            )}
          </ListItem>
        );})}
      </List>
      
      {/* Logout Button */}
      <Box sx={{ px: 2, pb: 2 }}>
        <ListItemButton 
          onClick={() => setOpenLogoutModal(true)}
          sx={{
            borderRadius: 1,
            mx: 1,
            '&:hover': { bgcolor: '#f3f4f6' },
          }}
        >
          <ListItemIcon sx={{
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
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" sx={{ '.MuiListItemText-primary': { fontSize: 14 } }} />
        </ListItemButton>
      </Box>
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
            {/* Back arrow on detail pages */}
            {(['/user/detail','/batch/detail','/trainer/detail'].includes(location.pathname)) && (
              <IconButton color="inherit" onClick={() => navigate(-1)} sx={{ mr: 1 }}>
                {/* Using the same MenuIcon style for consistency; can swap to ArrowBack if available */}
                <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>➜</span>
              </IconButton>
            )}
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

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onConfirm={handleLogout}
        title="Log Out"
        message="Are you sure do you want to Log out"
        confirmText="Yes"
        cancelText="No"
        confirmColor="#C82D30"
      />
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

