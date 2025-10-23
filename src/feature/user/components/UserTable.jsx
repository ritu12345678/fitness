import React from 'react';
import CustomTable from '../../../components/CustomTable';
import UserAvatar from '../../../components/UserAvatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function useColumns(onOpenMenu) {
  return [
    { 
      key: 'sno', 
      header: 'S.No',
      render: (_v, row, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      key: 'profile',
      header: 'Profile',
      render: (_v, row) => (
        <div className="flex items-center gap-2">
          <UserAvatar name={row.name} src={row.avatar} size={28} />
        </div>
      ),
    },
    { 
      key: 'name', 
      header: 'Name',
      render: (_v, row) => (
        <span className="capitalize">{row.name}</span>
      )
    },
    { key: 'mobile', header: 'Mobile Number' },
    { key: 'email', header: 'Email' },
    { 
      key: 'address', 
      header: 'Location',
      render: (_v, row) => (
        <span className="capitalize">{row.address}</span>
      )
    },
    { key: 'feesDue', header: 'Fees Due Date' },
    {
      key: 'action',
      header: 'Action',
      render: (_v, row) => (
        <IconButton size="small" onClick={(e) => onOpenMenu(e.currentTarget, row)}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];
}

function UserTable({ users, loading, error, onEdit }) {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);

  // Debug logging
  React.useEffect(() => {
    console.log('UserTable received users:', users);
    console.log('Users type:', typeof users);
    console.log('Users length:', users?.length);
    console.log('Users is array:', Array.isArray(users));
  }, [users]);

  const handleOpenMenu = (anchor, row) => {
    setMenuAnchor(anchor);
    setSelectedRow(row);
  };
  
  const handleClose = () => {
    setMenuAnchor(null);
  };
  
  const handleDetail = () => {
    if (selectedRow) {
      navigate(`/user/${selectedRow.user_id}`);
    }
    handleClose();
  };
  
  const handleEdit = () => {
    if (selectedRow && onEdit) {
      onEdit(selectedRow);
    }
    handleClose();
  };

  const columns = useColumns(handleOpenMenu);

  // Ensure users is always an array
  const safeUsers = Array.isArray(users) ? users : [];

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C82D30] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Users</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#C82D30] text-white px-4 py-2 rounded-md hover:bg-[#A02528]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!safeUsers || safeUsers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Found</h3>
          <p className="text-gray-600">Try adjusting your filters or add a new user.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomTable columns={columns} data={safeUsers} />
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleClose}>
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
      </Menu>
    </>
  );
}

export default UserTable;