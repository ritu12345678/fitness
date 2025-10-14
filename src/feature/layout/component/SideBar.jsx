// import React, { useState } from 'react';
// import {
//   Drawer,
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   Divider,
//   IconButton,
// } from '@mui/material';
// import {
//   Dashboard,
//   Person,
//   FitnessCenter,
//   CheckCircle,
//   Campaign,
//   BarChart,
//   Settings,
//   Groups,
//   SupportAgent,
//   Feedback,
//   ExpandLess,
//   ExpandMore,
// } from '@mui/icons-material';

// const SideBar = ({ width = 240 }) => {
//   const [openSections, setOpenSections] = useState({});

//   const handleSectionToggle = (section) => {
//     setOpenSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   // Main menu items
//   const mainMenuItems = [
//     { text: 'Overview', icon: <Dashboard />, active: true },
//     { text: 'User', icon: <Person /> },
//     { text: 'Trainer', icon: <FitnessCenter /> },
//   ];

//   // Collapsible sections
//   const collapsibleSections = [
//     {
//       title: 'Workout',
//       icon: <CheckCircle />,
//       items: ['Exercise', 'Routine', 'Progress']
//     },
//     {
//       title: 'Marketing',
//       icon: <Campaign />,
//       items: ['Campaigns', 'Analytics', 'Reports']
//     },
//     {
//       title: 'Analytics',
//       icon: <BarChart />,
//       items: ['Dashboard', 'Reports', 'Insights']
//     }
//   ];

//   // Bottom menu items
//   const bottomMenuItems = [
//     { text: 'Settings', icon: <Settings /> },
//     { text: 'Support', icon: <SupportAgent /> },
//     { text: 'Feedback', icon: <Feedback /> },
//   ];

//   const SidebarContent = () => (
//     <Box
//       sx={{
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         backgroundColor: '#ffffff',
//         borderRadius: '0.75rem',
//         overflow: 'hidden',
//       }}
//     >
//       {/* App Branding Section - Fixed */}
//       <Box
//         sx={{
//           flexShrink: 0,
//           p: 3,
//           backgroundColor: '#dc2626', // Red background
//           color: '#ffffff',
//           borderRadius: '0.75rem 0.75rem 0 0',
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 700,
//             fontSize: '1.25rem',
//             lineHeight: '1.75rem',
//             margin: 0,
//           }}
//         >
//           App Name
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             opacity: 0.9,
//             fontSize: '0.875rem',
//             margin: 0,
//             mt: 0.5,
//           }}
//         >
//           Fitness Management
//         </Typography>
//       </Box>

//       {/* Navigation Area - Scrollable */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           overflowY: 'auto',
//           backgroundColor: '#ffffff',
//         }}
//       >
//         {/* Main Menu Items */}
//         <List sx={{ px: 2, py: 1 }}>
//           {mainMenuItems.map((item, index) => (
//             <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
//               <ListItemButton
//                 sx={{
//                   borderRadius: '0.5rem',
//                   backgroundColor: item.active ? '#fef2f2' : 'transparent',
//                   color: item.active ? '#dc2626' : '#374151',
//                   '&:hover': {
//                     backgroundColor: item.active ? '#fef2f2' : '#f9fafb',
//                   },
//                   py: 1.5,
//                   px: 2,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: '2.5rem',
//                     color: item.active ? '#C82D30' : '#6b7280',
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   sx={{
//                     '& .MuiListItemText-primary': {
//                       fontWeight: item.active ? 600 : 500,
//                       fontSize: '0.875rem',
//                     },
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>

//         <Divider sx={{ mx: 2, my: 1 }} />

//         {/* Collapsible Sections */}
//         <List sx={{ px: 2 }}>
//           {collapsibleSections.map((section) => (
//             <React.Fragment key={section.title}>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   onClick={() => handleSectionToggle(section.title)}
//                   sx={{
//                     borderRadius: '0.5rem',
//                     py: 1.5,
//                     px: 2,
//                     color: '#374151',
//                     '&:hover': {
//                       backgroundColor: '#f9fafb',
//                     },
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: '2.5rem',
//                       color: '#6b7280',
//                     }}
//                   >
//                     {section.icon}
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={section.title}
//                     sx={{
//                       '& .MuiListItemText-primary': {
//                         fontWeight: 500,
//                         fontSize: '0.875rem',
//                       },
//                     }}
//                   />
//                   {openSections[section.title] ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>
//               </ListItem>

//               <Collapse in={openSections[section.title]} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {section.items.map((item) => (
//                     <ListItem key={item} disablePadding sx={{ pl: 4 }}>
//                       <ListItemButton
//                         sx={{
//                           borderRadius: '0.5rem',
//                           py: 1,
//                           px: 2,
//                           color: '#6b7280',
//                           '&:hover': {
//                             backgroundColor: '#f9fafb',
//                           },
//                         }}
//                       >
//                         <ListItemText
//                           primary={item}
//                           sx={{
//                             '& .MuiListItemText-primary': {
//                               fontSize: '0.8125rem',
//                             },
//                           }}
//                         />
//                       </ListItemButton>
//                     </ListItem>
//                   ))}
//                 </List>
//               </Collapse>
//             </React.Fragment>
//           ))}
//         </List>

//         <Divider sx={{ mx: 2, my: 1 }} />

//         {/* Bottom Menu Items */}
//         <List sx={{ px: 2, pb: 2 }}>
//           {bottomMenuItems.map((item) => (
//             <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
//               <ListItemButton
//                 sx={{
//                   borderRadius: '0.5rem',
//                   py: 1.5,
//                   px: 2,
//                   color: '#374151',
//                   '&:hover': {
//                     backgroundColor: '#f9fafb',
//                   },
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: '2.5rem',
//                     color: '#6b7280',
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={item.text}
//                   sx={{
//                     '& .MuiListItemText-primary': {
//                       fontWeight: 500,
//                       fontSize: '0.875rem',
//                     },
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Box>
//   );

//   return (
//     <>
//       {/* Mobile Drawer */}
//       <Drawer
//         variant="temporary"
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': {
//             boxSizing: 'border-box',
//             width: width,
//             top: '1rem',
//             left: '1rem',
//             height: 'calc(100vh - 2rem)',
//             borderRadius: '0.75rem',
//             border: 'none',
//           },
//         }}
//       >
//         <SidebarContent />
//       </Drawer>

//       {/* Desktop Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           display: { xs: 'none', sm: 'block' },
//           width: width,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: width,
//             boxSizing: 'border-box',
//             top: '1rem',
//             left: '1rem',
//             height: 'calc(100vh - 2rem)',
//             borderRadius: '0.75rem',
//             border: 'none',
//             backgroundColor: 'transparent',
//           },
//         }}
//         open
//       >
//         <SidebarContent />
//       </Drawer>
//     </>
//   );
// };

// export default SideBar;