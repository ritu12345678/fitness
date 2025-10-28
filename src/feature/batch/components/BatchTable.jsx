import React from 'react';
import CustomTable from '../../../components/CustomTable';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../constants';

function useColumns(onOpenMenu) {
  return [
    { key: 'id', header: '#' },
    { key: 'batch_id', header: 'Batch Number' },
    { key: 'trainerName', header: 'Trainer Name' },
    { key: 'starting_amount', header: 'Package' },
    { 
      key: 'from', 
      header: 'Start Date',
      render: (_v, row) => formatDate(row.from)
    },
    { 
      key: 'endDate', 
      header: 'End Date',
      render: (_v, row) => row.endDate ? formatDate(row.endDate) : 'N/A'
    },
    { key: 'city', header: 'Location' },
    { key: 'sessions', header: 'Sessions' },
    { key: 'totalMembers', header: 'Total Members' },
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

function BatchTable({ 
  data = [], 
  loading = false, 
  page = 1, 
  rowsPerPage = 10, 
  totalPages = 1, 
  totalResults = 0,
  onPageChange,
  onRowsPerPageChange,
  onEdit
}) {
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
    navigate(`/batch/detail/${selectedRow.batch_id}`); // Pass batch ID
  };

  const handleEdit = () => {
    if (selectedRow && onEdit) {
      onEdit(selectedRow);
    }
    handleClose();
  };

  const columns = useColumns(handleOpenMenu);

  return (
    <>
      <CustomTable 
        columns={columns} 
        data={data}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleClose}>
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
    </>
  );
}

export default BatchTable;
