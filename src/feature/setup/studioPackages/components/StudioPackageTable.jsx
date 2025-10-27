import React, { useState } from 'react';
import CustomTable from '../../../../components/CustomTable';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StudioPackageTable = ({ packages = [], onEdit }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenMenu = (anchor, row) => {
    setMenuAnchor(anchor);
    setSelectedRow(row);
  };
  
  const handleClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };
  
  const handleEdit = () => {
    if (selectedRow && onEdit) {
      onEdit(selectedRow);
    }
    handleClose();
  };
  // Empty state
  if (!packages || packages.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <p className="text-gray-500">No packages found</p>
      </Box>
    );
  }

  // Transform packages data for table
  const rows = packages.map((pkg, index) => ({
    id: pkg.package_id || pkg.id || pkg._id || index + 1,
    packageName: pkg.name || pkg.package_name || pkg.title || '--',
    category1: pkg.category || pkg.classCategory || pkg.classesCategory || pkg.type || '--',
    category2: pkg.rg_category || pkg.Rg_Category || pkg.subCategory || pkg.level || '--',
    session: pkg.session || pkg.sessions || pkg.totalSessions || pkg.duration || '--',
    days: (() => {
      if (!pkg.days) return '--';
      
      // Handle string format like "SunFri" or "Mon,Wed,Fri"
      if (typeof pkg.days === 'string') {
        if (pkg.days.includes(',')) {
          return pkg.days; // Already formatted
        } else {
          return pkg.days.split('').join(', '); // Format "SunFri" to "S,u,n,F,r,i"
        }
      }
      
      // Handle array format
      if (Array.isArray(pkg.days)) {
        return pkg.days.join(', ');
      }
      
      return pkg.days || pkg.availableDays || '--';
    })(),
    price: pkg.price ? `₹${pkg.price}` : (pkg.amount ? `₹${pkg.amount}` : '--'),
    location: pkg.location || pkg.city || pkg.address || pkg.area || '--',
  }));

  const columns = [
    { key: 'id', header: '#' },
    { key: 'packageName', header: 'Package Name' },
    { key: 'category1', header: 'Category' },
    { key: 'category2', header: 'Category' },
    { key: 'session', header: 'Session' },
    { key: 'days', header: 'Days' },
    { key: 'price', header: 'Price' },
    { key: 'location', header: 'Location' },
    {
      key: 'action',
      header: 'Action',
      render: (_, row) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton 
            size="small" 
            onClick={(e) => handleOpenMenu(e.currentTarget, row)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        rows={rows}
        keyField="id"
        initialRowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
        enablePagination
      />
      
      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default StudioPackageTable;













