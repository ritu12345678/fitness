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
    { key: 'id', header: '#', render: (value, row, rowIndex) => rowIndex + 1 },
    {
      key: 'profile',
      header: 'Profile',
      render: (_v, row) => (
        <div className="flex items-center gap-2">
          <UserAvatar name={row.name} src={row.avatar} size={28} />
        </div>
      ),
    },
    { key: 'name', header: 'Name' },
    { key: 'mobile', header: 'Mobile Number' },
    { key: 'role', header: 'Role',render:(_v,row)=>row?.role_id_data?.role_name },
    { key: 'location', header: 'Location' ,render:(_v,row)=>row?.location_id_data?.name||"--" },
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

function TrainerTable({ trainers = [], loading = false, error = null, onEdit, pagination, onPageChange, onRowsPerPageChange, page, rowsPerPage }) {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleOpenMenu = (anchor, row) => {
    setMenuAnchor(anchor);
    setSelectedRow(row);
  };
  const handleClose = () => {
    setMenuAnchor(null);
  };
  const handleDetail = () => {
    handleClose();
    if (selectedRow?.user_id) {
      navigate(`/trainer/detail/${selectedRow.user_id}`);
    } else {
    navigate('/trainer/detail');
    }
  };
  const handleEdit = () => {
    handleClose();
    if (onEdit && selectedRow) {
      onEdit(selectedRow);
    }
  };

  const columns = useColumns(handleOpenMenu);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading trainers...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Show no data state
  if (!trainers || trainers.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500 text-lg">No trainer found</div>
      </div>
    );
  }

  return (
    <>
      <CustomTable 
        columns={columns} 
        rows={trainers}
        keyField="id"
        enablePagination={true}
        // Server-side pagination props
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        count={pagination?.total_items ?? trainers.length}
      />
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleClose}>
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
    </>
  );
}

export default TrainerTable;
